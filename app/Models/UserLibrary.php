<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class UserLibrary extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'book_id',
        'purchased_at',
    ];

    protected $table = 'user_libraries';

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function book()
    {
        return $this->belongsTo(Book::class);
    }
}
