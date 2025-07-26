<?php

namespace Database\Factories;

use App\Models\Book;
use Illuminate\Database\Eloquent\Factories\Factory;

class BookFactory extends Factory
{
    protected $model = Book::class;

    public function definition()
    {
        return [
            'title' => $this->faker->sentence(3),
            'author' => $this->faker->name,
            'cover_image' => 'covers/' . $this->faker->uuid . '.jpg',
            'file_path' => 'books/' . $this->faker->uuid . '.pdf',
            'description' => $this->faker->paragraph,
            'price' => $this->faker->randomFloat(2, 5, 50),
            'published_at' => $this->faker->date(),
        ];
    }
}
