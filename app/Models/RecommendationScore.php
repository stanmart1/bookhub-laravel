<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RecommendationScore extends Model
{
    protected $fillable = [
        'user_id', 'book_id', 'score', 'reason'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function book()
    {
        return $this->belongsTo(Book::class);
    }
} 