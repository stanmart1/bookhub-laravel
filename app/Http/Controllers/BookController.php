<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Cache;
use App\Models\Book;
use App\Http\Requests\StoreBookRequest;
use App\Http\Requests\UpdateBookRequest;
use App\Models\UserEvent;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $books = Cache::remember('books.index', 60, function() {
            $books = Book::all();
            // Add full URLs for cover images and files
            return $books->map(function($book) {
                if ($book->cover_image) {
                    $book->cover_image = url(Storage::disk('public')->url($book->cover_image));
                }
                if ($book->file_path) {
                    $book->file_path = url(Storage::disk('public')->url($book->file_path));
                }
                return $book;
            });
        });
        return response()->json($books);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'cover_image' => 'required|file|image',
            'file' => 'required|file',
        ]);
        $coverPath = $request->file('cover_image')->store('covers', 'public');
        $filePath = $request->file('file')->store('books', 'public');
        $book = Book::create([
            'title' => $validated['title'],
            'author' => $validated['author'],
            'cover_image' => $coverPath,
            'file_path' => $filePath,
        ]);
        return response()->json($book, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $book = Cache::remember("books.show.$id", 60, function() use ($id) {
            $book = Book::findOrFail($id);
            // Add full URLs for cover images and files
            if ($book->cover_image) {
                $book->cover_image = url(Storage::disk('public')->url($book->cover_image));
            }
            if ($book->file_path) {
                $book->file_path = url(Storage::disk('public')->url($book->file_path));
            }
            return $book;
        });
        $user = auth()->user();
        if ($user) {
            UserEvent::create([
                'user_id' => $user->id,
                'event_type' => 'book_view',
                'event_data' => json_encode(['book_id' => $book->id]),
                'created_at' => now(),
            ]);
        }
        return response()->json($book);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBookRequest $request, string $id)
    {
        $book = Book::findOrFail($id);
        $data = $request->validated();
        if ($request->hasFile('cover_image')) {
            // Optionally delete old file
            if ($book->cover_image) {
                Storage::disk('public')->delete($book->cover_image);
            }
            $data['cover_image'] = $request->file('cover_image')->store('covers', 'public');
        }
        if ($request->hasFile('file_path')) {
            if ($book->file_path) {
                Storage::disk('public')->delete($book->file_path);
            }
            $data['file_path'] = $request->file('file_path')->store('books', 'public');
        }
        $book->update($data);
        return response()->json($book);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $book = Book::findOrFail($id);
        $book->delete();
        return response()->json(['message' => 'Book soft deleted.']);
    }

    // Restore a soft-deleted book (admin only)
    public function restore(string $id)
    {
        $book = Book::withTrashed()->findOrFail($id);
        $book->restore();
        return response()->json(['message' => 'Book restored.']);
    }
}
