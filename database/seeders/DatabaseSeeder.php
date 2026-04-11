<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Category;
use App\Models\Supplier;
use App\Models\Item;
use App\Models\StockIn;
use App\Models\StockOut;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Users
        User::create([
            'name'     => 'Admin SIMS',
            'email'    => 'admin@sims.com',
            'password' => Hash::make('password'),
            'role'     => 'admin',
        ]);

        User::create([
            'name'     => 'Staff Gudang',
            'email'    => 'user@sims.com',
            'password' => Hash::make('password'),
            'role'     => 'user',
        ]);

        // Categories
        $cat1 = Category::create(['name' => 'Elektronik',   'description' => 'Perangkat elektronik']);
        $cat2 = Category::create(['name' => 'Alat Tulis',   'description' => 'Perlengkapan kantor']);
        $cat3 = Category::create(['name' => 'Furnitur',     'description' => 'Perabot kantor']);

        // Suppliers
        $sup1 = Supplier::create(['name' => 'PT Maju Jaya',    'phone' => '08111000001', 'address' => 'Bandung']);
        $sup2 = Supplier::create(['name' => 'CV Sumber Makmur','phone' => '08111000002', 'address' => 'Jakarta']);

        // Items
        $item1 = Item::create([
            'code'        => 'ELK-001',
            'name'        => 'Laptop Lenovo',
            'category_id' => $cat1->id,
            'supplier_id' => $sup1->id,
            'stock'       => 10,
            'min_stock'   => 3,
            'unit'        => 'unit',
        ]);

        $item2 = Item::create([
            'code'        => 'ELK-002',
            'name'        => 'Mouse Wireless',
            'category_id' => $cat1->id,
            'supplier_id' => $sup1->id,
            'stock'       => 4,
            'min_stock'   => 5,
            'unit'        => 'unit',
        ]);

        $item3 = Item::create([
            'code'        => 'ATK-001',
            'name'        => 'Kertas A4 (Rim)',
            'category_id' => $cat2->id,
            'supplier_id' => $sup2->id,
            'stock'       => 20,
            'min_stock'   => 10,
            'unit'        => 'rim',
        ]);

        $item4 = Item::create([
            'code'        => 'FRN-001',
            'name'        => 'Kursi Kantor',
            'category_id' => $cat3->id,
            'supplier_id' => $sup2->id,
            'stock'       => 2,
            'min_stock'   => 3,
            'unit'        => 'unit',
        ]);

        // Stock In dummy
        StockIn::create(['item_id' => $item1->id, 'user_id' => 1, 'quantity' => 10, 'date' => '2025-04-01', 'note' => 'Pembelian awal']);
        StockIn::create(['item_id' => $item2->id, 'user_id' => 1, 'quantity' => 4,  'date' => '2025-04-02', 'note' => 'Restock']);
        StockIn::create(['item_id' => $item3->id, 'user_id' => 2, 'quantity' => 20, 'date' => '2025-04-03', 'note' => 'Pembelian bulanan']);
        StockIn::create(['item_id' => $item4->id, 'user_id' => 2, 'quantity' => 2,  'date' => '2025-04-04', 'note' => 'Pengadaan baru']);

        // Stock Out dummy
        StockOut::create(['item_id' => $item1->id, 'user_id' => 2, 'quantity' => 2, 'date' => '2025-04-05', 'note' => 'Dipinjam divisi IT']);
        StockOut::create(['item_id' => $item3->id, 'user_id' => 2, 'quantity' => 5, 'date' => '2025-04-06', 'note' => 'Kebutuhan rapat']);
    }
}