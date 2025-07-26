<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ReaderSetting extends Model
{
    protected $fillable = [
        'user_id', 'font', 'font_size', 'theme', 'line_height', 'background_color', 'extra'
    ];

    protected $casts = [
        'extra' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
