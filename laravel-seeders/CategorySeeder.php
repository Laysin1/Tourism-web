<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Beach',
                'description' => 'Relax on pristine shores and enjoy crystal clear waters',
                'image' => 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
            ],
            [
                'name' => 'Mountain',
                'description' => 'Experience breathtaking views and alpine adventures',
                'image' => 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
            ],
            [
                'name' => 'City',
                'description' => 'Explore vibrant urban centers and cultural hotspots',
                'image' => 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&q=80',
            ],
            [
                'name' => 'Historical',
                'description' => 'Step back in time with ancient sites and monuments',
                'image' => 'https://images.unsplash.com/photo-1548668392-d7b557b6d822?w=800&q=80',
            ],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
