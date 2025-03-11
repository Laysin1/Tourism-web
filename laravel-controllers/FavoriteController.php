<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use App\Models\Destination;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    /**
     * Get user's favorite destinations
     */
    public function index(Request $request)
    {
        $favorites = $request->user()->favorites()->with('destination')->latest()->paginate(12);
        
        return response()->json($favorites);
    }

    /**
     * Add destination to favorites
     */
    public function store(Request $request)
    {
        $request->validate([
            'destination_id' => 'required|exists:destinations,id',
        ]);

        // Check if already favorited
        $existing = Favorite::where('user_id', $request->user()->id)
            ->where('destination_id', $request->destination_id)
            ->first();
            
        if ($existing) {
            return response()->json([
                'message' => 'Destination already in favorites'
            ], 400);
        }

        $favorite = Favorite::create([
            'user_id' => $request->user()->id,
            'destination_id' => $request->destination_id,
        ]);

        return response()->json([
            'favorite' => $favorite->load('destination'),
            'message' => 'Destination added to favorites'
        ], 201);
    }

    /**
     * Remove destination from favorites
     */
    public function destroy(Request $request, $destinationId)
    {
        $favorite = Favorite::where('user_id', $request->user()->id)
            ->where('destination_id', $destinationId)
            ->first();
            
        if (!$favorite) {
            return response()->json([
                'message' => 'Favorite not found'
            ], 404);
        }

        $favorite->delete();

        return response()->json([
            'message' => 'Destination removed from favorites'
        ]);
    }

    /**
     * Toggle favorite status
     */
    public function toggle(Request $request, $destinationId)
    {
        $destination = Destination::findOrFail($destinationId);
        
        $favorite = Favorite::where('user_id', $request->user()->id)
            ->where('destination_id', $destinationId)
            ->first();
            
        if ($favorite) {
            // Remove from favorites
            $favorite->delete();
            return response()->json([
                'is_favorite' => false,
                'message' => 'Destination removed from favorites'
            ]);
        } else {
            // Add to favorites
            Favorite::create([
                'user_id' => $request->user()->id,
                'destination_id' => $destinationId,
            ]);
            return response()->json([
                'is_favorite' => true,
                'message' => 'Destination added to favorites'
            ]);
        }
    }
}
