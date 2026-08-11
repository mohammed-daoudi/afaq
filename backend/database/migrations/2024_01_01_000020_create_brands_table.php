<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBrandsTable extends Migration
{
    /**
     * Run the migrations.
     * Full schema (name, origin, description, logo, colors, storytelling) to be defined in the next dev pass.
     */
    public function up()
    {
        Schema::create('brands', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('origin');
            $table->text('description')->nullable();
            $table->string('logo')->nullable();
            $table->json('colors')->nullable();
            $table->text('storytelling')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::dropIfExists('brands');
    }
}
