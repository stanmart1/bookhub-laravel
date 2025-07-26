<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\ReadingProgress;
use App\Models\Bookmark;
use App\Models\Highlight;
use App\Models\ReaderSettings;
use App\Models\ReadingSession;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ReaderController extends Controller
{
    /**
     * Get reading progress for a book
     */
    public function getProgress(Request $request, int $bookId): JsonResponse
    {
        $user = Auth::user();
        
        $progress = ReadingProgress::where('user_id', $user->id)
            ->where('book_id', $bookId)
            ->first();
            
        if (!$progress) {
            return response()->json([
                'progress' => null,
                'message' => 'No reading progress found'
            ]);
        }
        
        return response()->json([
            'progress' => $progress,
            'message' => 'Reading progress retrieved successfully'
        ]);
    }

    /**
     * Update reading progress
     */
    public function updateProgress(Request $request, int $bookId): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'current_page' => 'nullable|integer|min:1',
            'current_chapter' => 'nullable|string',
            'progress_percentage' => 'nullable|numeric|min:0|max:100',
            'time_spent_seconds' => 'nullable|integer|min:0',
            'is_completed' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $user = Auth::user();
        
        $progress = ReadingProgress::updateOrCreate(
            [
                'user_id' => $user->id,
                'book_id' => $bookId,
            ],
            [
                'current_page' => $request->current_page ?? 1,
                'current_chapter' => $request->current_chapter,
                'progress_percentage' => $request->progress_percentage ?? 0,
                'time_spent_seconds' => $request->time_spent_seconds ?? 0,
                'is_completed' => $request->is_completed ?? false,
                'last_read_at' => now(),
            ]
        );

        return response()->json([
            'progress' => $progress,
            'message' => 'Reading progress updated successfully'
        ]);
    }

    /**
     * Get bookmarks for a book
     */
    public function getBookmarks(Request $request, int $bookId): JsonResponse
    {
        $user = Auth::user();
        
        $bookmarks = Bookmark::where('user_id', $user->id)
            ->where('book_id', $bookId)
            ->orderBy('created_at', 'desc')
            ->get();
            
        return response()->json([
            'bookmarks' => $bookmarks,
            'message' => 'Bookmarks retrieved successfully'
        ]);
    }

    /**
     * Create a bookmark
     */
    public function createBookmark(Request $request, int $bookId): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'page_number' => 'nullable|integer|min:1',
            'chapter' => 'nullable|string',
            'location' => 'nullable|string',
            'title' => 'nullable|string|max:255',
            'note' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $user = Auth::user();
        
        $bookmark = Bookmark::create([
            'user_id' => $user->id,
            'book_id' => $bookId,
            'page_number' => $request->page_number,
            'chapter' => $request->chapter,
            'location' => $request->location,
            'title' => $request->title,
            'note' => $request->note,
        ]);

        return response()->json([
            'bookmark' => $bookmark,
            'message' => 'Bookmark created successfully'
        ], 201);
    }

    /**
     * Update a bookmark
     */
    public function updateBookmark(Request $request, int $bookId, int $bookmarkId): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'title' => 'nullable|string|max:255',
            'note' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $user = Auth::user();
        
        $bookmark = Bookmark::where('user_id', $user->id)
            ->where('book_id', $bookId)
            ->where('id', $bookmarkId)
            ->first();
            
        if (!$bookmark) {
            return response()->json([
                'message' => 'Bookmark not found'
            ], 404);
        }

        $bookmark->update([
            'title' => $request->title,
            'note' => $request->note,
        ]);

        return response()->json([
            'bookmark' => $bookmark,
            'message' => 'Bookmark updated successfully'
        ]);
    }

    /**
     * Delete a bookmark
     */
    public function deleteBookmark(Request $request, int $bookId, int $bookmarkId): JsonResponse
    {
        $user = Auth::user();
        
        $bookmark = Bookmark::where('user_id', $user->id)
            ->where('book_id', $bookId)
            ->where('id', $bookmarkId)
            ->first();
            
        if (!$bookmark) {
            return response()->json([
                'message' => 'Bookmark not found'
            ], 404);
        }

        $bookmark->delete();

        return response()->json([
            'message' => 'Bookmark deleted successfully'
        ]);
    }

    /**
     * Get highlights for a book
     */
    public function getHighlights(Request $request, int $bookId): JsonResponse
    {
        $user = Auth::user();
        
        $highlights = Highlight::where('user_id', $user->id)
            ->where('book_id', $bookId)
            ->orderBy('created_at', 'desc')
            ->get();
            
        return response()->json([
            'highlights' => $highlights,
            'message' => 'Highlights retrieved successfully'
        ]);
    }

    /**
     * Create a highlight
     */
    public function createHighlight(Request $request, int $bookId): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'page_number' => 'nullable|integer|min:1',
            'chapter' => 'nullable|string',
            'location' => 'nullable|string',
            'selected_text' => 'required|string',
            'note' => 'nullable|string',
            'color' => 'nullable|string',
            'style' => 'nullable|string|in:highlight,underline,strikethrough',
            'position_data' => 'nullable|array',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $user = Auth::user();
        
        $highlight = Highlight::create([
            'user_id' => $user->id,
            'book_id' => $bookId,
            'page_number' => $request->page_number,
            'chapter' => $request->chapter,
            'location' => $request->location,
            'selected_text' => $request->selected_text,
            'note' => $request->note,
            'color' => $request->color ?? '#ffeb3b',
            'style' => $request->style ?? 'highlight',
            'position_data' => $request->position_data,
        ]);

        return response()->json([
            'highlight' => $highlight,
            'message' => 'Highlight created successfully'
        ], 201);
    }

    /**
     * Update a highlight
     */
    public function updateHighlight(Request $request, int $bookId, int $highlightId): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'note' => 'nullable|string',
            'color' => 'nullable|string',
            'style' => 'nullable|string|in:highlight,underline,strikethrough',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $user = Auth::user();
        
        $highlight = Highlight::where('user_id', $user->id)
            ->where('book_id', $bookId)
            ->where('id', $highlightId)
            ->first();
            
        if (!$highlight) {
            return response()->json([
                'message' => 'Highlight not found'
            ], 404);
        }

        $highlight->update([
            'note' => $request->note,
            'color' => $request->color,
            'style' => $request->style,
        ]);

        return response()->json([
            'highlight' => $highlight,
            'message' => 'Highlight updated successfully'
        ]);
    }

    /**
     * Delete a highlight
     */
    public function deleteHighlight(Request $request, int $bookId, int $highlightId): JsonResponse
    {
        $user = Auth::user();
        
        $highlight = Highlight::where('user_id', $user->id)
            ->where('book_id', $bookId)
            ->where('id', $highlightId)
            ->first();
            
        if (!$highlight) {
            return response()->json([
                'message' => 'Highlight not found'
            ], 404);
        }

        $highlight->delete();

        return response()->json([
            'message' => 'Highlight deleted successfully'
        ]);
    }

    /**
     * Get reader settings
     */
    public function getSettings(Request $request): JsonResponse
    {
        $user = Auth::user();
        
        $settings = ReaderSettings::where('user_id', $user->id)->first();
        
        if (!$settings) {
            $settings = ReaderSettings::getForUser($user->id);
        }
        
        return response()->json([
            'settings' => $settings,
            'message' => 'Reader settings retrieved successfully'
        ]);
    }

    /**
     * Update reader settings
     */
    public function updateSettings(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'font_family' => 'nullable|string',
            'font_size' => 'nullable|integer|min:12|max:30',
            'line_height' => 'nullable|numeric|min:1.2|max:2.0',
            'margins' => 'nullable|string|in:narrow,normal,wide',
            'theme' => 'nullable|string|in:light,dark,sepia',
            'text_align' => 'nullable|string|in:left,center,justify',
            'reading_mode' => 'nullable|string|in:paginated,scrolled',
            'auto_save_progress' => 'nullable|boolean',
            'show_progress_bar' => 'nullable|boolean',
            'show_page_numbers' => 'nullable|boolean',
            'show_toc' => 'nullable|boolean',
            'advanced_settings' => 'nullable|array',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $user = Auth::user();
        
        $settings = ReaderSettings::updateForUser($user->id, $request->all());
        
        return response()->json([
            'settings' => $settings,
            'message' => 'Reader settings updated successfully'
        ]);
    }

    /**
     * Start a reading session
     */
    public function startSession(Request $request, int $bookId): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'start_page' => 'nullable|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $user = Auth::user();
        
        $session = ReadingSession::start($user->id, $bookId, $request->start_page);
        
        return response()->json([
            'session' => $session,
            'message' => 'Reading session started successfully'
        ], 201);
    }

    /**
     * End a reading session
     */
    public function endSession(Request $request, int $bookId, int $sessionId): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'end_page' => 'nullable|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $user = Auth::user();
        
        $session = ReadingSession::where('user_id', $user->id)
            ->where('book_id', $bookId)
            ->where('id', $sessionId)
            ->first();
            
        if (!$session) {
            return response()->json([
                'message' => 'Reading session not found'
            ], 404);
        }

        $session->end($request->end_page);
        
        return response()->json([
            'session' => $session,
            'message' => 'Reading session ended successfully'
        ]);
    }

    /**
     * Get reading statistics
     */
    public function getStats(Request $request, int $bookId): JsonResponse
    {
        $user = Auth::user();
        
        // Get reading progress
        $progress = ReadingProgress::where('user_id', $user->id)
            ->where('book_id', $bookId)
            ->first();
            
        // Get recent sessions
        $sessions = ReadingSession::where('user_id', $user->id)
            ->where('book_id', $bookId)
            ->orderBy('started_at', 'desc')
            ->limit(10)
            ->get();
            
        // Get bookmarks count
        $bookmarksCount = Bookmark::where('user_id', $user->id)
            ->where('book_id', $bookId)
            ->count();
            
        // Get highlights count
        $highlightsCount = Highlight::where('user_id', $user->id)
            ->where('book_id', $bookId)
            ->count();
            
        // Calculate total reading time
        $totalReadingTime = ReadingSession::where('user_id', $user->id)
            ->where('book_id', $bookId)
            ->sum('duration_seconds');
            
        return response()->json([
            'stats' => [
                'progress' => $progress,
                'recent_sessions' => $sessions,
                'bookmarks_count' => $bookmarksCount,
                'highlights_count' => $highlightsCount,
                'total_reading_time_seconds' => $totalReadingTime,
                'total_reading_time_formatted' => $this->formatDuration($totalReadingTime),
            ],
            'message' => 'Reading statistics retrieved successfully'
        ]);
    }

    /**
     * Format duration in seconds to human readable format
     */
    private function formatDuration(int $seconds): string
    {
        $hours = floor($seconds / 3600);
        $minutes = floor(($seconds % 3600) / 60);
        $remainingSeconds = $seconds % 60;

        if ($hours > 0) {
            return sprintf('%dh %dm %ds', $hours, $minutes, $remainingSeconds);
        } elseif ($minutes > 0) {
            return sprintf('%dm %ds', $minutes, $remainingSeconds);
        } else {
            return sprintf('%ds', $remainingSeconds);
        }
    }
}
