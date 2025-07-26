<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CommunityCategory extends Model
{
    protected $fillable = [
        'name', 'description'
    ];

    public function posts()
    {
        return $this->hasMany(CommunityPost::class, 'category_id');
    }
} 