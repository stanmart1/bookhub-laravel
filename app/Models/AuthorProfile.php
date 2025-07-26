<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AuthorProfile extends Model
{
    protected $fillable = [
        'user_id', 'bio', 'website', 'avatar'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
} 