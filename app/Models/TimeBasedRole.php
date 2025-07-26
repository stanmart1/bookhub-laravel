<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TimeBasedRole extends Model
{
    protected $fillable = [
        'user_id', 'role_id', 'starts_at', 'expires_at'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }
} 