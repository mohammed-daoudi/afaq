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
