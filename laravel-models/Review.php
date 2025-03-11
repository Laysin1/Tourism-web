<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'destination_id',
        'rating',
        'comment',
        'images',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'rating' => 'integer',
        'images' => 'array',
    ];

    /**
     * Get the user that owns the review
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the destination that owns the review
     */
    public function destination()
    {
        return $this->belongsTo(Destination::class);
    }

    /**
     * Format date in a readable format
     */
    public function getFormattedDateAttribute()
    {
        return $this->created_at->format('F d, Y');
    }
}
