<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;

class AdvancedSearchController extends Controller
{
    public function semantic(Request $request)
    {
        $q = $request->input('q');
        $query = Book::query();
        if ($q) {
            $query->where(function($q2) use ($q) {
                $q2->where('title', 'like', "%$q%")
                    ->orWhere('author', 'like', "%$q%")
                    ->orWhere('description', 'like', "%$q%")
                    ->orWhere('genre', 'like', "%$q%")
                    ;
            });
        }
        if ($request->author) $query->where('author', $request->author);
        if ($request->genre) $query->where('genre', $request->genre);
        if ($request->year) $query->whereYear('created_at', $request->year);
        $results = $query->get();
        return view('search.semantic', [
            'results' => $results,
            'q' => $q
        ]);
    }
} 