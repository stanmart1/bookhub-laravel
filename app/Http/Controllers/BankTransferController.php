<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BankTransferController extends Controller
{
    public function uploadProof(Request $request)
    {
        $request->validate([
            'payment_proof' => 'required|file|mimes:jpg,jpeg,png,pdf|max:4096',
        ]);
        $path = $request->file('payment_proof')->store('payment-proofs', 'public');
        return response()->json(['file_path' => $path]);
    }
}
