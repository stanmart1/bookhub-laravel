<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('book_club_members', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('book_club_id');
            $table->unsignedBigInteger('user_id');
            $table->timestamps();

            $table->foreign('book_club_id')->references('id')->on('book_clubs')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->unique(['book_club_id', 'user_id']);
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('book_club_members');
    }
}; 