<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('achievements', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('description');
            $table->string('icon')->nullable();
            $table->string('criteria_type'); // e.g. 'books_read', 'streak', etc.
            $table->integer('criteria_value');
            $table->timestamps();
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('achievements');
    }
}; 