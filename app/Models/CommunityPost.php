<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CommunityPost extends Model
{
    protected $fillable = [
        'user_id', 'title', 'content', 'category_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function category()
    {
        return $this->belongsTo(CommunityCategory::class);
    }

    public function replies()
    {
        return $this->hasMany(CommunityReply::class);
    }
} 