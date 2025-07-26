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
        Schema::create('bookmarks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('book_id')->constrained()->onDelete('cascade');
            $table->integer('page_number')->nullable();
            $table->string('chapter')->nullable();
            $table->string('location')->nullable(); // For EPUB spine locations
            $table->text('note')->nullable();
            $table->string('title')->nullable();
            $table->json('metadata')->nullable(); // Additional bookmark data
            $table->timestamps();

            // Indexes for performance
            $table->index(['user_id', 'book_id']);
            $table->index(['book_id', 'page_number']);
            $table->index(['user_id', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookmarks');
    }
};
