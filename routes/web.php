<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\ReaderController;

// Public routes
Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

// Book routes
Route::get('/books', function () {
    return Inertia::render('Books/Index');
})->name('books.index');

Route::get('/books/search', function () {
    return Inertia::render('Books/Search');
})->name('books.search');

Route::get('/books/category', function () {
    return Inertia::render('Books/Category');
})->name('books.category');

Route::get('/books/{id}', function ($id) {
    return Inertia::render('Books/Show', ['bookId' => $id]);
})->name('books.show');

// Cart routes
Route::get('/cart', function () {
    return Inertia::render('Cart/Index');
})->name('cart.index');

Route::get('/cart/checkout', function () {
    return Inertia::render('Cart/Checkout');
})->name('cart.checkout');

// Authentication routes
Route::middleware('guest')->group(function () {
    Route::get('/login', function () {
        return Inertia::render('Auth/Login');
    })->name('login');

    Route::post('/login', [AuthController::class, 'login']);

    Route::get('/register', function () {
        return Inertia::render('Auth/Register');
    })->name('register');

    Route::post('/register', [AuthController::class, 'register']);

    Route::get('/forgot-password', function () {
        return Inertia::render('Auth/ForgotPassword');
    })->name('password.request');

    Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);

    Route::get('/reset-password/{token}', function ($token) {
        return Inertia::render('Auth/ResetPassword', [
            'token' => $token,
            'email' => request()->query('email', ''),
        ]);
    })->name('password.reset');

    Route::post('/reset-password', [AuthController::class, 'resetPassword']);
});

// Protected routes
Route::middleware('auth')->group(function () {
    // Default dashboard route that redirects based on role
    Route::get('/dashboard', function () {
        $user = auth()->user();
        if ($user->roles()->where('name', 'admin')->exists()) {
            return redirect('/admin/dashboard');
        } else {
            return redirect('/account/dashboard');
        }
    })->name('dashboard');
    
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

    Route::get('/two-factor-challenge', function () {
        return Inertia::render('Auth/TwoFactorChallenge');
    })->name('two-factor.challenge');

    Route::post('/two-factor-challenge', [AuthController::class, 'twoFactorChallenge']);

    Route::get('/email/verify', function () {
        return Inertia::render('Auth/VerifyEmail');
    })->name('verification.notice');

    Route::post('/email/verification-notification', [AuthController::class, 'resendVerification'])
        ->name('verification.send');
});

// Email verification
Route::get('/email/verify/{id}/{hash}', [AuthController::class, 'verifyEmail'])
    ->middleware(['auth', 'signed'])
    ->name('verification.verify');

// Reader routes
Route::middleware('auth')->prefix('reader')->group(function () {
    Route::get('/book/{book}', [ReaderController::class, 'show'])->name('reader.book');
    Route::get('/settings', [ReaderController::class, 'settings'])->name('reader.settings');
    Route::get('/library', [ReaderController::class, 'library'])->name('reader.library');
});

// Admin routes
Route::middleware('auth')->prefix('admin')->group(function () {
    Route::get('/dashboard', function () {
        $user = auth()->user();
        if (!$user || !$user->roles()->where('name', 'admin')->exists()) {
            abort(403, 'Access denied. Admin role required.');
        }
        return Inertia::render('Admin/Dashboard');
    })->name('admin.dashboard');
    
    // Admin API endpoints (web routes for session authentication)
    Route::get('/api/stats', function () {
        $user = auth()->user();
        if (!$user || !$user->roles()->where('name', 'admin')->exists()) {
            abort(403, 'Access denied. Admin role required.');
        }
        
        $stats = [
            'totalUsers' => \App\Models\User::count(),
            'totalBooks' => \App\Models\Book::count(),
            'totalOrders' => \App\Models\Order::count(),
            'totalRevenue' => \App\Models\Order::where('status', 'completed')->sum('total'),
            'activeUsers' => \App\Models\User::where('created_at', '>=', now()->subDays(30))->count(),
            'pendingOrders' => \App\Models\Order::where('status', 'pending')->count(),
            'lowStockBooks' => 0,
            'monthlyGrowth' => 0,
        ];
        
        return response()->json($stats);
    })->name('admin.api.stats');
    
    Route::get('/api/recent-activity', function () {
        $user = auth()->user();
        if (!$user || !$user->roles()->where('name', 'admin')->exists()) {
            abort(403, 'Access denied. Admin role required.');
        }
        
        $recentActivity = \App\Models\AuditLog::with('user:id,name,email')
            ->latest()
            ->take(10)
            ->get()
            ->map(function ($log) {
                return [
                    'id' => $log->id,
                    'type' => 'system',
                    'description' => $log->description ?? 'System activity',
                    'user' => $log->user->email ?? 'System',
                    'timestamp' => $log->created_at->diffForHumans(),
                    'status' => 'active',
                ];
            });
        
        return response()->json($recentActivity);
    })->name('admin.api.recent-activity');
    
    Route::get('/api/users', function () {
        $user = auth()->user();
        if (!$user || !$user->roles()->where('name', 'admin')->exists()) {
            abort(403, 'Access denied. Admin role required.');
        }
        
        $users = \App\Models\User::with('roles')
            ->get()
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->roles->first()?->name ?? 'customer',
                    'status' => 'active', // Assuming all users are active
                    'joinedDate' => $user->created_at->format('Y-m-d'),
                    'lastLogin' => $user->updated_at->format('Y-m-d'), // Using updated_at as proxy
                    'orders' => \App\Models\Order::where('user_id', $user->id)->count(),
                    'totalSpent' => \App\Models\Order::where('user_id', $user->id)
                        ->where('status', 'completed')
                        ->sum('total'),
                ];
            });
        
        return response()->json($users);
    })->name('admin.api.users');
    
    Route::get('/users', function () {
        return Inertia::render('Admin/Users/Index');
    })->name('admin.users.index');
    
    Route::get('/books', function () {
        return Inertia::render('Admin/Books/Index');
    })->name('admin.books.index');
    
    Route::get('/orders', function () {
        return Inertia::render('Admin/Orders/Index');
    })->name('admin.orders.index');
    
    Route::get('/analytics', function () {
        return Inertia::render('Admin/Analytics/Overview');
    })->name('admin.analytics');
});

// Account routes
Route::middleware('auth')->prefix('account')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Account/Dashboard');
    })->name('account.dashboard');
    
    Route::get('/library', function () {
        return Inertia::render('Account/Library');
    })->name('account.library');
    
    Route::get('/orders', function () {
        return Inertia::render('Account/Orders');
    })->name('account.orders');
    
    Route::get('/settings', function () {
        return Inertia::render('Account/Settings');
    })->name('account.settings');
    
    Route::get('/billing', function () {
        return Inertia::render('Account/Billing');
    })->name('account.billing');
});
