<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Destination extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'description',
        'location',
        'price',
        'category_id',
        'rating',
        'images',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'price' => 'float',
        'rating' => 'float',
        'images' => 'array',
    ];

    /**
     * Get the category that owns the destination
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Get the reviews for the destination
     */
    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    /**
     * Get the users who favorited this destination
     */
    public function favoritedBy()
    {
        return $this->belongsToMany(User::class, 'favorites', 'destination_id', 'user_id')
                    ->withTimestamps();
    }

    /**
     * Format price as string with currency
     */
    public function getFormattedPriceAttribute()
    {
        return '$' . number_format($this->price, 2) . '/night';
    }

    /**
     * Get main image from images array
     */
    public function getMainImageAttribute()
    {
        $images = $this->images;
        return is_array($images) && count($images) > 0 ? $images[0] : null;
    }
}
