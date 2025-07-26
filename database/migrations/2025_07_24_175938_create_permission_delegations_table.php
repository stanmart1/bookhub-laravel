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
        Schema::create('permission_delegations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('delegator_id'); // user who delegates
            $table->unsignedBigInteger('delegatee_id'); // user who receives
            $table->unsignedBigInteger('permission_id');
            $table->string('context_type')->nullable();
            $table->unsignedBigInteger('context_id')->nullable();
            $table->timestamp('expires_at')->nullable();
            $table->timestamps();

            $table->foreign('delegator_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('delegatee_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('permission_id')->references('id')->on('permissions')->onDelete('cascade');
            $table->index(['context_type', 'context_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('permission_delegations');
    }
};
