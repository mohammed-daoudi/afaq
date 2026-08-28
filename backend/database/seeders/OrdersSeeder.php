<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Account;
use App\Models\Product;
use Carbon\Carbon;

class OrdersSeeder extends Seeder
{
    public function run()
    {
        // First wipe the old fake orders to avoid duplicates
        Order::truncate();
        OrderItem::truncate();
        
        // Wipe fake pharmacies (we'll recreate them)
        $fakeUsers = \App\Models\User::where('email', 'like', 'fake_pharmacie%')->get();
        foreach ($fakeUsers as $u) {
            Account::where('user_id', $u->id)->delete();
            $u->delete();
        }

        // Create 10 fake pharmacies
        $pharmacies = [];
        for ($i = 1; $i <= 10; $i++) {
            $date = Carbon::now()->subDays(rand(0, 180));
            
            $user = \App\Models\User::create([
                'name' => 'Propriétaire ' . $i,
                'email' => 'fake_pharmacie' . $i . '@test.com',
                'password' => bcrypt('password'),
                'created_at' => $date,
                'updated_at' => $date,
            ]);

            $pharmacies[] = Account::create([
                'user_id' => $user->id,
                'name' => 'Pharmacie Partenaire ' . $i,
                'type' => 'pharmacie',
                'status' => 'active',
                'created_at' => $date,
                'updated_at' => $date,
            ]);
        }

        $products = Product::all();
        if ($products->count() === 0) {
            $this->command->warn("No products found! Run ProductsImportSeeder first.");
            return;
        }

        $statuses = ['pending', 'processing', 'completed', 'cancelled'];
        
        // 60% chance of completed, 20% pending, 10% processing, 10% cancelled
        $statusDistribution = array_merge(
            array_fill(0, 60, 'completed'),
            array_fill(0, 20, 'pending'),
            array_fill(0, 10, 'processing'),
            array_fill(0, 10, 'cancelled')
        );

        // Generate 150 fake orders for the last 6 months
        for ($i = 0; $i < 150; $i++) {
            $date = Carbon::now()->subDays(rand(0, 180));
            $pharmacy = $pharmacies[array_rand($pharmacies)];
            $status = $statusDistribution[array_rand($statusDistribution)];
            
            $order = Order::create([
                'account_id' => $pharmacy->id,
                'status' => $status,
                'total_amount' => 0, // Will be calculated
                'created_at' => $date,
                'updated_at' => $date,
            ]);

            // Add 1 to 4 random items
            $itemCount = rand(1, 4);
            $totalAmount = 0;
            
            for ($j = 0; $j < $itemCount; $j++) {
                $product = $products->random();
                $quantity = rand(1, 5);
                $unitPrice = rand(100, 500); // Fake unit price
                $subtotal = $quantity * $unitPrice;
                
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                    'quantity' => $quantity,
                    'unit_price' => $unitPrice,
                    'subtotal' => $subtotal,
                ]);

                $totalAmount += $subtotal;
            }

            $order->update(['total_amount' => $totalAmount]);
        }
    }
}
