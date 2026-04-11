import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ suppliers }) {
    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus supplier ini?')) {
            router.delete(`/suppliers/${id}`);
        }
    };

    return (
        <AuthenticatedLayout header="Data Supplier">
            <Head title="Data Supplier" />

            <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-gray-500">
                    Total {suppliers.total} supplier terdaftar
                </p>
                <Link
                    href="/suppliers/create"
                    className="bg-gray-900 text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-700 transition"
                >
                    + Tambah Supplier
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="text-left px-6 py-3 text-gray-500 font-medium">No</th>
                            <th className="text-left px-6 py-3 text-gray-500 font-medium">Nama Supplier</th>
                            <th className="text-left px-6 py-3 text-gray-500 font-medium">No. Telepon</th>
                            <th className="text-left px-6 py-3 text-gray-500 font-medium">Alamat</th>
                            <th className="text-left px-6 py-3 text-gray-500 font-medium">Jumlah Barang</th>
                            <th className="text-left px-6 py-3 text-gray-500 font-medium">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {suppliers.data.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center py-10 text-gray-400">
                                    Belum ada supplier
                                </td>
                            </tr>
                        ) : (
                            suppliers.data.map((sup, i) => (
                                <tr key={sup.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 text-gray-500">
                                        {(suppliers.current_page - 1) * suppliers.per_page + i + 1}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-800">{sup.name}</td>
                                    <td className="px-6 py-4 text-gray-600">{sup.phone ?? '-'}</td>
                                    <td className="px-6 py-4 text-gray-600">{sup.address ?? '-'}</td>
                                    <td className="px-6 py-4">
                                        <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full font-medium">
                                            {sup.items_count} barang
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <Link
                                                href={`/suppliers/${sup.id}/edit`}
                                                className="text-blue-500 hover:text-blue-700 text-xs font-medium"
                                            >
                                                Edit
                                            </Link>
                                            <span className="text-gray-300">|</span>
                                            <button
                                                onClick={() => handleDelete(sup.id)}
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

                {suppliers.last_page > 1 && (
                    <div className="px-6 py-4 border-t border-gray-100 flex items-center gap-2">
                        {suppliers.links.map((link, i) => (
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