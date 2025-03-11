<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'avatar' => 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
            'bio' => 'Website administrator and travel enthusiast.',
            'location' => 'San Francisco, USA',
        ]);

        // Create regular users
        $users = [
            [
                'name' => 'John Doe',
                'email' => 'john@example.com',
                'password' => Hash::make('password'),
                'avatar' => 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
                'bio' => 'Avid traveler and photography enthusiast. Always looking for the next adventure!',
                'location' => 'New York, USA',
            ],
            [
                'name' => 'Sarah Johnson',
                'email' => 'sarah@example.com',
                'password' => Hash::make('password'),
                'avatar' => 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
                'bio' => 'Beach lover and foodie. I travel to experience different cuisines around the world.',
                'location' => 'Miami, USA',
            ],
            [
                'name' => 'Michael Chen',
                'email' => 'michael@example.com',
                'password' => Hash::make('password'),
                'avatar' => 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
                'bio' => 'Adventure seeker and mountain climbing enthusiast.',
                'location' => 'Vancouver, Canada',
            ],
        ];

        foreach ($users as $user) {
            User::create($user);
        }
    }
}
