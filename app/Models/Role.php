<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Role extends Model
{
    use HasFactory;

    public function permissions()
    {
        return $this->belongsToMany(Permission::class, 'role_permissions');
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_roles');
    }

    public function parentRoles()
    {
        return $this->belongsToMany(Role::class, 'role_hierarchy', 'child_role_id', 'parent_role_id');
    }

    public function childRoles()
    {
        return $this->belongsToMany(Role::class, 'role_hierarchy', 'parent_role_id', 'child_role_id');
    }

    /**
     * Recursively get all permissions, including inherited from parent roles.
     */
    public function getAllPermissions()
    {
        $permissions = $this->permissions;
        foreach ($this->parentRoles as $parent) {
            $permissions = $permissions->merge($parent->getAllPermissions());
        }
        return $permissions->unique('id');
    }
}
