<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Order;
use App\Models\Document;

class B2bController extends Controller
{
    public function catalog(Request $request)
    {
        $account = $request->user()->account;
        
        if (!$account) {
            return response()->json(['message' => 'No B2B account found for user'], 403);
        }

        // Get products with specific pricing for this account
        $products = Product::with(['brand', 'prices' => function($query) use ($account) {
            $query->where('account_id', $account->id);
        }])->get();

        return response()->json($products);
    }

    public function orders(Request $request)
    {
        $account = $request->user()->account;
        
        if (!$account) {
            return response()->json(['message' => 'No B2B account found for user'], 403);
        }

        $orders = Order::where('account_id', $account->id)->with('items.product')->orderBy('created_at', 'desc')->get();
        return response()->json($orders);
    }

    public function storeOrder(Request $request)
    {
        $account = $request->user()->account;
        
        if (!$account) {
            return response()->json(['message' => 'No B2B account found for user'], 403);
        }

        $validated = $request->validate([
            'items' => 'required|array',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.unit_price' => 'required|numeric',
        ]);

        $totalAmount = collect($validated['items'])->sum(function($item) {
            return $item['quantity'] * $item['unit_price'];
        });

        $order = Order::create([
            'account_id' => $account->id,
            'status' => 'commande', // Initial status
            'total_amount' => $totalAmount,
        ]);

        foreach ($validated['items'] as $item) {
            $order->items()->create([
                'product_id' => $item['product_id'],
                'quantity' => $item['quantity'],
                'unit_price' => $item['unit_price'],
                'subtotal' => $item['quantity'] * $item['unit_price'],
            ]);
        }

        return response()->json($order->load('items'), 201);
    }

    public function documents(Request $request)
    {
        $account = $request->user()->account;
        
        if (!$account) {
            return response()->json(['message' => 'No B2B account found for user'], 403);
        }

        // Return documents specifically for this account, plus general product/brand documents
        $documents = Document::where('account_id', $account->id)
            ->orWhereNull('account_id')
            ->get();
            
        return response()->json($documents);
    }
}
