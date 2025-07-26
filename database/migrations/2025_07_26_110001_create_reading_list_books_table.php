<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reading_list_books', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('reading_list_id');
            $table->unsignedBigInteger('book_id');
            $table->timestamps();

            $table->foreign('reading_list_id')->references('id')->on('reading_lists')->onDelete('cascade');
            $table->foreign('book_id')->references('id')->on('books')->onDelete('cascade');
            $table->unique(['reading_list_id', 'book_id']);
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('reading_list_books');
    }
}; 