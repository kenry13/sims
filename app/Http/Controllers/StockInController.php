<?php

namespace App\Http\Controllers;

use App\Models\StockIn;
use App\Models\Item;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StockInController extends Controller
{
    public function index()
    {
        $stockIns = StockIn::with(['item', 'user'])
                           ->latest()
                           ->paginate(10);

        return Inertia::render('StockIns/Index', [
            'stockIns' => $stockIns,
        ]);
    }

    public function create()
    {
        return Inertia::render('StockIns/Create', [
            'items' => Item::orderBy('name')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'item_id'  => 'required|exists:items,id',
            'quantity' => 'required|integer|min:1',
            'date'     => 'required|date',
            'note'     => 'nullable|string',
        ]);

        // Simpan transaksi
        StockIn::create([
            'item_id'  => $request->item_id,
            'user_id'  => auth()->id(),
            'quantity' => $request->quantity,
            'date'     => $request->date,
            'note'     => $request->note,
        ]);

        // Update stok barang otomatis
        $item = Item::find($request->item_id);
        $item->stock += $request->quantity;
        $item->save();

        return redirect()->route('stock-ins.index')
            ->with('success', 'Barang masuk berhasil dicatat!');
    }

    public function destroy(StockIn $stockIn)
    {
        // Kembalikan stok saat transaksi dihapus
        $item = Item::find($stockIn->item_id);
        $item->stock -= $stockIn->quantity;
        $item->save();

        $stockIn->delete();

        return redirect()->route('stock-ins.index')
            ->with('success', 'Transaksi berhasil dihapus!');
    }
}