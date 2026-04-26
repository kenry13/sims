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

            {/* Wrapper dengan background image + overlay, persis seperti Index Barang Masuk */}
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
                {/* Overlay putih tebal agar gambar sangat pudar */}
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
                            Total {stockOuts.total} transaksi keluar
                        </p>
                        <Link
                            href="/stock-outs/create"
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
                            + Catat Barang Keluar
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
                                    {['Tanggal', 'Nama Barang', 'Jumlah', 'Dicatat Oleh', 'Keterangan', 'Aksi'].map((col) => (
                                        <th key={col} style={{
                                            padding: '14px 16px',
                                            color: '#ffffff',
                                            fontWeight: '700',
                                            fontSize: '13px',
                                            textAlign: col === 'Aksi' || col === 'Jumlah' ? 'center' : 'left',
                                            whiteSpace: 'nowrap',
                                        }}>
                                            {col}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {stockOuts.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} style={{ padding: '32px', textAlign: 'center', color: '#ffffff', backgroundColor: '#1e3448' }}>
                                            Belum ada transaksi barang keluar
                                        </td>
                                    </tr>
                                ) : (
                                    stockOuts.data.map((s, i) => {
                                        const isLast = i === stockOuts.data.length - 1;
                                        return (
                                            <tr
                                                key={s.id}
                                                style={{
                                                    backgroundColor: '#2a5f7a',
                                                    borderBottom: isLast ? 'none' : '1px solid #000000',
                                                }}
                                                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#2a4a60'}
                                                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2a5f7a'}
                                            >
                                                <td style={{ padding: '13px 16px', color: '#ffffff', fontWeight: '500' }}>{s.date}</td>
                                                <td style={{ padding: '13px 16px', color: '#ffffff', fontWeight: '500' }}>{s.item?.name ?? '-'}</td>

                                                {/* Jumlah — badge merah */}
                                                <td style={{ padding: '13px 16px', textAlign: 'center' }}>
                                                    <span style={{
                                                        display: 'inline-block',
                                                        padding: '3px 12px',
                                                        fontSize: '12px',
                                                        fontWeight: '600',
                                                        color: '#ffffff',
                                                        backgroundColor: '#dc2626',
                                                        borderRadius: '6px',
                                                    }}>
                                                        -{s.quantity} {s.item?.unit}
                                                    </span>
                                                </td>

                                                <td style={{ padding: '13px 16px', color: '#ffffff' }}>{s.user?.name ?? '-'}</td>
                                                <td style={{ padding: '13px 16px', color: '#ffffff' }}>{s.note ?? '--'}</td>

                                                {/* Aksi — tombol hapus */}
                                                <td style={{ padding: '13px 16px', textAlign: 'center', whiteSpace: 'nowrap' }}>
                                                    <div style={{
                                                        display: 'inline-flex',
                                                        borderRadius: '6px',
                                                        overflow: 'hidden',
                                                        border: '1px solid #d1d5db',
                                                    }}>
                                                        <button
                                                            onClick={() => handleDelete(s.id)}
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
                        {stockOuts.last_page > 1 && (
                            <div style={{
                                padding: '12px 16px',
                                borderTop: '1px solid #e5e7eb',
                                backgroundColor: '#1e3448',
                                display: 'flex', alignItems: 'center', gap: '6px',
                            }}>
                                {stockOuts.links.map((link, i) => (
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