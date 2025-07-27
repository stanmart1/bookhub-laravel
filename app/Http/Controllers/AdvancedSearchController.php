<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book;
use App\Models\SavedSearch;
use App\Models\SearchHistory;

class AdvancedSearchController extends Controller
{
    public function search(Request $request)
    {
        $query = Book::query();

        if ($request->has('author')) {
            $query->where('author', 'like', '%' . $request->input('author') . '%');
        }

        if ($request->has('genre')) {
            $query->where('genre', 'like', '%' . $request->input('genre') . '%');
        }

        if ($request->has('year')) {
            $query->where('publication_year', $request->input('year'));
        }

        $results = $query->get();

        // Save search history
        SearchHistory::create([
            'user_id' => $request->user()->id,
            'query' => json_encode($request->all()),
        ]);

        return response()->json($results);
    }

    public function saveSearch(Request $request)
    {
        $user = $request->user();
        SavedSearch::create([
            'user_id' => $user->id,
            'query' => json_encode($request->input('query')),
        ]);

        return response()->json(['message' => 'Search saved successfully.']);
    }

    public function getSavedSearches(Request $request)
    {
        $user = $request->user();
        $savedSearches = SavedSearch::where('user_id', $user->id)->get();
        return response()->json($savedSearches);
    }

    public function deleteSavedSearch(Request $request, $id)
    {
        $user = $request->user();
        SavedSearch::where('id', $id)->where('user_id', $user->id)->delete();

        return response()->json(['message' => 'Search deleted successfully.']);
    }

    public function getSearchHistory(Request $request)
    {
        $user = $request->user();
        $searchHistory = SearchHistory::where('user_id', $user->id)->latest()->take(10)->get();
        return response()->json($searchHistory);
    }
}
