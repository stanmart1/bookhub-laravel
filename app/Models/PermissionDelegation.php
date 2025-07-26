<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PermissionDelegation extends Model
{
    protected $fillable = [
        'delegator_id', 'delegatee_id', 'permission_id', 'context_type', 'context_id', 'expires_at'
    ];

    public function delegator()
    {
        return $this->belongsTo(User::class, 'delegator_id');
    }

    public function delegatee()
    {
        return $this->belongsTo(User::class, 'delegatee_id');
    }

    public function permission()
    {
        return $this->belongsTo(Permission::class);
    }
} 