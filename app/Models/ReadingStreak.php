<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ReadingStreak extends Model
{
    protected $fillable = [
        'user_id', 'current_streak', 'longest_streak', 'last_read_at'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
} 