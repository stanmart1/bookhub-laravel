<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContextPermission extends Model
{
    protected $fillable = [
        'permission_id', 'user_id', 'role_id', 'context_type', 'context_id'
    ];

    public function permission()
    {
        return $this->belongsTo(Permission::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }
} 