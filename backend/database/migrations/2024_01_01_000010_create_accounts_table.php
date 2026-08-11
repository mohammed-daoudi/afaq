<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAccountsTable extends Migration
{
    /**
     * Run the migrations.
     * Full schema (type, status, coordinates, tariff, auth) to be defined in the next dev pass.
     */
    public function up()
    {
        $driver = config('database.connections.' . config('database.default') . '.driver');
        
        // Enable PostGIS extension for geographical types only if using Postgres
        if ($driver === 'pgsql') {
            \Illuminate\Support\Facades\DB::statement('CREATE EXTENSION IF NOT EXISTS postgis;');
        }
        
        Schema::create('accounts', function (Blueprint $table) use ($driver) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null');
            $table->string('type');
            $table->string('status');
            $table->string('name');
            $table->string('address')->nullable();
            $table->string('city')->nullable();
            
            if ($driver === 'sqlite') {
                $table->decimal('lat', 10, 8)->nullable();
                $table->decimal('lng', 11, 8)->nullable();
            } else {
                $table->point('location')->nullable();
            }
            
            $table->string('tariff_group')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::dropIfExists('accounts');
    }
}
