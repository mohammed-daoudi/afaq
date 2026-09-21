<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\Product;
use App\Models\Account;
use App\Models\BlogPost;
use Illuminate\Http\Request;

class PublicController extends Controller
{
    public function brands()
    {
        return response()->json(Brand::where('is_active', true)->orderBy('display_order')->get());
    }

    public function products(Request $request)
    {
        $query = Product::with('brand');
        if ($request->has('featured')) {
            $query->where('is_featured', true);
        }
        return response()->json($query->get());
    }

    public function pharmacies()
    {
        $pharmacies = \Illuminate\Support\Facades\Cache::remember('api.pharmacies', 3600, function () {
            $driver = config('database.connections.' . config('database.default') . '.driver');
            
            // Only return validated pharmacies
            $query = Account::where('type', 'pharmacie')
                ->where('status', 'active'); // The schema/form uses 'active' rather than 'valide'
                
            if ($driver === 'sqlite') {
                return $query->select('id', 'name', 'address', 'city', 'lat', 'lng')->get();
            } else {
                // Extract coordinates from PostGIS
                return $query->select('id', 'name', 'address', 'city', \Illuminate\Support\Facades\DB::raw('ST_Y(location::geometry) as lat, ST_X(location::geometry) as lng'))->get();
            }
        });
            
        return response()->json($pharmacies);
    }

    public function blogPosts()
    {
        return response()->json(BlogPost::with('author')->orderBy('published_at', 'desc')->get());
    }

    public function productPharmacies($id)
    {
        $pharmacies = \Illuminate\Support\Facades\Cache::remember('api.product_pharmacies.' . $id, 3600, function () use ($id) {
            return Account::where('type', 'pharmacie')
                ->whereHas('inventories', function ($query) use ($id) {
                    $query->where('product_id', $id)
                          ->where('in_stock', true);
                })
                ->select('id', 'name', 'address', 'city', 'lat', 'lng', 'google_maps_link')
                ->get();
        });

        return response()->json($pharmacies);
    }
}
