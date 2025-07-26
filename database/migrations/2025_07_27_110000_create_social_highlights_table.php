<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('social_highlights', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('book_id');
            $table->text('content');
            $table->integer('page_number')->nullable();
            $table->string('color')->nullable();
            $table->unsignedBigInteger('shared_with_club_id')->nullable();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('book_id')->references('id')->on('books')->onDelete('cascade');
            $table->foreign('shared_with_club_id')->references('id')->on('book_clubs')->onDelete('set null');
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('social_highlights');
    }
}; 