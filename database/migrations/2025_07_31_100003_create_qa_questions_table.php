<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('qa_questions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('qa_session_id');
            $table->unsignedBigInteger('user_id');
            $table->text('question');
            $table->text('answer')->nullable();
            $table->unsignedBigInteger('answered_by')->nullable();
            $table->timestamps();

            $table->foreign('qa_session_id')->references('id')->on('qa_sessions')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('answered_by')->references('id')->on('users')->onDelete('set null');
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('qa_questions');
    }
}; 