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
        Schema::table('reading_progress', function (Blueprint $table) {
            // Add new columns
            $table->string('current_chapter')->nullable()->after('total_pages');
            $table->decimal('progress_percentage', 5, 2)->default(0.00)->after('current_chapter');
            $table->integer('time_spent_seconds')->default(0)->after('progress_percentage');
            $table->boolean('is_completed')->default(false)->after('time_spent_seconds');
            $table->json('reading_session_data')->nullable()->after('is_completed');
            
            // Modify existing columns
            $table->integer('current_page')->default(1)->change();
            $table->integer('total_pages')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('reading_progress', function (Blueprint $table) {
            // Drop new columns
            $table->dropColumn(['current_chapter', 'progress_percentage', 'time_spent_seconds', 'is_completed', 'reading_session_data']);
            
            // Modify back existing columns
            $table->integer('current_page')->default(0)->change();
            $table->integer('total_pages')->default(0)->change();
        });
    }
};
