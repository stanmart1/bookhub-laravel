<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book;
use App\Models\ContentReport;

class ContentController extends Controller
{
    public function updateBook(Request $request, $id)
    {
        $book = Book::findOrFail($id);
        $book->update($request->all());
        return response()->json($book);
    }

    public function uploadContent(Request $request)
    {
        // Handle file upload
        return response()->json(['message' => 'Content uploaded successfully.']);
    }

    public function generatePreview(Request $request)
    {
        // Generate preview
        return response()->json(['message' => 'Preview generated successfully.']);
    }

    public function bulkImport(Request $request)
    {
        // Handle bulk import
        return response()->json(['message' => 'Bulk import started.']);
    }

    public function getContentModerationQueue()
    {
        $items = ContentReport::where('status', 'pending')->get();
        return response()->json($items);
    }

    public function getAuthorPortalData(Request $request)
    {
        $user = $request->user();
        $data = [
            'totalBooks' => $user->books()->count(),
            'totalSales' => $user->books()->withCount('orders')->get()->sum('orders_count'),
            'totalRevenue' => $user->books()->with('orders')->get()->sum(function ($book) {
                return $book->orders->sum('total');
            }),
        ];
        return response()->json($data);
    }
}
