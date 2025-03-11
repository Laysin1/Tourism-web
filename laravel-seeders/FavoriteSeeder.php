<?php

namespace Database\Seeders;

use App\Models\Favorite;
use App\Models\User;
use App\Models\Destination;
use Illuminate\Database\Seeder;

class FavoriteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::where('role', '!=', 'admin')->get();
        $destinations = Destination::all();

        // User 1 favorites
        Favorite::create([
            'user_id' => $users[0]->id,
            'destination_id' => $destinations[0]->id,
        ]);
        
        Favorite::create([
            'user_id' => $users[0]->id,
            'destination_id' => $destinations[1]->id,
        ]);

        // User 2 favorites
        Favorite::create([
            'user_id' => $users[1]->id,
            'destination_id' => $destinations[2]->id,
        ]);
        
        Favorite::create([
            'user_id' => $users[1]->id,
            'destination_id' => $destinations[3]->id,
        ]);

        // User 3 favorites
        Favorite::create([
            'user_id' => $users[2]->id,
            'destination_id' => $destinations[4]->id,
        ]);
        
        Favorite::create([
            'user_id' => $users[2]->id,
            'destination_id' => $destinations[5]->id,
        ]);
    }
}
