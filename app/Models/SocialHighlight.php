<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SocialHighlight extends Model
{
    protected $fillable = [
        'user_id', 'book_id', 'content', 'page_number', 'color', 'shared_with_club_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function book()
    {
        return $this->belongsTo(Book::class);
    }

    public function club()
    {
        return $this->belongsTo(BookClub::class, 'shared_with_club_id');
    }
} 