<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QAQuestion extends Model
{
    protected $fillable = [
        'qa_session_id', 'user_id', 'question', 'answer', 'answered_by'
    ];

    public function session()
    {
        return $this->belongsTo(QASession::class, 'qa_session_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
} 