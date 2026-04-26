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

            <div
                style={{
                    flex: 1,
                    position: 'relative',
                    backgroundImage: "url('/Images/worker.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'local',
                }}
            >
                {/* Overlay putih tebal */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: 'rgba(255, 255, 255, 0.80)',
                    }}
                />

                {/* Content */}
                <div style={{ position: 'relative', zIndex: 1, padding: '24px' }}>

                    {/* Header + Tombol Tambah */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                        <p style={{ margin: 0, fontSize: '15px', color: '#374151' }}>
                            Total {suppliers.total} supplier terdaftar
                        </p>
                        <Link
                            href="/suppliers/create"
                            style={{
                                display: 'inline-block',
                                padding: '8px 16px',
                                fontSize: '13px',
                                fontWeight: '600',
                                color: '#1e3448',
                                backgroundColor: '#e0f2f8',
                                border: '1.5px solid #a0cfe0',
                                borderRadius: '8px',
                                textDecoration: 'none',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                            }}
                        >
                            + Tambah Supplier
                        </Link>
                    </div>

                    {/* Tabel */}
                    <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1.5px solid #2a3f54' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                            <thead>
                                <tr style={{
                                    backgroundColor: '#2a5f7a',
                                    borderBottom: '3px solid #000000',
                                }}>
                                    {['No', 'Nama Supplier', 'No. Telepon', 'Alamat', 'Jumlah Barang', 'Aksi'].map((col) => (
                                        <th key={col} style={{
                                            padding: '14px 16px',
                                            color: '#ffffff',
                                            fontWeight: '700',
                                            fontSize: '13px',
                                            textAlign: col === 'Aksi' || col === 'Jumlah Barang' ? 'center' : 'left',
                                            whiteSpace: 'nowrap',
                                        }}>
                                            {col}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {suppliers.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} style={{ padding: '32px', textAlign: 'center', color: '#ffffff', backgroundColor: '#1e3448' }}>
                                            Belum ada data supplier
                                        </td>
                                    </tr>
                                ) : (
                                    suppliers.data.map((sup, i) => {
                                        const isLast = i === suppliers.data.length - 1;
                                        return (
                                            <tr
                                                key={sup.id}
                                                style={{
                                                    backgroundColor: '#2a5f7a',
                                                    borderBottom: isLast ? 'none' : '1px solid #000000',
                                                }}
                                                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#2a4a60'}
                                                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2a5f7a'}
                                            >
                                                {/* No */}
                                                <td style={{ padding: '13px 16px', color: '#ffffff', fontWeight: '500' }}>
                                                    {(suppliers.current_page - 1) * suppliers.per_page + i + 1}
                                                </td>

                                                {/* Nama Supplier */}
                                                <td style={{ padding: '13px 16px', color: '#ffffff', fontWeight: '500' }}>{sup.name}</td>

                                                {/* No. Telepon */}
                                                <td style={{ padding: '13px 16px', color: '#ffffff' }}>{sup.phone ?? '-'}</td>

                                                {/* Alamat */}
                                                <td style={{ padding: '13px 16px', color: '#ffffff' }}>{sup.address ?? '-'}</td>

                                                {/* Jumlah Barang — badge biru sesuai gambar */}
                                                <td style={{ padding: '13px 16px', textAlign: 'center' }}>
                                                    <span style={{
                                                        display: 'inline-block',
                                                        padding: '3px 14px',
                                                        fontSize: '12px',
                                                        fontWeight: '600',
                                                        color: '#ffffff',
                                                        backgroundColor: '#2563eb',
                                                        borderRadius: '6px',
                                                    }}>
                                                        {sup.items_count} Barang
                                                    </span>
                                                </td>

                                                {/* Aksi */}
                                                <td style={{ padding: '13px 16px', textAlign: 'center', whiteSpace: 'nowrap' }}>
                                                    <div style={{
                                                        display: 'inline-flex',
                                                        borderRadius: '6px',
                                                        overflow: 'hidden',
                                                        border: '1px solid #d1d5db',
                                                    }}>
                                                        <Link
                                                            href={`/suppliers/${sup.id}/edit`}
                                                            style={{
                                                                fontSize: '12px',
                                                                fontWeight: '500',
                                                                color: '#1e3448',
                                                                backgroundColor: '#ffffff',
                                                                padding: '5px 12px',
                                                                textDecoration: 'none',
                                                                borderRight: '1px solid #d1d5db',
                                                            }}
                                                        >
                                                            Edit
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(sup.id)}
                                                            style={{
                                                                fontSize: '12px',
                                                                fontWeight: '500',
                                                                color: '#dc2626',
                                                                backgroundColor: '#ffffff',
                                                                border: 'none',
                                                                cursor: 'pointer',
                                                                padding: '5px 10px',
                                                            }}
                                                        >
                                                            Hapus
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>

                        {/* Pagination */}
                        {suppliers.last_page > 1 && (
                            <div style={{
                                padding: '12px 16px',
                                borderTop: '1px solid #e5e7eb',
                                backgroundColor: '#1e3448',
                                display: 'flex', alignItems: 'center', gap: '6px',
                            }}>
                                {suppliers.links.map((link, i) => (
                                    <Link
                                        key={i}
                                        href={link.url ?? '#'}
                                        style={{
                                            padding: '4px 10px',
                                            borderRadius: '6px',
                                            fontSize: '13px',
                                            textDecoration: 'none',
                                            backgroundColor: link.active ? '#ffffff' : 'transparent',
                                            color: link.active ? '#1e3448' : '#ffffff',
                                            pointerEvents: link.url ? 'auto' : 'none',
                                            opacity: link.url ? 1 : 0.4,
                                        }}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}