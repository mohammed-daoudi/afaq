<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCrmEntriesTable extends Migration
{
    /**
     * Run the migrations.
     * Full schema (account_id, commercial_id, type: visit/call/email/meeting, notes, next_follow_up_date)
     * to be defined in the next dev pass.
     */
    public function up()
    {
        Schema::create('crm_entries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('account_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('type');
            $table->text('notes')->nullable();
            $table->date('date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::dropIfExists('crm_entries');
    }
}
