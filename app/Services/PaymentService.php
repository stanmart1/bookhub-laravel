<?php

namespace App\Services;

use Illuminate\Support\Facades\Log;
use App\Models\PaymentProof;
use App\Models\CryptoPayment;

class PaymentService
{
    /**
     * Process payment based on method
     */
    public function processPayment($method, $paymentInfo, $cartItems)
    {
        switch ($method) {
            case 'card':
                return $this->processCardPayment($paymentInfo, $cartItems);
                
            case 'bank':
                return $this->processBankTransfer($paymentInfo, $cartItems);
                
            case 'flutterwave':
                return $this->processFlutterwavePayment($paymentInfo, $cartItems);
                
            default:
                return [
                    'success' => false,
                    'message' => 'Unsupported payment method',
                ];
        }
    }
    
    /**
     * Process credit/debit card payment
     */
    protected function processCardPayment($paymentInfo, $cartItems)
    {
        try {
            // In a real implementation, you would integrate with a payment gateway
            // like Stripe, PayPal, etc. For now, we'll simulate a successful payment
            
            $total = collect($cartItems)->sum(function ($item) {
                return $item['price'] * $item['quantity'];
            });
            
            // Simulate payment processing
            $transactionId = 'TXN_' . time() . '_' . rand(1000, 9999);
            
            Log::info('Card payment processed', [
                'transaction_id' => $transactionId,
                'amount' => $total,
                'card_last4' => substr($paymentInfo['card_number'], -4),
            ]);
            
            return [
                'success' => true,
                'message' => 'Payment processed successfully',
                'transaction_id' => $transactionId,
                'amount' => $total,
                'method' => 'card',
            ];
            
        } catch (\Exception $e) {
            Log::error('Card payment failed', [
                'error' => $e->getMessage(),
                'payment_info' => $paymentInfo,
            ]);
            
            return [
                'success' => false,
                'message' => 'Payment failed: ' . $e->getMessage(),
            ];
        }
    }
    
    /**
     * Process bank transfer payment
     */
    protected function processBankTransfer($paymentInfo, $cartItems)
    {
        try {
            $total = collect($cartItems)->sum(function ($item) {
                return $item['price'] * $item['quantity'];
            });
            
            // For bank transfer, we create a pending payment proof
            $proof = PaymentProof::create([
                'user_id' => auth()->id(),
                'order_id' => null, // Will be updated when order is created
                'amount' => $total,
                'bank_name' => $paymentInfo['bank_name'] ?? 'Unknown',
                'account_number' => $paymentInfo['account_number'] ?? '',
                'reference' => 'REF_' . time() . '_' . rand(1000, 9999),
                'status' => 'pending',
            ]);
            
            Log::info('Bank transfer initiated', [
                'proof_id' => $proof->id,
                'amount' => $total,
                'reference' => $proof->reference,
            ]);
            
            return [
                'success' => true,
                'message' => 'Bank transfer initiated. Please complete the transfer and upload proof.',
                'payment_proof_id' => $proof->id,
                'reference' => $proof->reference,
                'amount' => $total,
                'method' => 'bank',
                'status' => 'pending',
            ];
            
        } catch (\Exception $e) {
            Log::error('Bank transfer failed', [
                'error' => $e->getMessage(),
                'payment_info' => $paymentInfo,
            ]);
            
            return [
                'success' => false,
                'message' => 'Bank transfer failed: ' . $e->getMessage(),
            ];
        }
    }
    
    /**
     * Process Flutterwave payment
     */
    protected function processFlutterwavePayment($paymentInfo, $cartItems)
    {
        try {
            $total = collect($cartItems)->sum(function ($item) {
                return $item['price'] * $item['quantity'];
            });
            
            // In a real implementation, you would integrate with Flutterwave API
            // For now, we'll simulate a successful payment
            
            $transactionId = 'FLW_' . time() . '_' . rand(1000, 9999);
            
            Log::info('Flutterwave payment processed', [
                'transaction_id' => $transactionId,
                'amount' => $total,
                'currency' => 'NGN',
            ]);
            
            return [
                'success' => true,
                'message' => 'Payment processed successfully via Flutterwave',
                'transaction_id' => $transactionId,
                'amount' => $total,
                'currency' => 'NGN',
                'method' => 'flutterwave',
            ];
            
        } catch (\Exception $e) {
            Log::error('Flutterwave payment failed', [
                'error' => $e->getMessage(),
                'payment_info' => $paymentInfo,
            ]);
            
            return [
                'success' => false,
                'message' => 'Flutterwave payment failed: ' . $e->getMessage(),
            ];
        }
    }
    
    /**
     * Verify payment proof for bank transfer
     */
    public function verifyPaymentProof($proofId)
    {
        try {
            $proof = PaymentProof::findOrFail($proofId);
            $proof->update(['status' => 'verified']);
            
            return [
                'success' => true,
                'message' => 'Payment proof verified successfully',
                'proof' => $proof,
            ];
            
        } catch (\Exception $e) {
            return [
                'success' => false,
                'message' => 'Failed to verify payment proof: ' . $e->getMessage(),
            ];
        }
    }
    
    /**
     * Get payment methods available
     */
    public function getAvailablePaymentMethods()
    {
        return [
            [
                'id' => 'card',
                'name' => 'Credit/Debit Card',
                'description' => 'Pay with Visa, Mastercard, or other major cards',
                'icon' => 'credit-card',
            ],
            [
                'id' => 'bank',
                'name' => 'Bank Transfer',
                'description' => 'Transfer money directly to our bank account',
                'icon' => 'bank',
            ],
            [
                'id' => 'flutterwave',
                'name' => 'Flutterwave',
                'description' => 'Pay with mobile money or local payment methods',
                'icon' => 'mobile',
            ],
        ];
    }
}
