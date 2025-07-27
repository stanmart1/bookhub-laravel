<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Role;
use App\Models\Permission;

class RoleController extends Controller
{
    public function index()
    {
        return Role::with('permissions')->get();
    }

    public function store(Request $request)
    {
        $request->validate(['name' => 'required|string|unique:roles,name']);
        return Role::create($request->all());
    }

    public function update(Request $request, Role $role)
    {
        $request->validate(['name' => 'required|string|unique:roles,name,' . $role->id]);
        $role->update($request->all());
        return $role;
    }

    public function destroy(Role $role)
    {
        $role->delete();
        return response()->noContent();
    }

    public function assignPermissions(Request $request, Role $role)
    {
        $request->validate(['permissions' => 'required|array']);
        $role->permissions()->sync($request->permissions);
        return $role->load('permissions');
    }

    public function permissions()
    {
        return Permission::all();
    }
}
