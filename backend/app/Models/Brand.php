<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'origin',
        'description',
        'logo',
        'colors',
        'storytelling',
        'is_active',
        'display_order',
        'link',
    ];

    protected $casts = [
        'colors' => 'array',
    ];

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public function documents()
    {
        return $this->hasMany(Document::class);
    }
}
