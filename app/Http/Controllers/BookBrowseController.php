<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;

class BookBrowseController extends Controller
{
    public function index(Request $request)
    {
        $query = Book::query();
        if ($request->filled('q')) {
            $query = Book::search($request->input('q'));
        }
        if ($request->filled('author')) {
            $query = $query->where('author', $request->input('author'));
        }
        if ($request->filled('min_price')) {
            $query = $query->where('price', '>=', $request->input('min_price'));
        }
        if ($request->filled('max_price')) {
            $query = $query->where('price', '<=', $request->input('max_price'));
        }
        $sort = $request->input('sort', 'created_at');
        $order = $request->input('order', 'desc');
        $query = $query->orderBy($sort, $order);
        $books = $query->paginate(12);
        return view('browse.index', compact('books'));
    }
}
