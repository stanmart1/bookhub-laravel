<?php

namespace Database\Factories;

use App\Models\UserLibrary;
use App\Models\User;
use App\Models\Book;
use Illuminate\Database\Eloquent\Factories\Factory;

class UserLibraryFactory extends Factory
{
    protected $model = UserLibrary::class;

    public function definition()
    {
        return [
            'user_id' => User::factory(),
            'book_id' => Book::factory(),
        ];
    }
}
