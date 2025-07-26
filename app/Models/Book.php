<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Book extends Model
{
    use Searchable, SoftDeletes, HasFactory;
    protected $fillable = [
        'title',
        'author',
        'description',
        'cover_image',
        'file_path',
        'price',
        'published_at',
    ];
}
