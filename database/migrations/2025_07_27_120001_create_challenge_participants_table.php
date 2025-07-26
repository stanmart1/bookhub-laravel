<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('challenge_participants', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('reading_challenge_id');
            $table->unsignedBigInteger('user_id');
            $table->integer('books_read')->default(0);
            $table->timestamps();

            $table->foreign('reading_challenge_id')->references('id')->on('reading_challenges')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->unique(['reading_challenge_id', 'user_id']);
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('challenge_participants');
    }
}; 