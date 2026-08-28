<?php

namespace App\Filament\Widgets;

use App\Models\Order;
use Carbon\Carbon;
use Filament\Widgets\BarChartWidget;

class OrdersChart extends BarChartWidget
{
    protected static ?string $heading = 'Volume des Commandes';
    protected static ?int $sort = 3;

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

        if (! $activeFilter) {
            $activeFilter = 'year';
        }

        $query = Order::query();
        $labels = [];
        $data = [];

        if ($activeFilter === 'today') {
            for ($i = 0; $i < 24; $i++) {
                $start = Carbon::today()->addHours($i);
                $end = Carbon::today()->addHours($i + 1);
                $labels[] = $i . 'h';
                $data[] = (clone $query)->whereBetween('created_at', [$start, $end])->count();
            }
        } elseif ($activeFilter === 'week') {
            for ($i = 6; $i >= 0; $i--) {
                $date = Carbon::today()->subDays($i);
                $labels[] = $date->format('D');
                $data[] = (clone $query)->whereDate('created_at', $date)->count();
            }
        } elseif ($activeFilter === 'month') {
            $daysInMonth = Carbon::now()->daysInMonth;
            for ($i = 1; $i <= $daysInMonth; $i++) {
                $date = Carbon::now()->startOfMonth()->addDays($i - 1);
                $labels[] = $i;
                $data[] = (clone $query)->whereDate('created_at', $date)->count();
            }
        } elseif ($activeFilter === 'year') {
            for ($i = 1; $i <= 12; $i++) {
                $labels[] = Carbon::create()->month($i)->format('M');
                $data[] = (clone $query)->whereYear('created_at', Carbon::now()->year)
                                        ->whereMonth('created_at', $i)
                                        ->count();
            }
        }

        return [
            'datasets' => [
                [
                    'label' => 'Commandes',
                    'data' => $data,
                    'backgroundColor' => '#f59e0b', // Amber 500 (Warning color)
                ],
            ],
            'labels' => $labels,
        ];
    }
}
