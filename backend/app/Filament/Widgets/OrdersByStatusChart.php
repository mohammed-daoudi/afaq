<?php

namespace App\Filament\Widgets;

use App\Models\Order;
use Filament\Widgets\DoughnutChartWidget;

class OrdersByStatusChart extends DoughnutChartWidget
{
    protected static ?string $heading = 'Répartition des Commandes (Statuts)';
    protected static ?int $sort = 4;

    protected function getData(): array
    {
        $statuses = ['pending' => 0, 'processing' => 0, 'completed' => 0, 'cancelled' => 0];
        
        $counts = Order::selectRaw('status, count(*) as count')
            ->groupBy('status')
            ->pluck('count', 'status')
            ->toArray();

        foreach ($counts as $status => $count) {
            $statuses[$status] = $count;
        }

        return [
            'datasets' => [
                [
                    'label' => 'Commandes',
                    'data' => array_values($statuses),
                    'backgroundColor' => [
                        '#fbbf24', // Amber (Pending)
                        '#3b82f6', // Blue (Processing)
                        '#10b981', // Emerald (Completed)
                        '#ef4444', // Red (Cancelled)
                    ],
                ],
            ],
            'labels' => ['En attente', 'En cours', 'Terminée', 'Annulée'],
        ];
    }
}
