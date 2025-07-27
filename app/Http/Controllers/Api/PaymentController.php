<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;

class PaymentController extends Controller
{
    public function process(Request $request, Order $order)
    {
        // This is a placeholder for the payment processing logic
        $order->update(['status' => 'paid']);
        return response()->json(['message' => 'Payment successful.']);
    }
}
