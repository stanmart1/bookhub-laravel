<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QASession extends Model
{
    protected $fillable = [
        'title', 'description', 'user_id', 'book_id', 'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function book()
    {
        return $this->belongsTo(Book::class);
    }

    public function questions()
    {
        return $this->hasMany(QAQuestion::class);
    }
} 