<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('rewards', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('description');
            $table->integer('points')->default(0);
            $table->string('type')->default('badge'); // badge, coupon, etc.
            $table->timestamps();
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('rewards');
    }
}; 