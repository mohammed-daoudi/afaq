<?php

namespace App\Filament\Widgets;

use App\Models\Account;
use Carbon\Carbon;
use Filament\Widgets\LineChartWidget;

class PharmacyGrowthChart extends LineChartWidget
{
    protected static ?string $heading = 'Nouvelles Pharmacies (Croissance)';
    protected static ?int $sort = 5;

    protected function getData(): array
    {
        $query = Account::where('type', 'pharmacie');
        $labels = [];
        $data = [];

        // Group by month for this year
        for ($i = 1; $i <= 12; $i++) {
            $labels[] = Carbon::create()->month($i)->format('M');
            $data[] = (clone $query)->whereYear('created_at', Carbon::now()->year)
                                    ->whereMonth('created_at', $i)
                                    ->count();
        }

        return [
            'datasets' => [
                [
                    'label' => 'Inscriptions',
                    'data' => $data,
                    'borderColor' => '#3b82f6', // Blue 500
                ],
            ],
            'labels' => $labels,
        ];
    }
}
