<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use Illuminate\Http\Request;

class ComplianceReportController extends Controller
{
    public function index()
    {
        // Example compliance checks
        $recentCriticalActions = AuditLog::whereIn('action', [
            'assign_role', 'remove_role', 'give_permission', 'revoke_permission',
            'delete_user', 'delete_role', 'bulk_assign_role', 'bulk_remove_role',
        ])->latest()->limit(50)->get();
        $failedLogins = AuditLog::where('action', 'failed_login')->latest()->limit(50)->get();
        $suspiciousBulkOps = AuditLog::where('action', 'like', 'bulk_%')->where('details', 'like', '%failed%')->latest()->get();
        return view('admin.compliance.index', compact('recentCriticalActions', 'failedLogins', 'suspiciousBulkOps'));
    }
} 