<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reward extends Model
{
    protected $fillable = [
        'name', 'description', 'points', 'type'
    ];

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_rewards')->withTimestamps();
    }
} 