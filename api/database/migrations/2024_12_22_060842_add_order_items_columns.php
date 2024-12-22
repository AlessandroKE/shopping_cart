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
        Schema::table('order_items', function (Blueprint $table) {
            $table->foreignId('order_id')->after('id')->constrained()->cascadeOnDelete();
            $table->foreignId('product_id')->after('order_id')->constrained();
            $table->decimal('price', 10, 2)->after('product_id');
            $table->integer('quantity')->after('price');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('order_items', function (Blueprint $table) {
            $table->dropForeign(['order_id']);
            $table->dropForeign(['product_id']);
            $table->dropColumn(['order_id', 'product_id', 'price', 'quantity']);
        });
    }
};
