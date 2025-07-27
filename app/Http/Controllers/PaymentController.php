<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\SubscriptionPlan;
use App\Models\PaymentMethod;
use App\Models\BillingHistory;
use App\Models\RefundRequest;

class PaymentController extends Controller
{
    public function getSubscriptionPlans()
    {
        $plans = SubscriptionPlan::all();
        return response()->json($plans);
    }

    public function getPaymentMethods(Request $request)
    {
        $user = $request->user();
        return response()->json($user->paymentMethods);
    }

    public function addPaymentMethod(Request $request)
    {
        $user = $request->user();
        $user->paymentMethods()->create($request->all());
        return response()->json(['message' => 'Payment method added successfully.']);
    }

    public function deletePaymentMethod(Request $request, $id)
    {
        $user = $request->user();
        $user->paymentMethods()->where('id', $id)->delete();
        return response()->json(['message' => 'Payment method deleted successfully.']);
    }

    public function getBillingHistory(Request $request)
    {
        $user = $request->user();
        return response()->json($user->billingHistory);
    }

    public function requestRefund(Request $request)
    {
        $user = $request->user();
        RefundRequest::create([
            'user_id' => $user->id,
            'order_id' => $request->input('order_id'),
            'reason' => $request->input('reason'),
        ]);
        return response()->json(['message' => 'Refund request submitted successfully.']);
    }
}
