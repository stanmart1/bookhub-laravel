<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Achievement;
use App\Models\ReadingStreak;

class GamificationController extends Controller
{
    public function getAchievements(Request $request)
    {
        $user = $request->user();
        return response()->json($user->achievements);
    }

    public function getLeaderboard()
    {
        $users = User::orderBy('points', 'desc')->take(10)->get();
        return response()->json($users);
    }

    public function getReadingStreak(Request $request)
    {
        $user = $request->user();
        $streak = ReadingStreak::where('user_id', $user->id)->first();
        return response()->json($streak);
    }
}
