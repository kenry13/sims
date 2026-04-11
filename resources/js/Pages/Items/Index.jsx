import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ items }) {
    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus barang ini?')) {
            router.delete(`/items/${id}`);
        }
    };

    return (
        <AuthenticatedLayout header="Data Barang">
            <Head title="Data Barang" />

            {/* Header + Tombol Tambah */}
            <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-gray-500">
                    Total {items.total} barang terdaftar
                </p>
                <Link
                    href="/items/create"
                    className="bg-gray-900 text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-700 transition"
                >
                    + Tambah Barang
                </Link>
            </div>

            {/* Tabel */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="text-left px-6 py-3 text-gray-500 font-medium">Kode</th>
                            <th className="text-left px-6 py-3 text-gray-500 font-medium">Nama Barang</th>
                            <th className="text-left px-6 py-3 text-gray-500 font-medium">Kategori</th>
                            <th className="text-left px-6 py-3 text-gray-500 font-medium">Supplier</th>
                            <th className="text-left px-6 py-3 text-gray-500 font-medium">Stok</th>
                            <th className="text-left px-6 py-3 text-gray-500 font-medium">Satuan</th>
                            <th className="text-left px-6 py-3 text-gray-500 font-medium">Status</th>
                            <th className="text-left px-6 py-3 text-gray-500 font-medium">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {items.data.length === 0 ? (
                            <tr>
                                <td colSpan="8" className="text-center py-10 text-gray-400">
                                    Belum ada data barang
                                </td>
                            </tr>
                        ) : (
                            items.data.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 font-mono text-gray-600">{item.code}</td>
                                    <td className="px-6 py-4 font-medium text-gray-800">{item.name}</td>
                                    <td className="px-6 py-4 text-gray-600">{item.category?.name ?? '-'}</td>
                                    <td className="px-6 py-4 text-gray-600">{item.supplier?.name ?? '-'}</td>
                                    <td className="px-6 py-4 font-semibold text-gray-800">{item.stock}</td>
                                    <td className="px-6 py-4 text-gray-600">{item.unit}</td>
                                    <td className="px-6 py-4">
                                        {item.stock <= item.min_stock ? (
                                            <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full font-medium">
                                                ⚠ Menipis
                                            </span>
                                        ) : (
                                            <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full font-medium">
                                                ✓ Aman
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <Link
                                                href={`/items/${item.id}/edit`}
                                                className="text-blue-500 hover:text-blue-700 text-xs font-medium"
                                            >
                                                Edit
                                            </Link>
                                            <span className="text-gray-300">|</span>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="text-red-500 hover:text-red-700 text-xs font-medium"
                                            >
                                                Hapus
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

                {/* Pagination */}
                {items.last_page > 1 && (
                    <div className="px-6 py-4 border-t border-gray-100 flex items-center gap-2">
                        {items.links.map((link, i) => (
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