import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ stockOuts }) {
    const handleDelete = (id) => {
        if (confirm('Hapus transaksi ini? Stok akan dikembalikan.')) {
            router.delete(`/stock-outs/${id}`);
        }
    };

    return (
        <AuthenticatedLayout header="Barang Keluar">
            <Head title="Barang Keluar" />

            <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-gray-500">
                    Total {stockOuts.total} transaksi keluar
                </p>
                <Link
                    href="/stock-outs/create"
                    className="bg-gray-900 text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-700 transition"
                >
                    + Catat Barang Keluar
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="text-left px-6 py-3 text-gray-500 font-medium">Tanggal</th>
                            <th className="text-left px-6 py-3 text-gray-500 font-medium">Nama Barang</th>
                            <th className="text-left px-6 py-3 text-gray-500 font-medium">Jumlah</th>
                            <th className="text-left px-6 py-3 text-gray-500 font-medium">Dicatat Oleh</th>
                            <th className="text-left px-6 py-3 text-gray-500 font-medium">Keterangan</th>
                            <th className="text-left px-6 py-3 text-gray-500 font-medium">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {stockOuts.data.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center py-10 text-gray-400">
                                    Belum ada transaksi barang keluar
                                </td>
                            </tr>
                        ) : (
                            stockOuts.data.map((s) => (
                                <tr key={s.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 text-gray-600">{s.date}</td>
                                    <td className="px-6 py-4 font-medium text-gray-800">
                                        {s.item?.name ?? '-'}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-medium">
                                            -{s.quantity} {s.item?.unit}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">{s.user?.name ?? '-'}</td>
                                    <td className="px-6 py-4 text-gray-500">{s.note ?? '-'}</td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleDelete(s.id)}
                                            className="text-red-500 hover:text-red-700 text-xs font-medium"
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

                {stockOuts.last_page > 1 && (
                    <div className="px-6 py-4 border-t border-gray-100 flex items-center gap-2">
                        {stockOuts.links.map((link, i) => (
                            <Link
                                key={i}
                                href={link.url ?? '#'}
                                className={`px-3 py-1 rounded text-sm ${
                                    link.active
                                        ? 'bg-gray-900 text-white'
                                        : 'text-gray-500 hover:bg-gray-100'
                                } ${!link.url ? 'opacity-40 pointer-events-none' : ''}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}