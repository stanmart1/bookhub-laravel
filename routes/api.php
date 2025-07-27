<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RBACController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\Api\ReaderSettingsController;
use App\Http\Controllers\Api\ReaderController;
use App\Http\Controllers\RecommendationController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\CheckoutController;

Route::get('test-alive', function () { return 'alive'; });
Route::post('books-test', [BookController::class, 'store']);

// Public routes
Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);
// Public book routes
Route::get('books', [BookController::class, 'index']);
Route::get('books/{book}', [BookController::class, 'show']);

// Protected routes
Route::middleware(['auth'])->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('me', [AuthController::class, 'me']);

    // RBAC management (admin only)
    // Admin routes with inline role checks
    Route::post('users/{user}/assign-role', [RBACController::class, 'assignRole']);
    Route::post('users/{user}/remove-role', [RBACController::class, 'removeRole']);
    Route::post('users/{user}/give-permission', [RBACController::class, 'givePermission']);
    Route::post('users/{user}/revoke-permission', [RBACController::class, 'revokePermission']);
    // Admin sync controls
    Route::post('users/{user}/enable-sync', [RBACController::class, 'enableSync']);
    Route::post('users/{user}/disable-sync', [RBACController::class, 'disableSync']);
    Route::get('users/{user}/sync-status', [RBACController::class, 'syncStatus']);
    Route::get('audit-logs', [\App\Http\Controllers\Admin\DashboardController::class, 'apiAuditLogs']);
    Route::get('admin/stats', [\App\Http\Controllers\Admin\DashboardController::class, 'apiStats']);
    Route::get('admin/recent-activity', [\App\Http\Controllers\Admin\DashboardController::class, 'apiRecentActivity']);
    Route::get('users', [\App\Http\Controllers\RBACController::class, 'apiUsers']);

    // Example: Only users with 'manage_books' permission
    Route::middleware('permission:manage_books')->group(function () {
        Route::get('books/manage', function () {
            return response()->json(['message' => 'You can manage books!']);
        });
    });

    // Book and Category API routes (admin/editor only for create/update/delete)
    Route::post('books', [BookController::class, 'store']);
    Route::put('books/{book}', [BookController::class, 'update']);
    Route::delete('books/{book}', [BookController::class, 'destroy']);
    Route::apiResource('categories', CategoryController::class)->except(['index', 'show']);
    // Restore soft-deleted books (admin only)
    Route::post('books/{id}/restore', [BookController::class, 'restore']);
    
    // All authenticated users can view categories
    Route::apiResource('categories', CategoryController::class)->only(['index', 'show']);

    // Cart API endpoints
    Route::get('cart', [\App\Http\Controllers\CartController::class, 'index']);
    Route::post('cart/add', [\App\Http\Controllers\CartController::class, 'add']);
    Route::post('cart/update', [\App\Http\Controllers\CartController::class, 'update']);
    Route::post('cart/remove', [\App\Http\Controllers\CartController::class, 'remove']);
    Route::post('cart/clear', [\App\Http\Controllers\CartController::class, 'clear']);

    // Order and Checkout API endpoints
    Route::post('orders', [OrderController::class, 'store']);
    Route::get('orders', [OrderController::class, 'index']);
    Route::get('orders/{order}', [OrderController::class, 'show']);
    Route::put('orders/{order}/status', [OrderController::class, 'updateStatus']);
    
    Route::post('checkout/process', [CheckoutController::class, 'process']);
    Route::post('checkout/summary', [CheckoutController::class, 'summary']);
    Route::post('checkout/validate-shipping', [CheckoutController::class, 'validateShipping']);
    Route::post('checkout/validate-payment', [CheckoutController::class, 'validatePayment']);

    // Reader API endpoints
    Route::prefix('reader')->group(function () {
        // Reading progress
        Route::get('books/{bookId}/progress', [ReaderController::class, 'getProgress']);
        Route::post('books/{bookId}/progress', [ReaderController::class, 'updateProgress']);
        
        // Bookmarks
        Route::get('books/{bookId}/bookmarks', [ReaderController::class, 'getBookmarks']);
        Route::post('books/{bookId}/bookmarks', [ReaderController::class, 'createBookmark']);
        Route::put('books/{bookId}/bookmarks/{bookmarkId}', [ReaderController::class, 'updateBookmark']);
        Route::delete('books/{bookId}/bookmarks/{bookmarkId}', [ReaderController::class, 'deleteBookmark']);
        
        // Highlights
        Route::get('books/{bookId}/highlights', [ReaderController::class, 'getHighlights']);
        Route::post('books/{bookId}/highlights', [ReaderController::class, 'createHighlight']);
        Route::put('books/{bookId}/highlights/{highlightId}', [ReaderController::class, 'updateHighlight']);
        Route::delete('books/{bookId}/highlights/{highlightId}', [ReaderController::class, 'deleteHighlight']);
        
        // Reading sessions
        Route::post('books/{bookId}/sessions', [ReaderController::class, 'startSession']);
        Route::put('books/{bookId}/sessions/{sessionId}', [ReaderController::class, 'endSession']);
        
        // Statistics
        Route::get('books/{bookId}/stats', [ReaderController::class, 'getStats']);
        
        // Settings
        Route::get('settings', [ReaderController::class, 'getSettings']);
        Route::post('settings', [ReaderController::class, 'updateSettings']);
    });

    // Legacy reader settings routes
    Route::get('/reader-settings', [ReaderSettingsController::class, 'show']);
    Route::post('/reader-settings', [ReaderSettingsController::class, 'update']);

    // Recommendation endpoints
    Route::get('recommendations/trending', [RecommendationController::class, 'trending']);
    Route::get('recommendations/readers-also-bought', [RecommendationController::class, 'readersAlsoBought']);

    // Account management API endpoints
    Route::put('profile', [\App\Http\Controllers\Api\AccountController::class, 'updateProfile']);
    Route::put('preferences', [\App\Http\Controllers\Api\AccountController::class, 'updatePreferences']);
    Route::put('security/password', [\App\Http\Controllers\Api\AccountController::class, 'updatePassword']);
    Route::post('security/two-factor', [\App\Http\Controllers\Api\AccountController::class, 'toggleTwoFactor']);
    Route::put('notifications/settings', [\App\Http\Controllers\Api\AccountController::class, 'updateNotificationSettings']);
    Route::post('notifications/mark-read', [\App\Http\Controllers\Api\AccountController::class, 'markNotificationsAsRead']);
    Route::put('billing/plan', [\App\Http\Controllers\Api\AccountController::class, 'updatePlan']);
    Route::post('billing/payment-method', [\App\Http\Controllers\Api\AccountController::class, 'addPaymentMethod']);

    // Analytics API endpoints
    Route::get('analytics/reading-stats', [\App\Http\Controllers\Api\AnalyticsController::class, 'getReadingStats']);
    Route::post('analytics/reading-goals', [\App\Http\Controllers\Api\AnalyticsController::class, 'createReadingGoal']);
    Route::get('analytics/reading-streaks', [\App\Http\Controllers\Api\AnalyticsController::class, 'getReadingStreaks']);
    Route::get('analytics/vocabulary-growth', [\App\Http\Controllers\Api\AnalyticsController::class, 'getVocabularyGrowth']);
    Route::get('analytics/reading-heatmap', [\App\Http\Controllers\Api\AnalyticsController::class, 'getReadingHeatmap']);
    Route::get('analytics/reading-insights', [\App\Http\Controllers\Api\AnalyticsController::class, 'getReadingInsights']);

    // Library Management API endpoints
    Route::apiResource('library/collections', \App\Http\Controllers\Api\LibraryManagerController::class);
    Route::post('library/bulk-actions', [\App\Http\Controllers\Api\LibraryManagerController::class, 'bulkActions']);
    Route::get('library/stats', [\App\Http\Controllers\Api\LibraryManagerController::class, 'getStats']);
    Route::get('library/queue', [\App\Http\Controllers\Api\LibraryManagerController::class, 'getQueue']);
    Route::post('library/queue', [\App\Http\Controllers\Api\LibraryManagerController::class, 'updateQueue']);

    // Social Reading API endpoints
    Route::apiResource('social/book-clubs', \App\Http\Controllers\BookClubController::class);
    Route::post('social/book-clubs/{club}/join', [\App\Http\Controllers\BookClubController::class, 'joinClub']);
    Route::apiResource('social/reading-challenges', \App\Http\Controllers\ReadingChallengeController::class);
    Route::post('social/reading-challenges/{challenge}/join', [\App\Http\Controllers\ReadingChallengeController::class, 'joinChallenge']);
    Route::apiResource('social/highlights', \App\Http\Controllers\SocialHighlightController::class);
    Route::apiResource('social/discussions', \App\Http\Controllers\BookClubController::class);
    Route::get('social/activity-feed', [\App\Http\Controllers\BookClubController::class, 'getActivityFeed']);
    Route::get('social/friends-reading', [\App\Http\Controllers\BookClubController::class, 'getFriendsReading']);
    Route::apiResource('social/reviews', \App\Http\Controllers\BookClubController::class);
    Route::apiResource('social/reading-buddies', \App\Http\Controllers\BookClubController::class);

    // Extended Recommendation API endpoints
    Route::get('recommendations/personalized', [RecommendationController::class, 'getPersonalized']);
    Route::get('recommendations/similar/{book}', [RecommendationController::class, 'getSimilar']);
    Route::get('recommendations/genre/{genre}', [RecommendationController::class, 'getByGenre']);
    Route::get('recommendations/author/{author}', [RecommendationController::class, 'getByAuthor']);
    Route::get('recommendations/mood/{mood}', [RecommendationController::class, 'getByMood']);
    Route::post('recommendations/feedback', [RecommendationController::class, 'provideFeedback']);

    // RBAC API endpoints
    Route::apiResource('roles', \App\Http\Controllers\Api\RoleController::class);
    Route::post('roles/{role}/permissions', [\App\Http\Controllers\Api\RoleController::class, 'assignPermissions']);
    Route::get('permissions', [\App\Http\Controllers\Api\RoleController::class, 'permissions']);

    // Checkout API endpoint
    Route::post('checkout', [\App\Http\Controllers\Api\CheckoutController::class, 'process']);

    // Payment API endpoint
    Route::post('orders/{order}/pay', [\App\Http\Controllers\Api\PaymentController::class, 'process']);

    // Gamification API endpoints
    Route::get('achievements', [\App\Http\Controllers\GamificationController::class, 'getAchievements']);
    Route::get('leaderboard', [\App\Http\Controllers\GamificationController::class, 'getLeaderboard']);
    Route::get('reading-streak', [\App\Http\Controllers\GamificationController::class, 'getReadingStreak']);

    // Advanced Search API endpoints
    Route::post('search', [\App\Http\Controllers\AdvancedSearchController::class, 'search']);
    Route::post('saved-searches', [\App\Http\Controllers\AdvancedSearchController::class, 'saveSearch']);
    Route::get('saved-searches', [\App\Http\Controllers\AdvancedSearchController::class, 'getSavedSearches']);
    Route::delete('saved-searches/{id}', [\App\Http\Controllers\AdvancedSearchController::class, 'deleteSavedSearch']);
    Route::get('search-history', [\App\Http\Controllers\AdvancedSearchController::class, 'getSearchHistory']);

    // Notification API endpoints
    Route::get('notifications', [\App\Http\Controllers\NotificationController::class, 'getNotifications']);
    Route::post('notifications/mark-as-read', [\App\Http\Controllers\NotificationController::class, 'markAsRead']);
    Route::get('notification-settings', [\App\Http\Controllers\NotificationController::class, 'getSettings']);
    Route::post('notification-settings', [\App\Http\Controllers\NotificationController::class, 'updateSettings']);

    // Analytics API endpoints
    Route::get('analytics/dashboard', [\App\Http\Controllers\AnalyticsController::class, 'getDashboardData']);
    Route::get('analytics/revenue-charts', [\App\Http\Controllers\AnalyticsController::class, 'getRevenueCharts']);
    Route::get('analytics/user-engagement', [\App\Http\Controllers\AnalyticsController::class, 'getUserEngagement']);
    Route::get('analytics/book-performance', [\App\Http\Controllers\AnalyticsController::class, 'getBookPerformance']);
    Route::get('analytics/real-time-metrics', [\App\Http\Controllers\AnalyticsController::class, 'getRealTimeMetrics']);

    // Payment API endpoints
    Route::get('subscription-plans', [\App\Http\Controllers\PaymentController::class, 'getSubscriptionPlans']);
    Route::get('payment-methods', [\App\Http\Controllers\PaymentController::class, 'getPaymentMethods']);
    Route::post('payment-methods', [\App\Http\Controllers\PaymentController::class, 'addPaymentMethod']);
    Route::delete('payment-methods/{id}', [\App\Http\Controllers\PaymentController::class, 'deletePaymentMethod']);
    Route::get('billing-history', [\App\Http\Controllers\PaymentController::class, 'getBillingHistory']);
    Route::post('refund-requests', [\App\Http\Controllers\PaymentController::class, 'requestRefund']);

    // Content Management API endpoints
    Route::put('books/{id}', [\App\Http\Controllers\ContentController::class, 'updateBook']);
    Route::post('content/upload', [\App\Http\Controllers\ContentController::class, 'uploadContent']);
    Route::post('content/generate-preview', [\App\Http\Controllers\ContentController::class, 'generatePreview']);
    Route::post('content/bulk-import', [\App\Http\Controllers\ContentController::class, 'bulkImport']);
    Route::get('content/moderation-queue', [\App\Http\Controllers\ContentController::class, 'getContentModerationQueue']);
    Route::get('author-portal', [\App\Http\Controllers\ContentController::class, 'getAuthorPortalData']);
});