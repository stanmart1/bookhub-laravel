<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Order;
use App\Models\ReadingProgress;

class AccountController extends Controller
{
    // Display order history
    public function orders()
    {
        $user = Auth::user();
        $orders = Order::where('user_id', $user->id)->with('orderItems.book')->get();
        return view('account.orders', compact('orders'));
    }

    // Display reading statistics
    public function statistics()
    {
        $user = Auth::user();
        $progress = ReadingProgress::where('user_id', $user->id)->get();
        $totalBooks = $progress->count();
        $totalPages = $progress->sum('total_pages');
        $pagesRead = $progress->sum('current_page');
        $completedBooks = $progress->where('current_page', '=', 'total_pages')->count();
        $stats = [
            'total_books' => $totalBooks,
            'total_pages' => $totalPages,
            'pages_read' => $pagesRead,
            'completed_books' => $completedBooks,
        ];
        return view('account.statistics', compact('stats'));
    }
}
