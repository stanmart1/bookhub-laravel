<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('phone')->nullable()->after('email');
            $table->json('preferences')->nullable()->after('phone');
            $table->json('notification_settings')->nullable()->after('preferences');
            $table->boolean('two_factor_enabled')->default(false)->after('notification_settings');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['phone', 'preferences', 'notification_settings', 'two_factor_enabled']);
        });
    }
};
