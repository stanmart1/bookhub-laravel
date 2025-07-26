<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PaymentProof;

class PaymentController extends Controller
{
    public function verify(Request $request)
    {
        $request->validate([
            'payment_proof_id' => 'required|exists:payment_proofs,id',
        ]);
        $proof = PaymentProof::findOrFail($request->payment_proof_id);
        $proof->status = 'verified';
        $proof->save();
        return response()->json(['message' => 'Payment verified.']);
    }
}
