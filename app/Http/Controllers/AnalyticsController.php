<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\User;
use App\Models\Book;

class AnalyticsController extends Controller
{
    public function getDashboardData()
    {
        $totalRevenue = Order::where('status', 'completed')->sum('total');
        $newUsers = User::where('created_at', '>=', now()->subDays(30))->count();
        $booksSold = Order::withCount('items')->get()->sum('items_count');
        $conversionRate = 0; // Placeholder

        return response()->json([
            'totalRevenue' => $totalRevenue,
            'newUsers' => $newUsers,
            'booksSold' => $booksSold,
            'conversionRate' => $conversionRate,
        ]);
    }

    public function getRevenueCharts()
    {
        // Placeholder data
        $data = [
            ['name' => 'Jan', 'revenue' => 4000],
            ['name' => 'Feb', 'revenue' => 3000],
            ['name' => 'Mar', 'revenue' => 5000],
            ['name' => 'Apr', 'revenue' => 4500],
            ['name' => 'May', 'revenue' => 6000],
            ['name' => 'Jun', 'revenue' => 5500],
        ];

        return response()->json($data);
    }

    public function getUserEngagement()
    {
        // Placeholder data
        $data = [
            'dau' => 100,
            'mau' => 1000,
            'sessionDuration' => 10,
        ];

        return response()->json($data);
    }

    public function getBookPerformance()
    {
        $books = Book::withCount('orders')->orderBy('orders_count', 'desc')->take(10)->get();
        return response()->json($books);
    }

    public function getRealTimeMetrics()
    {
        // Placeholder data
        $data = [
            'activeUsers' => 50,
            'sales' => 10,
        ];

        return response()->json($data);
    }
}
