<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book;

class SearchController extends Controller
{
    public function search(Request $request)
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
        $books = $query->paginate(15);
        return response()->json($books);
    }

    public function autocomplete(Request $request)
    {
        $q = $request->input('q');
        $titles = Book::where('title', 'like', "%$q%")
            ->limit(10)
            ->pluck('title');
        return response()->json($titles);
    }
}
