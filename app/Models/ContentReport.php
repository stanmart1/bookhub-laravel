<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContentReport extends Model
{
    protected $fillable = [
        'user_id', 'reportable_id', 'reportable_type', 'reason', 'status', 'moderator_id', 'resolved_at'
    ];

    protected $casts = [
        'resolved_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function reportable()
    {
        return $this->morphTo();
    }

    public function moderator()
    {
        return $this->belongsTo(User::class, 'moderator_id');
    }
} 