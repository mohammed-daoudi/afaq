<?php

namespace App\Filament\Widgets;

use App\Models\Product;
use Filament\Tables;
use Filament\Widgets\TableWidget as BaseWidget;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;

class TopProductsWidget extends BaseWidget
{
    protected static ?int $sort = 6;
    protected int | string | array $columnSpan = 'full';

    protected function getTableQuery(): Builder
    {
        return Product::query()
            ->select('products.*', DB::raw('SUM(order_items.quantity) as total_sold'))
            ->join('order_items', 'products.id', '=', 'order_items.product_id')
            ->groupBy('products.id')
            ->orderByDesc('total_sold')
            ->limit(5);
    }

    protected function getTableColumns(): array
    {
        return [
            Tables\Columns\ImageColumn::make('photo')->label('Photo'),
            Tables\Columns\TextColumn::make('label')->label('Produit'),
            Tables\Columns\TextColumn::make('category')->label('Catégorie'),
            Tables\Columns\TextColumn::make('total_sold')
                ->label('Unités Vendues')
                ->sortable(),
        ];
    }
    
    protected function isTablePaginationEnabled(): bool 
    {
        return false;
    }
    
    protected function getTableHeading(): string|null
    {
        return 'Produits les plus vendus (Top 5)';
    }
}
