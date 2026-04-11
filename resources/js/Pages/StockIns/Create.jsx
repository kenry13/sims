import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ items }) {
    const today = new Date().toISOString().split('T')[0];

    const { data, setData, post, processing, errors } = useForm({
        item_id:  '',
        quantity: 1,
        date:     today,
        note:     '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/stock-ins');
    };

    const selectedItem = items.find(i => i.id == data.item_id);

    return (
        <AuthenticatedLayout header="Catat Barang Masuk">
            <Head title="Catat Barang Masuk" />

            <div className="max-w-xl">
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <form onSubmit={handleSubmit} className="space-y-5">

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Pilih Barang <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={data.item_id}
                                onChange={e => setData('item_id', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                            >
                                <option value="">-- Pilih Barang --</option>
                                {items.map(item => (
                                    <option key={item.id} value={item.id}>
                                        {item.name} (Stok: {item.stock} {item.unit})
                                    </option>
                                ))}
                            </select>
                            {errors.item_id && <p className="text-red-500 text-xs mt-1">{errors.item_id}</p>}
                        </div>

                        {/* Info stok saat ini */}
                        {selectedItem && (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 text-sm text-blue-700">
                                Stok saat ini: <strong>{selectedItem.stock} {selectedItem.unit}</strong>
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Jumlah <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    value={data.quantity}
                                    onChange={e => setData('quantity', e.target.value)}
                                    min="1"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                                />
                                {errors.quantity && <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Tanggal <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    value={data.date}
                                    onChange={e => setData('date', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                                />
                                {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Keterangan
                            </label>
                            <textarea
                                value={data.note}
                                onChange={e => setData('note', e.target.value)}
                                rows={3}
                                placeholder="Opsional..."
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                            />
                        </div>

                        <div className="flex items-center gap-3 pt-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-green-600 text-white text-sm px-5 py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                            >
                                {processing ? 'Menyimpan...' : 'Catat Masuk'}
                            </button>
                            <Link href="/stock-ins" className="text-sm text-gray-500 hover:text-gray-700">
                                Batal
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}