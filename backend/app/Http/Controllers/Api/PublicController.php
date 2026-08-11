<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\Product;
use App\Models\Account;
use App\Models\BlogPost;

class PublicController extends Controller
{
    public function brands()
    {
        return response()->json(Brand::all());
    }

    public function products()
    {
        // Public products do not show prices
        return response()->json(Product::with('brand')->get());
    }

    public function pharmacies()
    {
        $driver = config('database.connections.' . config('database.default') . '.driver');
        
        // Only return validated pharmacies
        $query = Account::where('type', 'pharmacie')
            ->where('status', 'valide');
            
        if ($driver === 'sqlite') {
            $pharmacies = $query->select('id', 'name', 'address', 'city', 'lat', 'lng')->get();
        } else {
            // Extract coordinates from PostGIS
            $pharmacies = $query->select('id', 'name', 'address', 'city', \Illuminate\Support\Facades\DB::raw('ST_Y(location::geometry) as lat, ST_X(location::geometry) as lng'))->get();
        }
            
        return response()->json($pharmacies);
    }

    public function blogPosts()
    {
        return response()->json(BlogPost::with('author')->orderBy('published_at', 'desc')->get());
    }
}
