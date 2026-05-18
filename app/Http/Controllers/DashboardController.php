<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Item;
use App\Models\StockIn;
use App\Models\StockOut;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $totalItems = Item::count();
        $totalStockIn = StockIn::sum('quantity');
        $totalStockOut = StockOut::sum('quantity');
        $lowStockItems = Item::whereRaw('stock <= min_stock')->count();

        $stockMovement = DB::table('stock_ins')
            ->select(DB::raw('DATE(date) as date, SUM(quantity) as in_quantity, 0 as out_quantity'))
            ->groupBy(DB::raw('DATE(date)'))
            ->union(
                DB::table('stock_outs')
                    ->select(DB::raw('DATE(date) as date, 0 as in_quantity, SUM(quantity) as out_quantity'))
                    ->groupBy(DB::raw('DATE(date)'))
            )
            ->orderBy('date', 'desc')
            ->limit(7)
            ->get()
            ->groupBy('date')
            ->map(function ($items) {
                return [
                    'date' => $items[0]->date,
                    'in' => $items->sum('in_quantity'),
                    'out' => $items->sum('out_quantity'),
                ];
            })
            ->values()
            ->reverse()
            ->values();

        $recentActivity = collect();
        $stockIns = StockIn::with('item', 'user')->latest()->take(5)->get()->map(function ($item) {
            return [
                'type' => 'in',
                'item' => $item->item->name,
                'quantity' => $item->quantity,
                'date' => $item->date,
                'user' => $item->user->name,
            ];
        });
        $stockOuts = StockOut::with('item', 'user')->latest()->take(5)->get()->map(function ($item) {
            return [
                'type' => 'out',
                'item' => $item->item->name,
                'quantity' => $item->quantity,
                'date' => $item->date,
                'user' => $item->user->name,
            ];
        });
        $recentActivity = $stockIns->merge($stockOuts)->sortByDesc('date')->take(5)->values();

        return Inertia::render('Dashboard', [
            'auth' => [
                'user' => $request->user(),
            ],
            'stats' => [
                'totalItems' => $totalItems,
                'totalStockIn' => $totalStockIn,
                'totalStockOut' => $totalStockOut,
                'lowStockItems' => $lowStockItems,
            ],
            'stockMovement' => $stockMovement,
            'recentActivity' => $recentActivity,
        ]);
    }
}