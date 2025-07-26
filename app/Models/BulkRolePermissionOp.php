<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\AuditLog;

class BulkRolePermissionOp extends Model
{
    protected $fillable = [
        'operator_id', 'operation_type', 'affected_user_ids', 'affected_role_ids', 'affected_permission_ids', 'status', 'error_message'
    ];

    protected $casts = [
        'affected_user_ids' => 'array',
        'affected_role_ids' => 'array',
        'affected_permission_ids' => 'array',
    ];

    protected static function booted()
    {
        static::created(function ($op) {
            AuditLog::create([
                'user_id' => $op->operator_id,
                'action' => 'bulk_' . $op->operation_type,
                'target_type' => 'BulkRolePermissionOp',
                'target_id' => $op->id,
                'details' => json_encode([
                    'affected_users' => $op->affected_user_ids,
                    'affected_roles' => $op->affected_role_ids,
                    'affected_permissions' => $op->affected_permission_ids,
                    'status' => $op->status,
                    'error_message' => $op->error_message,
                ]),
            ]);
        });
    }

    public function operator()
    {
        return $this->belongsTo(User::class, 'operator_id');
    }
} 