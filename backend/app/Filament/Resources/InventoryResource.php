<?php

namespace App\Filament\Resources;

use App\Filament\Resources\InventoryResource\Pages;
use App\Models\Inventory;
use Filament\Forms;
use Filament\Resources\Form;
use Filament\Resources\Resource;
use Filament\Resources\Table;
use Filament\Tables;

class InventoryResource extends Resource
{
    protected static ?string $model = Inventory::class;

    protected static ?string $navigationIcon = 'heroicon-o-clipboard-check';
    protected static ?string $navigationLabel = 'Mon Stock (Pharmacie)';
    protected static ?string $modelLabel = 'Stock Produit';
    protected static ?string $pluralModelLabel = 'Inventaire';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('account_id')
                    ->relationship('account', 'name')
                    ->label('Pharmacie')
                    ->required()
                    ->searchable(),
                    
                Forms\Components\Select::make('product_id')
                    ->relationship('product', 'label')
                    ->label('Produit')
                    ->required()
                    ->searchable(),
                    
                Forms\Components\Toggle::make('in_stock')
                    ->label('En stock ?')
                    ->default(false),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('account.name')->label('Pharmacie')->searchable(),
                Tables\Columns\TextColumn::make('product.label')->label('Produit')->searchable(),
                Tables\Columns\IconColumn::make('in_stock')
                    ->label('En stock')
                    ->boolean(),
            ])
            ->filters([
                Tables\Filters\TernaryFilter::make('in_stock')->label('Disponibilité'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make(),
            ]);
    }
    
    public static function getRelations(): array
    {
        return [
            //
        ];
    }
    
    public static function getPages(): array
    {
        return [
            'index' => Pages\ListInventories::route('/'),
            'create' => Pages\CreateInventory::route('/create'),
            'edit' => Pages\EditInventory::route('/{record}/edit'),
        ];
    }    
}
