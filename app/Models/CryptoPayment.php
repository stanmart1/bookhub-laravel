<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CryptoPayment extends Model
{
    protected $fillable = [
        'user_id', 'amount', 'currency', 'transaction_id', 'status', 'confirmed_at'
    ];

    protected $casts = [
        'confirmed_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
} 