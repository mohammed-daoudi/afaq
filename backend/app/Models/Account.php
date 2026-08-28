<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'type',
        'status',
        'name',
        'address',
        'city',
        'lat',
        'lng',
        'google_maps_link',
        'tariff_group',
    ];

    protected static function booted()
    {
        $clearCaches = function ($account) {
            if ($account->type === 'pharmacie') {
                \Illuminate\Support\Facades\Cache::forget('api.pharmacies');
                
                // Clear any product-specific caches for products this pharmacy has
                foreach ($account->inventories as $inventory) {
                    \Illuminate\Support\Facades\Cache::forget('api.product_pharmacies.' . $inventory->product_id);
                }
            }
        };

        static::saved($clearCaches);
        static::deleted($clearCaches);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function prices()
    {
        return $this->hasMany(Pricing::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function documents()
    {
        return $this->hasMany(Document::class);
    }

    public function crmEntries()
    {
        return $this->hasMany(CrmEntry::class);
    }

    public function inventories()
    {
        return $this->hasMany(Inventory::class);
    }
}
