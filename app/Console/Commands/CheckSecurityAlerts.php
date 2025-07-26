<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\AuditLog;
use Illuminate\Support\Facades\Log;

class CheckSecurityAlerts extends Command
{
    protected $signature = 'security:check-alerts';
    protected $description = 'Check for suspicious activity and send alerts';

    public function handle()
    {
        $failedLogins = AuditLog::where('action', 'failed_login')
            ->where('created_at', '>=', now()->subHour())
            ->groupBy('user_id')
            ->havingRaw('COUNT(*) > 5')
            ->pluck('user_id');
        $suspiciousBulkOps = AuditLog::where('action', 'like', 'bulk_%')
            ->where('details', 'like', '%failed%')
            ->where('created_at', '>=', now()->subDay())
            ->get();
        if ($failedLogins->count() > 0) {
            Log::warning('Security Alert: Multiple failed logins detected for users: ' . $failedLogins->join(','));
        }
        if ($suspiciousBulkOps->count() > 0) {
            Log::warning('Security Alert: Suspicious bulk RBAC operations detected.');
        }
        $this->info('Security checks completed.');
    }
} 