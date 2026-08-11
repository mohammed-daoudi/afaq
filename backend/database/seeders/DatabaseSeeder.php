<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Account;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // 1. Create Admin User
        \App\Models\User::create([
            'name' => 'Admin Afaq',
            'email' => 'admin@afaq.ma',
            'password' => \Illuminate\Support\Facades\Hash::make('password'),
        ]);

        $pharmacies = [
            ['name' => 'Pharmacie Centrale', 'address' => '15 Avenue Mohammed V', 'city' => 'Rabat', 'lat' => 34.020882, 'lng' => -6.841650],
            ['name' => 'Pharmacie Al Amal', 'address' => 'Quartier Agdal', 'city' => 'Rabat', 'lat' => 34.004413, 'lng' => -6.847582],
            ['name' => 'Pharmacie des Nations Unies', 'address' => 'Place des Nations Unies', 'city' => 'Casablanca', 'lat' => 33.592817, 'lng' => -7.619183],
            ['name' => 'Pharmacie Maârif', 'address' => 'Quartier Maârif', 'city' => 'Casablanca', 'lat' => 33.579471, 'lng' => -7.632948],
            ['name' => 'Pharmacie Kénitra Médina', 'address' => 'Centre Ville', 'city' => 'Kénitra', 'lat' => 34.261013, 'lng' => -6.580196],
        ];
        
        $driver = config('database.connections.' . config('database.default') . '.driver');

        foreach ($pharmacies as $index => $pharmacyData) {
            $user = User::create([
                'name' => 'Dr. ' . $pharmacyData['name'],
                // Add contact@pharmacie.ma specifically so the user can login with that email
                'email' => $index === 0 ? 'contact@pharmacie.ma' : 'contact' . $index . '@' . strtolower(str_replace(' ', '', $pharmacyData['city'])) . '.ma',
                'password' => \Illuminate\Support\Facades\Hash::make('password'),
            ]);

            $accountData = [
                'user_id' => $user->id,
                'type' => 'pharmacie',
                'status' => 'valide',
                'name' => $pharmacyData['name'],
                'address' => $pharmacyData['address'],
                'city' => $pharmacyData['city'],
                'tariff_group' => 'standard',
            ];
            
            if ($driver === 'sqlite') {
                $accountData['lat'] = $pharmacyData['lat'];
                $accountData['lng'] = $pharmacyData['lng'];
            } else {
                $accountData['location'] = \Illuminate\Support\Facades\DB::raw("ST_PointFromText('POINT({$pharmacyData['lng']} {$pharmacyData['lat']})')");
            }
            
            $account = Account::create($accountData);
        }
        
        // Ensure contact@pharmacie.ma exists for testing login if missing
        if (!User::where('email', 'contact@pharmacie.ma')->exists()) {
             $user = User::create([
                'name' => 'Pharmacie Test',
                'email' => 'contact@pharmacie.ma',
                'password' => \Illuminate\Support\Facades\Hash::make('password'),
            ]);
            Account::create([
                'user_id' => $user->id,
                'type' => 'pharmacie',
                'status' => 'valide',
                'name' => 'Pharmacie Test',
                'address' => '15 Avenue Mohammed V',
                'city' => 'Rabat',
            ]);
        }
    }
}
