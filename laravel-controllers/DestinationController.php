<?php

namespace App\Http\Controllers;

use App\Models\Destination;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DestinationController extends Controller
{
    /**
     * Display a listing of destinations with optional filtering
     */
    public function index(Request $request)
    {
        $query = Destination::query();

        // Apply filters if provided
        if ($request->has('category')) {
            $query->where('category_id', $request->category);
        }

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%")
                  ->orWhere('location', 'like', "%{$search}%");
            });
        }

        // Sort options
        $sortField = $request->sort_by ?? 'created_at';
        $sortDirection = $request->sort_direction ?? 'desc';
        $allowedSortFields = ['name', 'price', 'rating', 'created_at'];
        
        if (in_array($sortField, $allowedSortFields)) {
            $query->orderBy($sortField, $sortDirection === 'asc' ? 'asc' : 'desc');
        }

        // Pagination
        $perPage = $request->per_page ?? 12;
        $destinations = $query->paginate($perPage);

        return response()->json($destinations);
    }

    /**
     * Store a newly created destination
     */
    public function store(Request $request)
    {
        // Check admin permissions
        if (!$request->user()->isAdmin()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'location' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'category_id' => 'required|exists:categories,id',
            'images' => 'required|array|min:1',
            'images.*' => 'url',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $destination = Destination::create([
            'name' => $request->name,
            'description' => $request->description,
            'location' => $request->location,
            'price' => $request->price,
            'category_id' => $request->category_id,
            'images' => json_encode($request->images),
            'rating' => 0, // Initial rating
        ]);

        return response()->json([
            'destination' => $destination,
            'message' => 'Destination created successfully'
        ], 201);
    }

    /**
     * Display the specified destination with reviews
     */
    public function show($id)
    {
        $destination = Destination::with(['category', 'reviews.user'])->findOrFail($id);
        
        // Calculate average rating from reviews
        $averageRating = $destination->reviews->avg('rating') ?: 0;
        $destination->rating = round($averageRating, 1);
        $destination->save();

        // Check if authenticated user has favorited this destination
        $isFavorite = false;
        if (auth()->check()) {
            $isFavorite = auth()->user()->favorites()->where('destination_id', $id)->exists();
        }
        $destination->is_favorite = $isFavorite;

        return response()->json($destination);
    }

    /**
     * Update the specified destination
     */
    public function update(Request $request, $id)
    {
        // Check admin permissions
        if (!$request->user()->isAdmin()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $destination = Destination::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'location' => 'sometimes|string|max:255',
            'price' => 'sometimes|numeric|min:0',
            'category_id' => 'sometimes|exists:categories,id',
            'images' => 'sometimes|array|min:1',
            'images.*' => 'url',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        if ($request->has('name')) $destination->name = $request->name;
        if ($request->has('description')) $destination->description = $request->description;
        if ($request->has('location')) $destination->location = $request->location;
        if ($request->has('price')) $destination->price = $request->price;
        if ($request->has('category_id')) $destination->category_id = $request->category_id;
        if ($request->has('images')) $destination->images = json_encode($request->images);
        
        $destination->save();

        return response()->json([
            'destination' => $destination,
            'message' => 'Destination updated successfully'
        ]);
    }

    /**
     * Remove the specified destination
     */
    public function destroy(Request $request, $id)
    {
        // Check admin permissions
        if (!$request->user()->isAdmin()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $destination = Destination::findOrFail($id);
        $destination->delete();

        return response()->json([
            'message' => 'Destination deleted successfully'
        ]);
    }
}
