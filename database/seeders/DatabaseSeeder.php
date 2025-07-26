<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Role;
use App\Models\Book;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            PermissionSeeder::class,
            RolePermissionSeeder::class,
        ]);
        $user = User::factory()->create([
            'email' => 'testuser@example.com',
        ]);
        $role = Role::first();
        if ($role) {
            $user->roles()->attach($role->id);
        }
        Book::factory()->create();
    }
}
