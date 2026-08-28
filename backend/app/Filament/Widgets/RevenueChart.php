<?php

namespace App\Filament\Widgets;

use App\Models\Order;
use Carbon\Carbon;
use Filament\Widgets\LineChartWidget;

class RevenueChart extends LineChartWidget
{
    protected static ?string $heading = 'Évolution du Chiffre d\'Affaires (DH)';
    protected static ?int $sort = 2;

    protected function getFilters(): ?array
    {
        return [
            'today' => 'Aujourd\'hui',
            'week' => 'Les 7 derniers jours',
            'month' => 'Ce mois-ci',
            'year' => 'Cette année',
        ];
    }

    protected function getData(): array
    {
        $activeFilter = $this->filter;

        // Default to 'year' if no filter is selected
        if (! $activeFilter) {
            $activeFilter = 'year';
        }

        $query = Order::where('status', 'completed');
        $labels = [];
        $data = [];

        if ($activeFilter === 'today') {
            // Group by hour
            for ($i = 0; $i < 24; $i++) {
                $start = Carbon::today()->addHours($i);
                $end = Carbon::today()->addHours($i + 1);
                $labels[] = $i . 'h';
                $data[] = (clone $query)->whereBetween('created_at', [$start, $end])->sum('total_amount');
            }
        } elseif ($activeFilter === 'week') {
            // Group by day for last 7 days
            for ($i = 6; $i >= 0; $i--) {
                $date = Carbon::today()->subDays($i);
                $labels[] = $date->format('D');
                $data[] = (clone $query)->whereDate('created_at', $date)->sum('total_amount');
            }
        } elseif ($activeFilter === 'month') {
            // Group by day for current month
            $daysInMonth = Carbon::now()->daysInMonth;
            for ($i = 1; $i <= $daysInMonth; $i++) {
                $date = Carbon::now()->startOfMonth()->addDays($i - 1);
                $labels[] = $i;
                $data[] = (clone $query)->whereDate('created_at', $date)->sum('total_amount');
            }
        } elseif ($activeFilter === 'year') {
            // Group by month
            for ($i = 1; $i <= 12; $i++) {
                $labels[] = Carbon::create()->month($i)->format('M');
                $data[] = (clone $query)->whereYear('created_at', Carbon::now()->year)
                                        ->whereMonth('created_at', $i)
                                        ->sum('total_amount');
            }
        }

        return [
            'datasets' => [
                [
                    'label' => 'Revenus',
                    'data' => $data,
                    'borderColor' => '#10b981', // Emerald 500 (Success color)
                ],
            ],
            'labels' => $labels,
        ];
    }
}
