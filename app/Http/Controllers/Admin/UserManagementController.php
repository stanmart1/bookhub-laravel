<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\AuditLog;

class UserManagementController extends Controller
{
    public function index()
    {
        $users = User::with('roles')->get();
        return view('admin.users.index', compact('users'));
    }

    public function edit($id)
    {
        $user = User::with('roles')->findOrFail($id);
        return view('admin.users.edit', compact('user'));
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $user->update($request->only(['name', 'email']));
        AuditLog::create([
            'user_id' => auth()->id(),
            'action' => 'update_user',
            'target_type' => 'User',
            'target_id' => $user->id,
            'details' => json_encode($request->only(['name', 'email'])),
        ]);
        return redirect()->route('admin.users.index')->with('success', 'User updated.');
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        AuditLog::create([
            'user_id' => auth()->id(),
            'action' => 'delete_user',
            'target_type' => 'User',
            'target_id' => $user->id,
            'details' => null,
        ]);
        return redirect()->route('admin.users.index')->with('success', 'User deleted.');
    }
} 