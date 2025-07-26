<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class OrderItem extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'order_id',
        'book_id',
        'quantity',
        'price',
    ];
    
    protected $casts = [
        'price' => 'decimal:2',
    ];
    
    /**
     * Get the order that owns the order item
     */
    public function order()
    {
        return $this->belongsTo(Order::class);
    }
    
    /**
     * Get the book for this order item
     */
    public function book()
    {
        return $this->belongsTo(Book::class);
    }
    
    /**
     * Get the total price for this item
     */
    public function getTotalPrice()
    {
        return $this->price * $this->quantity;
    }
    
    /**
     * Get formatted total price
     */
    public function getFormattedTotalPrice()
    {
        return '$' . number_format($this->getTotalPrice(), 2);
    }
    
    /**
     * Get formatted unit price
     */
    public function getFormattedUnitPrice()
    {
        return '$' . number_format($this->price, 2);
    }
}
