<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    /**
     * Display a listing of categories
     */
    public function index()
    {
        $categories = Category::withCount('destinations')->get();
        return response()->json($categories);
    }

    /**
     * Store a newly created category
     */
    public function store(Request $request)
    {
        // Check admin permissions
        if (!$request->user()->isAdmin()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:categories',
            'description' => 'required|string',
            'image' => 'required|url',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $category = Category::create([
            'name' => $request->name,
            'description' => $request->description,
            'image' => $request->image,
        ]);

        return response()->json([
            'category' => $category,
            'message' => 'Category created successfully'
        ], 201);
    }

    /**
     * Display the specified category
     */
    public function show($id)
    {
        $category = Category::with('destinations')->findOrFail($id);
        return response()->json($category);
    }

    /**
     * Update the specified category
     */
    public function update(Request $request, $id)
    {
        // Check admin permissions
        if (!$request->user()->isAdmin()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $category = Category::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:255|unique:categories,name,' . $id,
            'description' => 'sometimes|string',
            'image' => 'sometimes|url',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        if ($request->has('name')) $category->name = $request->name;
        if ($request->has('description')) $category->description = $request->description;
        if ($request->has('image')) $category->image = $request->image;
        
        $category->save();

        return response()->json([
            'category' => $category,
            'message' => 'Category updated successfully'
        ]);
    }

    /**
     * Remove the specified category
     */
    public function destroy(Request $request, $id)
    {
        // Check admin permissions
        if (!$request->user()->isAdmin()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $category = Category::findOrFail($id);
        
        // Check if category has destinations
        if ($category->destinations()->count() > 0) {
            return response()->json([
                'message' => 'Cannot delete category with associated destinations'
            ], 400);
        }
        
        $category->delete();

        return response()->json([
            'message' => 'Category deleted successfully'
        ]);
    }

    /**
     * Get destinations by category
     */
    public function destinations($id, Request $request)
    {
        $category = Category::findOrFail($id);
        
        // Pagination
        $perPage = $request->per_page ?? 12;
        $destinations = $category->destinations()->paginate($perPage);
        
        return response()->json($destinations);
    }
}
