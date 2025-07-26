<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Book;
use App\Models\ReadingProgress;
use App\Models\Bookmark;
use App\Models\Highlight;
use App\Models\ReaderSettings;

class ReaderController extends Controller
{
    /**
     * Show the reader page for a specific book
     */
    public function show($bookId)
    {
        $book = Book::findOrFail($bookId);
        
        // Check if user owns the book or has access
        $user = auth()->user();
        
        // For now, we'll allow access to all books
        // In production, you'd check ownership or purchase status
        
        return Inertia::render('Reader/Book', [
            'bookId' => $bookId,
            'book' => $book,
        ]);
    }
    
    /**
     * Show the reader settings page
     */
    public function settings()
    {
        $user = auth()->user();
        $settings = ReaderSettings::where('user_id', $user->id)->first();
        
        return Inertia::render('Reader/Settings', [
            'settings' => $settings,
        ]);
    }
    
    /**
     * Show the user's reading library
     */
    public function library()
    {
        $user = auth()->user();
        
        // Get user's books with reading progress
        $books = Book::whereHas('readingProgress', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })->with(['readingProgress' => function ($query) use ($user) {
            $query->where('user_id', $user->id);
        }])->get();
        
        return Inertia::render('Library/MyLibrary', [
            'books' => $books,
        ]);
    }
}
