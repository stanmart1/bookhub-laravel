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
        Schema::create('bulk_role_permission_ops', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('operator_id'); // user who performed the operation
            $table->enum('operation_type', ['assign_role', 'remove_role', 'assign_permission', 'remove_permission']);
            $table->json('affected_user_ids')->nullable();
            $table->json('affected_role_ids')->nullable();
            $table->json('affected_permission_ids')->nullable();
            $table->string('status')->default('pending'); // pending, completed, failed
            $table->text('error_message')->nullable();
            $table->timestamps();

            $table->foreign('operator_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bulk_role_permission_ops');
    }
};
