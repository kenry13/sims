import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ categories, suppliers }) {
    const { data, setData, post, processing, errors } = useForm({
        code:        '',
        name:        '',
        category_id: '',
        supplier_id: '',
        stock:       0,
        min_stock:   5,
        unit:        '',
        description: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/items');
    };

    return (
        <AuthenticatedLayout header="Tambah Barang">
            <Head title="Tambah Barang" />

            <div className="max-w-2xl">
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Kode & Nama */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Kode Barang <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.code}
                                    onChange={e => setData('code', e.target.value)}
                                    placeholder="ELK-001"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                                />
                                {errors.code && <p className="text-red-500 text-xs mt-1">{errors.code}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Nama Barang <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    placeholder="Laptop Lenovo"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>
                        </div>

                        {/* Kategori & Supplier */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Kategori <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={data.category_id}
                                    onChange={e => setData('category_id', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                                >
                                    <option value="">-- Pilih Kategori --</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                                {errors.category_id && <p className="text-red-500 text-xs mt-1">{errors.category_id}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Supplier <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={data.supplier_id}
                                    onChange={e => setData('supplier_id', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                                >
                                    <option value="">-- Pilih Supplier --</option>
                                    {suppliers.map(sup => (
                                        <option key={sup.id} value={sup.id}>{sup.name}</option>
                                    ))}
                                </select>
                                {errors.supplier_id && <p className="text-red-500 text-xs mt-1">{errors.supplier_id}</p>}
                            </div>
                        </div>

                        {/* Stok, Min Stok, Satuan */}
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Stok Awal <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    value={data.stock}
                                    onChange={e => setData('stock', e.target.value)}
                                    min="0"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                                />
                                {errors.stock && <p className="text-red-500 text-xs mt-1">{errors.stock}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Stok Minimum <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    value={data.min_stock}
                                    onChange={e => setData('min_stock', e.target.value)}
                                    min="0"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                                />
                                {errors.min_stock && <p className="text-red-500 text-xs mt-1">{errors.min_stock}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Satuan <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.unit}
                                    onChange={e => setData('unit', e.target.value)}
                                    placeholder="unit / rim / pcs"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                                />
                                {errors.unit && <p className="text-red-500 text-xs mt-1">{errors.unit}</p>}
                            </div>
                        </div>

                        {/* Deskripsi */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Deskripsi
                            </label>
                            <textarea
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                rows={3}
                                placeholder="Opsional..."
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                            />
                        </div>

                        {/* Tombol */}
                        <div className="flex items-center gap-3 pt-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-gray-900 text-white text-sm px-5 py-2 rounded-lg hover:bg-gray-700 transition disabled:opacity-50"
                            >
                                {processing ? 'Menyimpan...' : 'Simpan Barang'}
                            </button>
                            <Link
                                href="/items"
                                className="text-sm text-gray-500 hover:text-gray-700"
                            >
                                Batal
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}