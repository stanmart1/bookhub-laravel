<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ABTest extends Model
{
    protected $fillable = [
        'name', 'variant', 'user_id', 'result', 'experiment', 'group'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
} 