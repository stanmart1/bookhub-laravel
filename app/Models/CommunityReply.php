<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CommunityReply extends Model
{
    protected $fillable = [
        'community_post_id', 'user_id', 'content'
    ];

    public function post()
    {
        return $this->belongsTo(CommunityPost::class, 'community_post_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
} 