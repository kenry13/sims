<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Item;
use App\Models\StockIn;
use App\Models\StockOut;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    public function index(Request $request)
    {
        $startDate = $request->start_date ?? now()->subDays(30)->format('Y-m-d');
        $endDate = $request->end_date ?? now()->format('Y-m-d');

        $stockIns = StockIn::with('item', 'user')
            ->whereBetween('date', [$startDate, $endDate])
            ->latest()
            ->get();

        $stockOuts = StockOut::with('item', 'user')
            ->whereBetween('date', [$startDate, $endDate])
            ->latest()
            ->get();

        $itemStats = Item::with('category')
            ->get()
            ->map(function ($item) {
                $totalIn = StockIn::where('item_id', $item->id)->sum('quantity');
                $totalOut = StockOut::where('item_id', $item->id)->sum('quantity');
                return [
                    'id' => $item->id,
                    'code' => $item->code,
                    'name' => $item->name,
                    'category' => $item->category->name ?? '-',
                    'stock' => $item->stock,
                    'min_stock' => $item->min_stock,
                    'total_in' => $totalIn,
                    'total_out' => $totalOut,
                    'is_low_stock' => $item->isLowStock(),
                ];
            });

        $summary = [
            'total_in' => $stockIns->sum('quantity'),
            'total_out' => $stockOuts->sum('quantity'),
            'total_items' => $itemStats->count(),
            'low_stock_items' => $itemStats->where('is_low_stock', true)->count(),
        ];

        return Inertia::render('Reports/Index', [
            'auth' => [
                'user' => $request->user(),
            ],
            'filters' => [
                'start_date' => $startDate,
                'end_date' => $endDate,
            ],
            'summary' => $summary,
            'stockIns' => $stockIns,
            'stockOuts' => $stockOuts,
            'itemStats' => $itemStats,
        ]);
    }
}
