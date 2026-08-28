<?php

namespace App\Filament\Widgets;

use App\Models\Account;
use Filament\Tables;
use Filament\Widgets\TableWidget as BaseWidget;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;

class TopPharmaciesWidget extends BaseWidget
{
    protected static ?int $sort = 7;
    protected int | string | array $columnSpan = 'full';

    protected function getTableQuery(): Builder
    {
        return Account::query()
            ->where('type', 'pharmacie')
            ->select('accounts.*', DB::raw('SUM(orders.total_amount) as total_spent'), DB::raw('COUNT(orders.id) as total_orders'))
            ->join('orders', 'accounts.id', '=', 'orders.account_id')
            ->where('orders.status', 'completed')
            ->groupBy('accounts.id')
            ->orderByDesc('total_spent')
            ->limit(5);
    }

    protected function getTableColumns(): array
    {
        return [
            Tables\Columns\TextColumn::make('name')->label('Pharmacie'),
            Tables\Columns\TextColumn::make('total_orders')->label('Commandes Complétées'),
            Tables\Columns\TextColumn::make('total_spent')
                ->label('Total Dépensé (DH)')
                ->money('MAD', true), // Format as MAD
        ];
    }
    
    protected function isTablePaginationEnabled(): bool 
    {
        return false;
    }
    
    protected function getTableHeading(): string|null
    {
        return 'Pharmacies VIP (Top 5 Clients)';
    }
}
