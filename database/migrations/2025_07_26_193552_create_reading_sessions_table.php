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
        Schema::create('reading_sessions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('book_id')->constrained()->onDelete('cascade');
            $table->timestamp('started_at');
            $table->timestamp('ended_at')->nullable();
            $table->integer('duration_seconds')->default(0);
            $table->integer('pages_read')->default(0);
            $table->integer('start_page')->nullable();
            $table->integer('end_page')->nullable();
            $table->string('device_info')->nullable();
            $table->string('ip_address')->nullable();
            $table->json('session_data')->nullable(); // Additional session information
            $table->timestamps();

            // Indexes for performance
            $table->index(['user_id', 'started_at']);
            $table->index(['book_id', 'started_at']);
            $table->index(['user_id', 'book_id', 'started_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reading_sessions');
    }
};
