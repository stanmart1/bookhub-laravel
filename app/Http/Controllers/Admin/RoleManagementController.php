<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Role;
use Illuminate\Http\Request;
use App\Models\AuditLog;

class RoleManagementController extends Controller
{
    public function index()
    {
        $roles = Role::with('permissions')->get();
        return view('admin.roles.index', compact('roles'));
    }

    public function edit($id)
    {
        $role = Role::with('permissions')->findOrFail($id);
        return view('admin.roles.edit', compact('role'));
    }

    public function update(Request $request, $id)
    {
        $role = Role::findOrFail($id);
        $role->update($request->only(['name']));
        AuditLog::create([
            'user_id' => auth()->id(),
            'action' => 'update_role',
            'target_type' => 'Role',
            'target_id' => $role->id,
            'details' => json_encode($request->only(['name'])),
        ]);
        return redirect()->route('admin.roles.index')->with('success', 'Role updated.');
    }

    public function destroy($id)
    {
        $role = Role::findOrFail($id);
        $role->delete();
        AuditLog::create([
            'user_id' => auth()->id(),
            'action' => 'delete_role',
            'target_type' => 'Role',
            'target_id' => $role->id,
            'details' => null,
        ]);
        return redirect()->route('admin.roles.index')->with('success', 'Role deleted.');
    }
} 