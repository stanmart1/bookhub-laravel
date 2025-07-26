<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book;
use App\Models\RecommendationScore;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $recommendations = [];
        $stats = [];
        if ($user) {
            $recommendations = RecommendationScore::where('user_id', $user->id)
                ->orderByDesc('score')
                ->with('book')
                ->limit(5)
                ->get();
            $stats = [
                'books_read' => $user->events()->where('event_type', 'reading_activity')->distinct('book_id')->count('book_id'),
                'notes_taken' => $user->events()->where('event_type', 'note')->count(),
            ];
        }
        return view('home', compact('recommendations', 'stats'));
    }
}
