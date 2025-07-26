<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('gift_cards', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->decimal('amount', 8, 2);
            $table->boolean('is_redeemed')->default(false);
            $table->unsignedBigInteger('redeemed_by')->nullable();
            $table->timestamp('redeemed_at')->nullable();
            $table->timestamps();

            $table->foreign('redeemed_by')->references('id')->on('users')->onDelete('set null');
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('gift_cards');
    }
}; 