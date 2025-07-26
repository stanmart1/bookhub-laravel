<?php

namespace App\Http\Controllers;

use App\Models\Leaderboard;
use App\Models\ReadingStreak;
use Illuminate\Support\Facades\Auth;

class LeaderboardController extends Controller
{
    public function index()
    {
        $weekly = Leaderboard::where('period', 'weekly')->orderByDesc('score')->with('user')->take(10)->get();
        $monthly = Leaderboard::where('period', 'monthly')->orderByDesc('score')->with('user')->take(10)->get();
        $allTime = Leaderboard::where('period', 'all_time')->orderByDesc('score')->with('user')->take(10)->get();
        $streak = ReadingStreak::where('user_id', Auth::id())->first();
        return view('leaderboard.index', compact('weekly', 'monthly', 'allTime', 'streak'));
    }
} 