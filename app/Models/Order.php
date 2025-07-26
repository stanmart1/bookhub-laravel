<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model
{
    use HasFactory, SoftDeletes;
    
    protected $fillable = [
        'user_id',
        'total',
        'status',
        'payment_method',
        'shipping_address',
        'billing_address',
        'notes',
    ];
    
    protected $casts = [
        'total' => 'decimal:2',
        'shipping_address' => 'array',
        'billing_address' => 'array',
    ];
    
    /**
     * Get the user that owns the order
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    /**
     * Get the order items for the order
     */
    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }
    
    /**
     * Get the payment proof for the order
     */
    public function paymentProof()
    {
        return $this->hasOne(PaymentProof::class);
    }
    
    /**
     * Get the books in this order
     */
    public function books()
    {
        return $this->belongsToMany(Book::class, 'order_items')
            ->withPivot('quantity', 'price')
            ->withTimestamps();
    }
    
    /**
     * Check if order is pending
     */
    public function isPending()
    {
        return $this->status === 'pending';
    }
    
    /**
     * Check if order is processing
     */
    public function isProcessing()
    {
        return $this->status === 'processing';
    }
    
    /**
     * Check if order is shipped
     */
    public function isShipped()
    {
        return $this->status === 'shipped';
    }
    
    /**
     * Check if order is delivered
     */
    public function isDelivered()
    {
        return $this->status === 'delivered';
    }
    
    /**
     * Check if order is cancelled
     */
    public function isCancelled()
    {
        return $this->status === 'cancelled';
    }
    
    /**
     * Get order status badge color
     */
    public function getStatusColor()
    {
        return match($this->status) {
            'pending' => 'warning',
            'processing' => 'info',
            'shipped' => 'primary',
            'delivered' => 'success',
            'cancelled' => 'error',
            default => 'default',
        };
    }
    
    /**
     * Get formatted total
     */
    public function getFormattedTotal()
    {
        return '$' . number_format($this->total, 2);
    }
    
    /**
     * Get order summary
     */
    public function getSummary()
    {
        $itemCount = $this->orderItems->sum('quantity');
        $uniqueBooks = $this->orderItems->count();
        
        return [
            'item_count' => $itemCount,
            'unique_books' => $uniqueBooks,
            'total' => $this->getFormattedTotal(),
            'status' => ucfirst($this->status),
        ];
    }
}
