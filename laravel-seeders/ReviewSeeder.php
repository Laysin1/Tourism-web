<?php

namespace Database\Seeders;

use App\Models\Review;
use App\Models\User;
use App\Models\Destination;
use Illuminate\Database\Seeder;

class ReviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::where('role', '!=', 'admin')->get();
        $destinations = Destination::all();

        $reviews = [
            [
                'user_id' => $users[0]->id,
                'destination_id' => $destinations[0]->id,
                'rating' => 5,
                'comment' => 'Absolutely breathtaking! The overwater bungalow was a dream come true. Staff was incredibly attentive and the food was amazing. Can\'t wait to return!',
                'images' => json_encode([
                    'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400&q=80',
                ]),
            ],
            [
                'user_id' => $users[1]->id,
                'destination_id' => $destinations[0]->id,
                'rating' => 4,
                'comment' => 'Beautiful location and excellent service. The only downside was the limited food options for vegetarians. Otherwise, a perfect vacation spot.',
                'images' => null,
            ],
            [
                'user_id' => $users[2]->id,
                'destination_id' => $destinations[0]->id,
                'rating' => 5,
                'comment' => 'This place exceeded all expectations! The coral reef diving was incredible and our beach villa was pure luxury. Worth every penny for this once-in-a-lifetime experience.',
                'images' => json_encode([
                    'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&q=80',
                    'https://images.unsplash.com/photo-1540202404-a2f29016b523?w=400&q=80',
                ]),
            ],
            [
                'user_id' => $users[0]->id,
                'destination_id' => $destinations[1]->id,
                'rating' => 5,
                'comment' => 'The views from our room were absolutely spectacular! We went during ski season and had an amazing time on the slopes. The hotel staff were very friendly and helpful.',
                'images' => json_encode([
                    'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&q=80',
                ]),
            ],
            [
                'user_id' => $users[1]->id,
                'destination_id' => $destinations[2]->id,
                'rating' => 4,
                'comment' => 'Great location in the heart of the city. Easy access to all major attractions. The room was a bit smaller than expected, but very clean and comfortable.',
                'images' => null,
            ],
        ];

        foreach ($reviews as $review) {
            Review::create($review);
        }

        // Update destination ratings based on reviews
        foreach ($destinations as $destination) {
            $averageRating = $destination->reviews()->avg('rating') ?: 0;
            $destination->rating = round($averageRating, 1);
            $destination->save();
        }
    }
}
