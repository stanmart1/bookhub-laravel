<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserLibrary;
use App\Models\Book;
use Illuminate\Support\Facades\Auth;

class LibraryController extends Controller
{
    // View user library
    public function index(Request $request)
    {
        $user = Auth::user();
        $query = UserLibrary::with('book')->where('user_id', $user->id);
        if ($request->filled('q')) {
            $query->whereHas('book', function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->q . '%');
            });
        }
        if ($request->filled('author')) {
            $query->whereHas('book', function ($q) use ($request) {
                $q->where('author', $request->author);
            });
        }
        $sort = $request->input('sort', 'purchased_at');
        $order = $request->input('order', 'desc');
        $library = $query->orderBy($sort, $order)->get();
        return view('library.index', compact('library'));
    }

    // Add a book to the library
    public function addBook(Request $request)
    {
        $request->validate([
            'book_id' => 'required|exists:books,id',
        ]);
        $user = Auth::user();
        UserLibrary::firstOrCreate([
            'user_id' => $user->id,
            'book_id' => $request->book_id,
        ], [
            'purchased_at' => now(),
        ]);
        return redirect()->back()->with('success', 'Book added to your library.');
    }

    // Remove a book from the library
    public function removeBook(Request $request)
    {
        $request->validate([
            'book_id' => 'required|exists:books,id',
        ]);
        $user = Auth::user();
        UserLibrary::where('user_id', $user->id)->where('book_id', $request->book_id)->delete();
        return redirect()->back()->with('success', 'Book removed from your library.');
    }

    // Download a book if the user owns it
    public function download($bookId)
    {
        $user = Auth::user();
        $hasBook = UserLibrary::where('user_id', $user->id)->where('book_id', $bookId)->exists();
        if (!$hasBook) {
            abort(403, 'You do not have permission to download this book.');
        }
        $book = Book::findOrFail($bookId);
        return response()->download(storage_path('app/public/' . $book->file_path));
    }
}
