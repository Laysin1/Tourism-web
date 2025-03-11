<?php

namespace Database\Seeders;

use App\Models\Destination;
use App\Models\Category;
use Illuminate\Database\Seeder;

class DestinationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $beachCategory = Category::where('name', 'Beach')->first()->id;
        $mountainCategory = Category::where('name', 'Mountain')->first()->id;
        $cityCategory = Category::where('name', 'City')->first()->id;

        $destinations = [
            [
                'name' => 'Tropical Paradise Resort',
                'description' => 'Experience the ultimate luxury getaway at this pristine tropical paradise. Crystal clear waters, white sandy beaches, and exclusive overwater bungalows make this destination a dream come true for travelers seeking relaxation and natural beauty.',
                'location' => 'Maldives, Indian Ocean',
                'price' => 299.99,
                'category_id' => $beachCategory,
                'rating' => 4.8,
                'images' => json_encode([
                    'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1200&q=80',
                    'https://images.unsplash.com/photo-1540202404-a2f29016b523?w=1200&q=80',
                    'https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?w=1200&q=80',
                    'https://images.unsplash.com/photo-1541480601022-2308c0f02487?w=1200&q=80',
                ]),
            ],
            [
                'name' => 'Alpine Retreat',
                'description' => 'Nestled in the heart of the majestic Swiss Alps, this mountain retreat offers breathtaking panoramic views, world-class skiing, and cozy accommodations with authentic alpine charm.',
                'location' => 'Swiss Alps, Switzerland',
                'price' => 249.99,
                'category_id' => $mountainCategory,
                'rating' => 4.7,
                'images' => json_encode([
                    'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80',
                    'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=1200&q=80',
                    'https://images.unsplash.com/photo-1520637102912-2df6bb2aec6d?w=1200&q=80',
                ]),
            ],
            [
                'name' => 'City Skyline Hotel',
                'description' => 'Located in the heart of the bustling metropolis, this luxury hotel offers stunning views of the iconic skyline, easy access to world-famous attractions, and unparalleled urban sophistication.',
                'location' => 'New York, USA',
                'price' => 399.99,
                'category_id' => $cityCategory,
                'rating' => 4.6,
                'images' => json_encode([
                    'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=1200&q=80',
                    'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1200&q=80',
                    'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=80',
                ]),
            ],
            [
                'name' => 'Coastal Villa',
                'description' => 'Perched on the cliffs of the stunning Amalfi Coast, this elegant villa combines Mediterranean charm with modern luxury. Enjoy private terraces with panoramic sea views, a refreshing infinity pool, and easy access to picturesque coastal towns.',
                'location' => 'Amalfi Coast, Italy',
                'price' => 349.99,
                'category_id' => $beachCategory,
                'rating' => 4.8,
                'images' => json_encode([
                    'https://images.unsplash.com/photo-1520483601560-389dff434fdf?w=1200&q=80',
                    'https://images.unsplash.com/photo-1534470397273-a1d3f9c34eb1?w=1200&q=80',
                    'https://images.unsplash.com/photo-1548484352-ea579e5233a8?w=1200&q=80',
                ]),
            ],
            [
                'name' => 'Mountain Lodge',
                'description' => 'This rustic yet luxurious mountain lodge offers a perfect blend of adventure and comfort. Surrounded by pristine wilderness, guests can enjoy hiking, wildlife viewing, and stargazing, then relax by the stone fireplace in the evening.',
                'location' => 'Rocky Mountains, Canada',
                'price' => 199.99,
                'category_id' => $mountainCategory,
                'rating' => 4.5,
                'images' => json_encode([
                    'https://images.unsplash.com/photo-1542224566-6e85f2e6772f?w=1200&q=80',
                    'https://images.unsplash.com/photo-1517823382935-51bfcb0ec6bc?w=1200&q=80',
                    'https://images.unsplash.com/photo-1520637102912-2df6bb2aec6d?w=1200&q=80',
                ]),
            ],
            [
                'name' => 'Urban Loft',
                'description' => 'Experience the vibrant energy of Tokyo from this stylish urban loft. Featuring contemporary design with Japanese influences, this accommodation offers a perfect base for exploring the city\'s incredible food scene, shopping districts, and cultural attractions.',
                'location' => 'Tokyo, Japan',
                'price' => 279.99,
                'category_id' => $cityCategory,
                'rating' => 4.7,
                'images' => json_encode([
                    'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1200&q=80',
                    'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1200&q=80',
                    'https://images.unsplash.com/photo-1536437075651-01d275325dc3?w=1200&q=80',
                ]),
            ],
        ];

        foreach ($destinations as $destination) {
            Destination::create($destination);
        }
    }
}
