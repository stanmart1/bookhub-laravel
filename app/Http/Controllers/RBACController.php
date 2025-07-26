<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\AuditLog;

class RBACController extends Controller
{
    // Admin: Enable sync for a user
    public function enableSync($userId)
    {
        $user = User::findOrFail($userId);
        $this->authorize('manage_users');
        $user->enableSync();
        return response()->json(['message' => 'Sync enabled for user.']);
    }

    // Admin: Disable sync for a user
    public function disableSync($userId)
    {
        $user = User::findOrFail($userId);
        $this->authorize('manage_users');
        $user->disableSync();
        return response()->json(['message' => 'Sync disabled for user.']);
    }

    // Admin: Monitor sync status for a user
    public function syncStatus($userId)
    {
        $user = User::findOrFail($userId);
        $this->authorize('manage_users');
        return response()->json([
            'is_sync_enabled' => $user->is_sync_enabled,
            'last_sync_at' => $user->last_sync_at,
        ]);
    }

    public function assignRole(Request $request, $userId)
    {
        $user = User::findOrFail($userId);
        $this->authorize('manage_users');
        $user->assignRole($request->role);
        AuditLog::create([
            'user_id' => auth()->id(),
            'action' => 'assign_role',
            'target_type' => 'User',
            'target_id' => $user->id,
            'details' => json_encode(['role' => $request->role]),
        ]);
        return response()->json(['message' => 'Role assigned to user.']);
    }

    public function removeRole(Request $request, $userId)
    {
        $user = User::findOrFail($userId);
        $this->authorize('manage_users');
        $user->removeRole($request->role);
        AuditLog::create([
            'user_id' => auth()->id(),
            'action' => 'remove_role',
            'target_type' => 'User',
            'target_id' => $user->id,
            'details' => json_encode(['role' => $request->role]),
        ]);
        return response()->json(['message' => 'Role removed from user.']);
    }

    public function givePermission(Request $request, $userId)
    {
        $user = User::findOrFail($userId);
        $this->authorize('manage_users');
        $user->givePermissionTo($request->permission);
        AuditLog::create([
            'user_id' => auth()->id(),
            'action' => 'give_permission',
            'target_type' => 'User',
            'target_id' => $user->id,
            'details' => json_encode(['permission' => $request->permission]),
        ]);
        return response()->json(['message' => 'Permission granted to user.']);
    }

    public function revokePermission(Request $request, $userId)
    {
        $user = User::findOrFail($userId);
        $this->authorize('manage_users');
        $user->revokePermissionTo($request->permission);
        AuditLog::create([
            'user_id' => auth()->id(),
            'action' => 'revoke_permission',
            'target_type' => 'User',
            'target_id' => $user->id,
            'details' => json_encode(['permission' => $request->permission]),
        ]);
        return response()->json(['message' => 'Permission revoked from user.']);
    }

    public function apiUsers(Request $request)
    {
        $user = auth()->user();
        if (!$user || !$user->hasRole('admin')) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
        $users = \App\Models\User::with(['roles', 'permissions'])->get(['id', 'name', 'email', 'is_sync_enabled']);
        return response()->json($users);
    }
}
