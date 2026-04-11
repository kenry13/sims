import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ item, categories, suppliers }) {
    const { data, setData, put, processing, errors } = useForm({
        code:        item.code,
        name:        item.name,
        category_id: item.category_id,
        supplier_id: item.supplier_id,
        stock:       item.stock,
        min_stock:   item.min_stock,
        unit:        item.unit,
        description: item.description ?? '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/items/${item.id}`);
    };

    return (
        <AuthenticatedLayout header="Edit Barang">
            <Head title="Edit Barang" />

            <div className="max-w-2xl">
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <form onSubmit={handleSubmit} className="space-y-5">

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Kode Barang</label>
                                <input
                                    type="text"
                                    value={data.code}
                                    onChange={e => setData('code', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                                />
                                {errors.code && <p className="text-red-500 text-xs mt-1">{errors.code}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Barang</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                                <select
                                    value={data.category_id}
                                    onChange={e => setData('category_id', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                                >
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                                {errors.category_id && <p className="text-red-500 text-xs mt-1">{errors.category_id}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
                                <select
                                    value={data.supplier_id}
                                    onChange={e => setData('supplier_id', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                                >
                                    {suppliers.map(sup => (
                                        <option key={sup.id} value={sup.id}>{sup.name}</option>
                                    ))}
                                </select>
                                {errors.supplier_id && <p className="text-red-500 text-xs mt-1">{errors.supplier_id}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Stok</label>
                                <input
                                    type="number"
                                    value={data.stock}
                                    onChange={e => setData('stock', e.target.value)}
                                    min="0"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Stok Minimum</label>
                                <input
                                    type="number"
                                    value={data.min_stock}
                                    onChange={e => setData('min_stock', e.target.value)}
                                    min="0"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Satuan</label>
                                <input
                                    type="text"
                                    value={data.unit}
                                    onChange={e => setData('unit', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                            <textarea
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                rows={3}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                            />
                        </div>

                        <div className="flex items-center gap-3 pt-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-gray-900 text-white text-sm px-5 py-2 rounded-lg hover:bg-gray-700 transition disabled:opacity-50"
                            >
                                {processing ? 'Menyimpan...' : 'Update Barang'}
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