<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\Category;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ItemController extends Controller
{
    public function index()
    {
        $items = Item::with(['category', 'supplier'])
                     ->latest()
                     ->paginate(10);

        return Inertia::render('Items/Index', [
            'items' => $items,
        ]);
    }

    public function create()
    {
        return Inertia::render('Items/Create', [
            'categories' => Category::all(),
            'suppliers'  => Supplier::all(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'code'        => 'required|string|unique:items,code',
            'name'        => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'supplier_id' => 'required|exists:suppliers,id',
            'stock'       => 'required|integer|min:0',
            'min_stock'   => 'required|integer|min:0',
            'unit'        => 'required|string|max:50',
            'description' => 'nullable|string',
        ]);

        Item::create($request->all());

        return redirect()->route('items.index')
            ->with('success', 'Barang berhasil ditambahkan!');
    }

    public function edit(Item $item)
    {
        return Inertia::render('Items/Edit', [
            'item'       => $item,
            'categories' => Category::all(),
            'suppliers'  => Supplier::all(),
        ]);
    }

    public function update(Request $request, Item $item)
    {
        $request->validate([
            'code'        => 'required|string|unique:items,code,' . $item->id,
            'name'        => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'supplier_id' => 'required|exists:suppliers,id',
            'stock'       => 'required|integer|min:0',
            'min_stock'   => 'required|integer|min:0',
            'unit'        => 'required|string|max:50',
            'description' => 'nullable|string',
        ]);

        $item->update($request->all());

        return redirect()->route('items.index')
            ->with('success', 'Barang berhasil diupdate!');
    }

    public function destroy(Item $item)
    {
        $item->delete();

        return redirect()->route('items.index')
            ->with('success', 'Barang berhasil dihapus!');
    }
}