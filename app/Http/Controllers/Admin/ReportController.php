<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\User;
use App\Models\Book;
use App\Models\UserEvent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    public function index()
    {
        $sales = Order::count();
        $totalRevenue = Order::sum('total_amount');
        $userGrowth = User::selectRaw('DATE(created_at) as date, COUNT(*) as count')->groupBy('date')->orderBy('date')->get();
        $bookPopularity = UserEvent::where('event_type', 'book_view')
            ->selectRaw('event_data, COUNT(*) as views')
            ->groupBy('event_data')
            ->orderByDesc('views')
            ->limit(10)
            ->get();
        // Performance monitoring (example: from a logs table or similar)
        $avgResponseTime = DB::table('audit_logs')->avg('details->response_time');
        $errorCount = DB::table('audit_logs')->where('action', 'like', '%error%')->count();
        return view('admin.reports.index', compact('sales', 'totalRevenue', 'userGrowth', 'bookPopularity', 'avgResponseTime', 'errorCount'));
    }
} 