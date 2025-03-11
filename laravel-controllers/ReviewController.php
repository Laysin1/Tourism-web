<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Destination;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ReviewController extends Controller
{
    /**
     * Get reviews for a destination
     */
    public function index($destinationId)
    {
        $destination = Destination::findOrFail($destinationId);
        $reviews = $destination->reviews()->with('user')->latest()->paginate(10);
        
        return response()->json($reviews);
    }

    /**
     * Store a new review
     */
    public function store(Request $request, $destinationId)
    {
        $destination = Destination::findOrFail($destinationId);
        
        $validator = Validator::make($request->all(), [
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string',
            'images' => 'nullable|array',
            'images.*' => 'url',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Check if user already reviewed this destination
        $existingReview = Review::where('user_id', $request->user()->id)
            ->where('destination_id', $destinationId)
            ->first();
            
        if ($existingReview) {
            return response()->json([
                'message' => 'You have already reviewed this destination'
            ], 400);
        }

        $review = Review::create([
            'user_id' => $request->user()->id,
            'destination_id' => $destinationId,
            'rating' => $request->rating,
            'comment' => $request->comment,
            'images' => $request->has('images') ? json_encode($request->images) : null,
        ]);

        // Update destination average rating
        $averageRating = $destination->reviews()->avg('rating') ?: 0;
        $destination->rating = round($averageRating, 1);
        $destination->save();

        return response()->json([
            'review' => $review->load('user'),
            'message' => 'Review submitted successfully'
        ], 201);
    }

    /**
     * Update a review
     */
    public function update(Request $request, $id)
    {
        $review = Review::findOrFail($id);
        
        // Check if the review belongs to the authenticated user
        if ($review->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validator = Validator::make($request->all(), [
            'rating' => 'sometimes|integer|min:1|max:5',
            'comment' => 'sometimes|string',
            'images' => 'nullable|array',
            'images.*' => 'url',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        if ($request->has('rating')) $review->rating = $request->rating;
        if ($request->has('comment')) $review->comment = $request->comment;
        if ($request->has('images')) $review->images = json_encode($request->images);
        
        $review->save();

        // Update destination average rating
        $destination = $review->destination;
        $averageRating = $destination->reviews()->avg('rating') ?: 0;
        $destination->rating = round($averageRating, 1);
        $destination->save();

        return response()->json([
            'review' => $review->load('user'),
            'message' => 'Review updated successfully'
        ]);
    }

    /**
     * Delete a review
     */
    public function destroy(Request $request, $id)
    {
        $review = Review::findOrFail($id);
        
        // Check if the review belongs to the authenticated user or user is admin
        if ($review->user_id !== $request->user()->id && !$request->user()->isAdmin()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $destinationId = $review->destination_id;
        $review->delete();

        // Update destination average rating
        $destination = Destination::find($destinationId);
        if ($destination) {
            $averageRating = $destination->reviews()->avg('rating') ?: 0;
            $destination->rating = round($averageRating, 1);
            $destination->save();
        }

        return response()->json([
            'message' => 'Review deleted successfully'
        ]);
    }

    /**
     * Get reviews by the authenticated user
     */
    public function userReviews(Request $request)
    {
        $reviews = $request->user()->reviews()->with('destination')->latest()->paginate(10);
        return response()->json($reviews);
    }
}
