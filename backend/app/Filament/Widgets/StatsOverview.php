<?php

namespace App\Filament\Widgets;

use App\Models\Product;
use App\Models\Brand;
use App\Models\Account;
use App\Models\Order;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Card;

class StatsOverview extends BaseWidget
{
    protected static ?int $sort = 1;

    protected function getCards(): array
    {
        return [
            Card::make('Total Revenue', number_format(Order::where('status', 'completed')->sum('total_amount'), 2) . ' DH')
                ->description('Chiffre d\'affaires total (Commandes terminées)')
                ->descriptionIcon('heroicon-s-currency-dollar')
                ->chart([7, 2, 10, 3, 15, 4, 17])
                ->color('success'),
            Card::make('Total Pharmacies', Account::where('type', 'pharmacie')->count())
                ->description('Comptes de pharmacies partenaires')
                ->descriptionIcon('heroicon-s-user-group')
                ->color('primary'),
            Card::make('Commandes', Order::count())
                ->description('Toutes les commandes reçues')
                ->descriptionIcon('heroicon-s-shopping-bag')
                ->color('warning'),
        ];
    }
}
