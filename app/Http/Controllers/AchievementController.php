<?php

namespace App\Http\Controllers;

use App\Models\Achievement;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AchievementController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $achievements = $user->achievements ?? [];
        $all = Achievement::all();
        return view('achievements.index', compact('achievements', 'all'));
    }

    public function checkAndAward(User $user)
    {
        $booksRead = $user->events()->where('event_type', 'reading_activity')->distinct('book_id')->count('book_id');
        $streak = 0; // Placeholder for streak logic
        $achievements = Achievement::all();
        foreach ($achievements as $a) {
            if ($a->criteria_type === 'books_read' && $booksRead >= $a->criteria_value) {
                $user->achievements()->syncWithoutDetaching([$a->id]);
            }
            // Add more criteria checks as needed
        }
    }
} 