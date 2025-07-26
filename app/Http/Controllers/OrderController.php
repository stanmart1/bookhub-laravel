<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\UserLibrary;
use App\Models\Book;

class OrderController extends Controller
{
    /**
     * Create a new order from cart
     */
    public function store(Request $request)
    {
        $request->validate([
            'items' => 'required|array|min:1',
            'items.*.bookId' => 'required|exists:books,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric|min:0',
            'shipping_info' => 'required|array',
            'shipping_info.full_name' => 'required|string',
            'shipping_info.address' => 'required|string',
            'shipping_info.city' => 'required|string',
            'shipping_info.postal_code' => 'required|string',
            'shipping_info.country' => 'required|string',
            'payment_method' => 'required|string|in:card,bank,flutterwave',
        ]);

        $user = Auth::user();
        
        try {
            DB::beginTransaction();
            
            // Calculate total
            $total = collect($request->items)->sum(function ($item) {
                return $item['price'] * $item['quantity'];
            });
            
            // Create order
            $order = Order::create([
                'user_id' => $user->id,
                'total' => $total,
                'status' => 'pending',
                'payment_method' => $request->payment_method,
            ]);
            
            // Create order items
            foreach ($request->items as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'book_id' => $item['bookId'],
                    'quantity' => $item['quantity'],
                    'price' => $item['price'],
                ]);
            }
            
            // Add books to user library (for digital books)
            foreach ($request->items as $item) {
                $book = Book::find($item['bookId']);
                if ($book && $book->price == 0) { // Free books go directly to library
                    UserLibrary::firstOrCreate([
                        'user_id' => $user->id,
                        'book_id' => $item['bookId'],
                    ], [
                        'purchased_at' => now(),
                    ]);
                }
            }
            
            DB::commit();
            
            return response()->json([
                'success' => true,
                'message' => 'Order created successfully',
                'order' => $order->load('orderItems.book'),
            ], 201);
            
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Failed to create order: ' . $e->getMessage(),
            ], 500);
        }
    }
    
    /**
     * Get user's order history
     */
    public function index()
    {
        $user = Auth::user();
        $orders = Order::where('user_id', $user->id)
            ->with('orderItems.book')
            ->orderBy('created_at', 'desc')
            ->get();
            
        return response()->json($orders);
    }
    
    /**
     * Get specific order details
     */
    public function show($id)
    {
        $user = Auth::user();
        $order = Order::where('user_id', $user->id)
            ->with('orderItems.book')
            ->findOrFail($id);
            
        return response()->json($order);
    }
    
    /**
     * Update order status (admin only)
     */
    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|string|in:pending,processing,shipped,delivered,cancelled',
        ]);
        
        $order = Order::findOrFail($id);
        $order->update(['status' => $request->status]);
        
        // If order is delivered, add books to user library
        if ($request->status === 'delivered') {
            foreach ($order->orderItems as $item) {
                UserLibrary::firstOrCreate([
                    'user_id' => $order->user_id,
                    'book_id' => $item->book_id,
                ], [
                    'purchased_at' => now(),
                ]);
            }
        }
        
        return response()->json([
            'success' => true,
            'message' => 'Order status updated',
            'order' => $order->load('orderItems.book'),
        ]);
    }
} 