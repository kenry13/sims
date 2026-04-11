<?php

namespace App\Http\Controllers;

use App\Models\StockOut;
use App\Models\Item;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StockOutController extends Controller
{
    public function index()
    {
        $stockOuts = StockOut::with(['item', 'user'])
                             ->latest()
                             ->paginate(10);

        return Inertia::render('StockOuts/Index', [
            'stockOuts' => $stockOuts,
        ]);
    }

    public function create()
    {
        return Inertia::render('StockOuts/Create', [
            'items' => Item::where('stock', '>', 0)->orderBy('name')->get(),
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

        $item = Item::find($request->item_id);

        // Cek stok cukup
        if ($item->stock < $request->quantity) {
            return back()->withErrors([
                'quantity' => "Stok tidak cukup! Stok tersedia: {$item->stock} {$item->unit}",
            ]);
        }

        // Simpan transaksi
        StockOut::create([
            'item_id'  => $request->item_id,
            'user_id'  => auth()->id(),
            'quantity' => $request->quantity,
            'date'     => $request->date,
            'note'     => $request->note,
        ]);

        // Kurangi stok otomatis
        $item->stock -= $request->quantity;
        $item->save();

        return redirect()->route('stock-outs.index')
            ->with('success', 'Barang keluar berhasil dicatat!');
    }

    public function destroy(StockOut $stockOut)
    {
        // Kembalikan stok saat transaksi dihapus
        $item = Item::find($stockOut->item_id);
        $item->stock += $stockOut->quantity;
        $item->save();

        $stockOut->delete();

        return redirect()->route('stock-outs.index')
            ->with('success', 'Transaksi berhasil dihapus!');
    }
}