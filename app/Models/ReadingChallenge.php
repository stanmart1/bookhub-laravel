<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ReadingChallenge extends Model
{
    protected $fillable = [
        'name', 'description', 'start_date', 'end_date', 'goal_books', 'created_by'
    ];

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function participants()
    {
        return $this->belongsToMany(User::class, 'challenge_participants')->withPivot('books_read');
    }
} 