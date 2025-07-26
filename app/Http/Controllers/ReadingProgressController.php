<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Gate;
use App\Models\ReadingProgress;
use App\Models\UserEvent;

class ReadingProgressController extends Controller
{
    // Get reading progress for a book
    public function getProgress($bookId)
    {
        $user = Auth::user();
        $progress = ReadingProgress::where('user_id', $user->id)->where('book_id', $bookId)->first();
        return response()->json($progress);
    }

    // Update reading progress for a book
    public function updateProgress(Request $request, $bookId)
    {
        $user = Auth::user();
        // RBAC: Only users with 'update_progress' permission can update
        if (! $user->hasPermission('update_progress')) {
            abort(403, 'You do not have permission to update reading progress.');
        }
        $request->validate([
            'current_page' => 'required|integer|min:1',
            'total_pages' => 'required|integer|min:1',
        ]);
        $progress = ReadingProgress::updateOrCreate(
            [
                'user_id' => $user->id,
                'book_id' => $bookId,
            ],
            [
                'current_page' => $request->current_page,
                'total_pages' => $request->total_pages,
                'updated_at' => now(),
            ]
        );
        // Log reading activity event
        UserEvent::create([
            'user_id' => $user->id,
            'event_type' => 'reading_activity',
            'event_data' => json_encode([
                'book_id' => $bookId,
                'current_page' => $request->current_page
            ]),
            'created_at' => now(),
        ]);
        // Broadcast event for real-time sync
        event(new \App\Events\ReadingProgressUpdated($progress));
        return response()->json($progress);
    }
}
