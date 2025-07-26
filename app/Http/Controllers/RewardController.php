<?php

namespace App\Http\Controllers;

use App\Models\Reward;
use Illuminate\Support\Facades\Auth;

class RewardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $rewards = $user->rewards ?? [];
        $all = Reward::all();
        return view('rewards.index', compact('rewards', 'all'));
    }

    public function award($rewardId)
    {
        $user = Auth::user();
        $user->rewards()->syncWithoutDetaching([$rewardId]);
        return back()->with('success', 'Reward claimed!');
    }
} 