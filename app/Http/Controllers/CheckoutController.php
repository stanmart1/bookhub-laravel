<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\OrderController;
use App\Services\PaymentService;

class CheckoutController extends Controller
{
    protected $paymentService;
    
    public function __construct(PaymentService $paymentService)
    {
        $this->paymentService = $paymentService;
    }
    
    /**
     * Process checkout and create order
     */
    public function process(Request $request)
    {
        $request->validate([
            'cart_items' => 'required|array|min:1',
            'shipping_info' => 'required|array',
            'payment_info' => 'required|array',
            'payment_method' => 'required|string|in:card,bank,flutterwave',
        ]);
        
        $user = Auth::user();
        
        try {
            // Process payment based on method
            $paymentResult = $this->paymentService->processPayment(
                $request->payment_method,
                $request->payment_info,
                $request->cart_items
            );
            
            if (!$paymentResult['success']) {
                return response()->json([
                    'success' => false,
                    'message' => $paymentResult['message'],
                ], 400);
            }
            
            // Create order using OrderController
            $orderController = new OrderController();
            $orderRequest = new Request([
                'items' => $request->cart_items,
                'shipping_info' => $request->shipping_info,
                'payment_method' => $request->payment_method,
            ]);
            
            $orderResult = $orderController->store($orderRequest);
            
            if ($orderResult->getStatusCode() === 201) {
                // Clear cart after successful order
                session()->forget('cart');
                
                return response()->json([
                    'success' => true,
                    'message' => 'Order placed successfully!',
                    'order' => $orderResult->getData()->order,
                    'payment' => $paymentResult,
                ], 201);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to create order',
                ], 500);
            }
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Checkout failed: ' . $e->getMessage(),
            ], 500);
        }
    }
    
    /**
     * Get checkout summary (cart total, shipping, tax)
     */
    public function summary(Request $request)
    {
        $request->validate([
            'cart_items' => 'required|array|min:1',
        ]);
        
        $subtotal = collect($request->cart_items)->sum(function ($item) {
            return $item['price'] * $item['quantity'];
        });
        
        $tax = $subtotal * 0.1; // 10% tax
        $shipping = $subtotal > 50 ? 0 : 5.99; // Free shipping over $50
        $total = $subtotal + $tax + $shipping;
        
        return response()->json([
            'subtotal' => round($subtotal, 2),
            'tax' => round($tax, 2),
            'shipping' => round($shipping, 2),
            'total' => round($total, 2),
            'free_shipping_threshold' => 50,
            'free_shipping_remaining' => max(0, 50 - $subtotal),
        ]);
    }
    
    /**
     * Validate shipping information
     */
    public function validateShipping(Request $request)
    {
        $request->validate([
            'full_name' => 'required|string|max:255',
            'address' => 'required|string|max:500',
            'city' => 'required|string|max:100',
            'postal_code' => 'required|string|max:20',
            'country' => 'required|string|max:100',
        ]);
        
        return response()->json([
            'success' => true,
            'message' => 'Shipping information is valid',
        ]);
    }
    
    /**
     * Validate payment information
     */
    public function validatePayment(Request $request)
    {
        $request->validate([
            'payment_method' => 'required|string|in:card,bank,flutterwave',
            'payment_info' => 'required|array',
        ]);
        
        // Validate based on payment method
        switch ($request->payment_method) {
            case 'card':
                $request->validate([
                    'payment_info.card_number' => 'required|string|min:13|max:19',
                    'payment_info.cardholder_name' => 'required|string|max:255',
                    'payment_info.expiry_date' => 'required|string|regex:/^\d{2}\/\d{2}$/',
                    'payment_info.cvv' => 'required|string|min:3|max:4',
                ]);
                break;
                
            case 'bank':
                // Bank transfer doesn't need validation here
                break;
                
            case 'flutterwave':
                // Flutterwave validation would go here
                break;
        }
        
        return response()->json([
            'success' => true,
            'message' => 'Payment information is valid',
        ]);
    }
} 