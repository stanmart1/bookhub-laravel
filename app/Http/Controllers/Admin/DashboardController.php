<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\AuditLog;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        if ($user->hasRole('admin')) {
            return view('admin.dashboard.admin');
        } elseif ($user->hasRole('editor')) {
            return view('admin.dashboard.editor');
        } else {
            abort(403, 'Unauthorized.');
        }
    }

    public function audit()
    {
        $logs = AuditLog::with('user')->latest()->paginate(50);
        return view('admin.audit.index', compact('logs'));
    }

    public function apiAuditLogs(Request $request)
    {
        $user = Auth::user();
        if (!$user || !$user->hasRole('admin')) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
        $logs = AuditLog::with('user:id,name,email')->latest()->paginate(50);
        return response()->json($logs);
    }

    public function apiStats(Request $request)
    {
        $user = Auth::user();
        if (!$user || !$user->hasRole('admin')) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Get real stats from database
        $stats = [
            'totalUsers' => \App\Models\User::count(),
            'totalBooks' => \App\Models\Book::count(),
            'totalOrders' => \App\Models\Order::count(),
            'totalRevenue' => \App\Models\Order::where('status', 'completed')->sum('total'),
            'activeUsers' => \App\Models\User::where('created_at', '>=', now()->subDays(30))->count(), // Using created_at as proxy for active users
            'pendingOrders' => \App\Models\Order::where('status', 'pending')->count(),
            'lowStockBooks' => 0, // No stock_quantity column in books table
            'monthlyGrowth' => $this->calculateMonthlyGrowth(),
        ];

        return response()->json($stats);
    }

    public function apiRecentActivity(Request $request)
    {
        $user = Auth::user();
        if (!$user || !$user->hasRole('admin')) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Get recent activity from audit logs
        $recentActivity = AuditLog::with('user:id,name,email')
            ->latest()
            ->take(10)
            ->get()
            ->map(function ($log) {
                return [
                    'id' => $log->id,
                    'type' => $this->mapActivityType($log->action),
                    'description' => $log->description,
                    'user' => $log->user->email ?? 'System',
                    'timestamp' => $log->created_at->diffForHumans(),
                    'status' => $this->mapActivityStatus($log->action),
                ];
            });

        return response()->json($recentActivity);
    }

    private function calculateMonthlyGrowth()
    {
        $currentMonth = \App\Models\User::where('created_at', '>=', now()->startOfMonth())->count();
        $lastMonth = \App\Models\User::whereBetween('created_at', [
            now()->subMonth()->startOfMonth(),
            now()->subMonth()->endOfMonth()
        ])->count();

        if ($lastMonth === 0) {
            return $currentMonth > 0 ? 100 : 0;
        }

        return round((($currentMonth - $lastMonth) / $lastMonth) * 100, 1);
    }

    private function mapActivityType($action)
    {
        $typeMap = [
            'user.created' => 'user',
            'user.updated' => 'user',
            'book.created' => 'book',
            'book.updated' => 'book',
            'order.created' => 'order',
            'order.updated' => 'order',
            'payment.received' => 'payment',
        ];

        return $typeMap[$action] ?? 'system';
    }

    private function mapActivityStatus($action)
    {
        $statusMap = [
            'user.created' => 'active',
            'user.updated' => 'active',
            'book.created' => 'published',
            'book.updated' => 'published',
            'order.created' => 'pending',
            'order.updated' => 'completed',
            'payment.received' => 'completed',
        ];

        return $statusMap[$action] ?? 'active';
    }
} 