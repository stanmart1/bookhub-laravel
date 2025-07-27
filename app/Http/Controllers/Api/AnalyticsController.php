<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\ReadingSession;
use App\Models\ReadingGoal;
use App\Models\ReadingStreak;

class AnalyticsController extends Controller
{
    public function getReadingStats(Request $request)
    {
        $user = Auth::user();

        $totalReadingTime = ReadingSession::where('user_id', $user->id)->sum('duration_seconds');
        $sessions = ReadingSession::where('user_id', $user->id)->count();
        $avgSessionTime = $sessions > 0 ? $totalReadingTime / $sessions : 0;

        return response()->json([
            'stats' => [
                'total_reading_time' => $totalReadingTime,
                'total_sessions' => $sessions,
                'avg_session_time' => $avgSessionTime,
            ]
        ]);
    }

    public function createReadingGoal(Request $request)
    {
        $request->validate([
            'type' => 'required|string|in:pages,books,minutes',
            'target' => 'required|integer|min:1',
            'duration' => 'required|string|in:daily,weekly,monthly',
        ]);

        $user = Auth::user();

        $goal = ReadingGoal::create([
            'user_id' => $user->id,
            'type' => $request->type,
            'target' => $request->target,
            'duration' => $request->duration,
        ]);

        return response()->json(['goal' => $goal], 201);
    }

    public function getReadingStreaks(Request $request)
    {
        $user = Auth::user();
        $streaks = ReadingStreak::where('user_id', $user->id)->first();
        return response()->json(['streaks' => $streaks]);
    }

    public function getVocabularyGrowth(Request $request)
    {
        return response()->json(['data' => [
            { "name": "Jan", "words": 400 },
            { "name": "Feb", "words": 300 },
            { "name": "Mar", "words": 500 },
            { "name": "Apr", "words": 450 },
            { "name": "May", "words": 600 },
        ]]);
    }

    public function getReadingHeatmap(Request $request)
    {
        return response()->json(['data' => []]);
    }

    public function getReadingInsights(Request $request)
    {
        return response()->json(['insights' => [
            [
                'severity' => 'info',
                'title' => 'New Genre Explored',
                'text' => 'You read a book from the "Science Fiction" genre for the first time. Keep exploring!',
            ],
            [
                'severity' => 'success',
                'title' => 'Goal Achieved',
                'text' => 'Congratulations! You have completed your weekly reading goal.',
            ],
        ]]);
    }
}
