<?php

namespace App\Http\Controllers;

use App\Models\ReadingList;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReadingListController extends Controller
{
    public function index()
    {
        $lists = ReadingList::where('user_id', Auth::id())->with('books')->get();
        return view('reading_lists.index', compact('lists'));
    }

    public function create()
    {
        return view('reading_lists.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);
        $list = ReadingList::create([
            'user_id' => Auth::id(),
            'name' => $request->name,
            'description' => $request->description,
        ]);
        return redirect()->route('reading-lists.show', $list);
    }

    public function show($id)
    {
        $list = ReadingList::with('books')->where('user_id', Auth::id())->findOrFail($id);
        $allBooks = Book::all();
        return view('reading_lists.show', compact('list', 'allBooks'));
    }

    public function addBook(Request $request, $id)
    {
        $list = ReadingList::where('user_id', Auth::id())->findOrFail($id);
        $request->validate(['book_id' => 'required|exists:books,id']);
        $list->books()->syncWithoutDetaching([$request->book_id]);
        return back();
    }

    public function removeBook(Request $request, $id)
    {
        $list = ReadingList::where('user_id', Auth::id())->findOrFail($id);
        $request->validate(['book_id' => 'required|exists:books,id']);
        $list->books()->detach($request->book_id);
        return back();
    }
} 