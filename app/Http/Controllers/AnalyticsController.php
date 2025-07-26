<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\ReadingProgress;
use App\Models\UserEvent;

class AnalyticsController extends Controller
{
    public function dashboard()
    {
        $user = Auth::user();
        $progress = ReadingProgress::where('user_id', $user->id)->get();
        $totalBooks = $progress->count();
        $totalPages = $progress->sum('total_pages');
        $pagesRead = $progress->sum('current_page');
        $completedBooks = $progress->where('current_page', '=', 'total_pages')->count();
        $readingSessions = UserEvent::where('user_id', $user->id)->where('event_type', 'reading_activity')->count();
        $stats = [
            'total_books' => $totalBooks,
            'total_pages' => $totalPages,
            'pages_read' => $pagesRead,
            'completed_books' => $completedBooks,
            'reading_sessions' => $readingSessions,
        ];
        return view('analytics.dashboard', compact('stats'));
    }

    public function goals()
    {
        $user = Auth::user();
        $progress = \App\Models\ReadingProgress::where('user_id', $user->id)->get();
        $goal = $user->reading_goal ?? 12; // books per year, default
        $completed = $progress->where('current_page', '=', 'total_pages')->count();
        $percent = $goal ? round(($completed / $goal) * 100, 1) : 0;
        return view('analytics.goals', compact('goal', 'completed', 'percent'));
    }

    public function insights()
    {
        $user = Auth::user();
        $events = \App\Models\UserEvent::where('user_id', $user->id)->get();
        $first = $events->sortBy('created_at')->first();
        $last = $events->sortByDesc('created_at')->first();
        $daysActive = $first && $last ? $first->created_at->diffInDays($last->created_at) + 1 : 0;
        $avgSessions = $daysActive ? round($events->count() / $daysActive, 2) : 0;
        return view('analytics.insights', compact('daysActive', 'avgSessions'));
    }

    public function export()
    {
        $user = Auth::user();
        $progress = \App\Models\ReadingProgress::where('user_id', $user->id)->get();
        $csv = "Book,Current Page,Total Pages,Last Read\n";
        foreach ($progress as $p) {
            $csv .= sprintf('"%s",%d,%d,%s\n', $p->book->title ?? '', $p->current_page, $p->total_pages, $p->updated_at);
        }
        return response($csv)
            ->header('Content-Type', 'text/csv')
            ->header('Content-Disposition', 'attachment; filename="reading-stats.csv"');
    }
} 