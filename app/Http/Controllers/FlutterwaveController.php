<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class FlutterwaveController extends Controller
{
    public function webhook(Request $request)
    {
        Log::info('Flutterwave webhook received', $request->all());
        // TODO: Verify signature and update payment status
        return response()->json(['status' => 'success']);
    }
}
