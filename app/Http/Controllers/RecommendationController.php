<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\UserEvent;
use App\Models\RecommendationScore;
use Illuminate\Support\Facades\Auth;

class RecommendationController extends Controller
{
    public function trending()
    {
        // Top 10 most viewed books in the last 7 days
        $trending = UserEvent::where('event_type', 'book_view')
            ->where('created_at', '>=', now()->subDays(7))
            ->selectRaw('event_data, COUNT(*) as views')
            ->groupBy('event_data')
            ->orderByDesc('views')
            ->limit(10)
            ->get()
            ->map(function ($row) {
                $bookId = json_decode($row->event_data, true)['book_id'] ?? null;
                return Book::find($bookId);
            })->filter();
        return response()->json($trending);
    }

    public function readersAlsoBought()
    {
        $user = Auth::user();
        $viewedBookIds = UserEvent::where('user_id', $user->id)
            ->where('event_type', 'book_view')
            ->pluck('event_data')->map(function ($data) {
                $arr = json_decode($data, true);
                return $arr['book_id'] ?? null;
            })->filter()->unique();
        $similarUserIds = UserEvent::where('event_type', 'book_view')
            ->whereIn('event_data', $viewedBookIds->map(fn($id) => json_encode(['book_id' => $id])))
            ->where('user_id', '!=', $user->id)
            ->pluck('user_id')->unique();
        $alsoBoughtBookIds = UserEvent::where('event_type', 'book_view')
            ->whereIn('user_id', $similarUserIds)
            ->pluck('event_data')->map(function ($data) {
                $arr = json_decode($data, true);
                return $arr['book_id'] ?? null;
            })->filter()->unique()->diff($viewedBookIds)->take(10);
        $books = Book::whereIn('id', $alsoBoughtBookIds)->get();
        return response()->json($books);
    }
} 