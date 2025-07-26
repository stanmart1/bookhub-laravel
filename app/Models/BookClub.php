<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BookClub extends Model
{
    protected $fillable = [
        'name', 'description', 'owner_id'
    ];

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function members()
    {
        return $this->belongsToMany(User::class, 'book_club_members');
    }
} 