<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inventory extends Model
{
    use HasFactory;

    protected $fillable = [
        'account_id',
        'product_id',
        'in_stock',
    ];

    protected $casts = [
        'in_stock' => 'boolean',
    ];

    protected static function booted()
    {
        static::saved(function ($inventory) {
            \Illuminate\Support\Facades\Cache::forget('api.product_pharmacies.' . $inventory->product_id);
        });

        static::deleted(function ($inventory) {
            \Illuminate\Support\Facades\Cache::forget('api.product_pharmacies.' . $inventory->product_id);
        });
    }

    public function account()
    {
        return $this->belongsTo(Account::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
