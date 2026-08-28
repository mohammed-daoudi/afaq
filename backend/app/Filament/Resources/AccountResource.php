<?php

namespace App\Filament\Resources;

use App\Filament\Resources\AccountResource\Pages;
use App\Models\Account;
use Filament\Forms;
use Filament\Resources\Form;
use Filament\Resources\Resource;
use Filament\Resources\Table;
use Filament\Tables;

class AccountResource extends Resource
{
    protected static ?string $model = Account::class;
    protected static ?string $navigationIcon = 'heroicon-o-users';
    protected static ?string $navigationLabel = 'Pharmacies & Comptes';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')
                    ->label('Nom du compte')
                    ->required(),
                    
                Forms\Components\Select::make('type')
                    ->label('Type')
                    ->options([
                        'pharmacie' => 'Pharmacie',
                        'grossiste' => 'Grossiste',
                        'autre' => 'Autre',
                    ])
                    ->required(),
                    
                Forms\Components\Select::make('status')
                    ->label('Statut')
                    ->options([
                        'active' => 'Actif',
                        'inactive' => 'Inactif',
                    ])
                    ->required(),
                    
                Forms\Components\TextInput::make('address')
                    ->label('Adresse'),
                    
                Forms\Components\TextInput::make('city')
                    ->label('Ville'),
                    
                Forms\Components\TextInput::make('google_maps_link')
                    ->label('Lien Google Maps')
                    ->helperText('Collez le lien Google Maps de la pharmacie ici. Le système extraira automatiquement les coordonnées (Latitude/Longitude) si possible.')
                    ->url()
                    ->reactive()
                    ->afterStateUpdated(function ($state, callable $set) {
                        if ($state && preg_match('/@(-?\d+\.\d+),(-?\d+\.\d+)/', $state, $matches)) {
                            $set('lat', $matches[1]);
                            $set('lng', $matches[2]);
                        }
                    }),
                    
                Forms\Components\TextInput::make('lat')
                    ->label('Latitude')
                    ->numeric(),
                    
                Forms\Components\TextInput::make('lng')
                    ->label('Longitude')
                    ->numeric(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')->label('Nom')->searchable(),
                Tables\Columns\TextColumn::make('type')->label('Type'),
                Tables\Columns\TextColumn::make('city')->label('Ville')->searchable(),
                Tables\Columns\TextColumn::make('status')->label('Statut'),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('type')
                    ->options([
                        'pharmacie' => 'Pharmacie',
                        'grossiste' => 'Grossiste',
                    ]),
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
            'index' => Pages\ListAccounts::route('/'),
            'create' => Pages\CreateAccount::route('/create'),
            'edit' => Pages\EditAccount::route('/{record}/edit'),
        ];
    }    
}
