<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CloudFile extends Model
{
    protected $fillable = [
        'user_id', 'file_path', 'file_type', 'synced_at', 'provider'
    ];

    protected $casts = [
        'synced_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
} 