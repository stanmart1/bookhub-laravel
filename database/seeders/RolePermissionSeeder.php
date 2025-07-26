<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Role;
use App\Models\Permission;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = Role::where('name', 'admin')->first();
        $editor = Role::where('name', 'editor')->first();
        $user = Role::where('name', 'user')->first();

        $manageUsers = Permission::where('name', 'manage_users')->first();
        $manageBooks = Permission::where('name', 'manage_books')->first();
        $viewBooks = Permission::where('name', 'view_books')->first();
        $purchaseBooks = Permission::where('name', 'purchase_books')->first();
        $uploadPaymentProof = Permission::where('name', 'upload_payment_proof')->first();

        // Admin gets all permissions
        $admin->permissions()->sync([
            $manageUsers->id,
            $manageBooks->id,
            $viewBooks->id,
            $purchaseBooks->id,
            $uploadPaymentProof->id,
        ]);

        // Editor gets manage_books, view_books
        $editor->permissions()->sync([
            $manageBooks->id,
            $viewBooks->id,
        ]);

        // User gets view_books, purchase_books, upload_payment_proof
        $user->permissions()->sync([
            $viewBooks->id,
            $purchaseBooks->id,
            $uploadPaymentProof->id,
        ]);
    }
}
