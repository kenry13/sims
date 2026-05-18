import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

export default function ReportsIndex({ auth, filters, summary, stockIns, stockOuts, itemStats }) {
    const [activeTab, setActiveTab] = useState('items');
    const [startDate, setStartDate] = useState(filters.start_date);
    const [endDate, setEndDate] = useState(filters.end_date);

    const handleFilter = () => {
        router.get('/reports', { start_date: startDate, end_date: endDate }, { preserveState: true });
    };

    return (
        <AuthenticatedLayout header="Laporan" auth={auth}>
            <Head title="Laporan" />

            <div style={{ padding: '24px', backgroundColor: '#f8fafc', minHeight: 'calc(100vh - 64px)' }}>
                <div style={{ marginBottom: '24px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#1e293b', marginBottom: '8px' }}>
                        Laporan Inventaris
                    </h2>
                    <p style={{ color: '#64748b', fontSize: '14px' }}>
                        Lihat laporan barang, barang masuk, dan barang keluar.
                    </p>
                </div>

                <div style={{ 
                    backgroundColor: 'white', 
                    padding: '20px', 
                    borderRadius: '12px', 
                    border: '1px solid #e2e8f0',
                    marginBottom: '24px',
                    display: 'flex',
                    gap: '16px',
                    alignItems: 'flex-end',
                    flexWrap: 'wrap'
                }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#64748b', marginBottom: '6px' }}>Tanggal Mulai</label>
                        <input 
                            type="date" 
                            value={startDate} 
                            onChange={(e) => setStartDate(e.target.value)}
                            style={{ 
                                padding: '10px 14px', 
                                border: '1px solid #e2e8f0', 
                                borderRadius: '8px', 
                                fontSize: '14px',
                                outline: 'none'
                            }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#64748b', marginBottom: '6px' }}>Tanggal Akhir</label>
                        <input 
                            type="date" 
                            value={endDate} 
                            onChange={(e) => setEndDate(e.target.value)}
                            style={{ 
                                padding: '10px 14px', 
                                border: '1px solid #e2e8f0', 
                                borderRadius: '8px', 
                                fontSize: '14px',
                                outline: 'none'
                            }}
                        />
                    </div>
                    <button 
                        onClick={handleFilter}
                        style={{ 
                            padding: '10px 20px', 
                            backgroundColor: '#0ea5e9', 
                            color: 'white', 
                            border: 'none', 
                            borderRadius: '8px', 
                            fontSize: '14px',
                            fontWeight: '600',
                            cursor: 'pointer'
                        }}
                    >
                        Filter
                    </button>
                </div>

                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '16px',
                        marginBottom: '24px',
                    }}
                >
                    <SummaryCard label="Total Barang" value={summary.total_items} color="#0ea5e9" />
                    <SummaryCard label="Total Barang Masuk" value={summary.total_in} color="#10b981" />
                    <SummaryCard label="Total Barang Keluar" value={summary.total_out} color="#6366f1" />
                    <SummaryCard label="Stok Menipis" value={summary.low_stock_items} color="#f59e0b" />
                </div>

                <div style={{ 
                    backgroundColor: 'white', 
                    borderRadius: '12px', 
                    border: '1px solid #e2e8f0',
                    overflow: 'hidden'
                }}>
                    <div style={{ 
                        display: 'flex', 
                        borderBottom: '1px solid #e2e8f0',
                        padding: '0 20px'
                    }}>
                        {['items', 'stock-ins', 'stock-outs'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                style={{
                                    padding: '16px 20px',
                                    border: 'none',
                                    backgroundColor: 'transparent',
                                    fontSize: '14px',
                                    fontWeight: activeTab === tab ? '700' : '500',
                                    color: activeTab === tab ? '#0ea5e9' : '#64748b',
                                    cursor: 'pointer',
                                    borderBottom: activeTab === tab ? '2px solid #0ea5e9' : '2px solid transparent',
                                    marginBottom: '-2px'
                                }}
                            >
                                {tab === 'items' ? 'Barang' : tab === 'stock-ins' ? 'Barang Masuk' : 'Barang Keluar'}
                            </button>
                        ))}
                    </div>

                    <div style={{ padding: '20px' }}>
                        {activeTab === 'items' && (
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr style={{ backgroundColor: '#f8fafc' }}>
                                            <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Kode</th>
                                            <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Nama Barang</th>
                                            <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Kategori</th>
                                            <th style={{ padding: '12px 16px', textAlign: 'right', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Stok</th>
                                            <th style={{ padding: '12px 16px', textAlign: 'right', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Min Stok</th>
                                            <th style={{ padding: '12px 16px', textAlign: 'right', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Total Masuk</th>
                                            <th style={{ padding: '12px 16px', textAlign: 'right', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Total Keluar</th>
                                            <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {itemStats.map((item) => (
                                            <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                                <td style={{ padding: '12px 16px', fontSize: '13px', color: '#64748b' }}>{item.code}</td>
                                                <td style={{ padding: '12px 16px', fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>{item.name}</td>
                                                <td style={{ padding: '12px 16px', fontSize: '13px', color: '#64748b' }}>{item.category}</td>
                                                <td style={{ padding: '12px 16px', fontSize: '14px', fontWeight: '700', color: '#1e293b', textAlign: 'right' }}>{item.stock}</td>
                                                <td style={{ padding: '12px 16px', fontSize: '13px', color: '#64748b', textAlign: 'right' }}>{item.min_stock}</td>
                                                <td style={{ padding: '12px 16px', fontSize: '14px', fontWeight: '600', color: '#10b981', textAlign: 'right' }}>{item.total_in}</td>
                                                <td style={{ padding: '12px 16px', fontSize: '14px', fontWeight: '600', color: '#6366f1', textAlign: 'right' }}>{item.total_out}</td>
                                                <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                                                    <span style={{ 
                                                        padding: '4px 10px', 
                                                        borderRadius: '999px', 
                                                        fontSize: '11px', 
                                                        fontWeight: '700',
                                                        backgroundColor: item.is_low_stock ? '#fef3c7' : '#d1fae5',
                                                        color: item.is_low_stock ? '#92400e' : '#065f46'
                                                    }}>
                                                        {item.is_low_stock ? 'Menipis' : 'Aman'}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {activeTab === 'stock-ins' && (
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr style={{ backgroundColor: '#f8fafc' }}>
                                            <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Tanggal</th>
                                            <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Barang</th>
                                            <th style={{ padding: '12px 16px', textAlign: 'right', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Jumlah</th>
                                            <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Pengguna</th>
                                            <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Catatan</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {stockIns.map((item) => (
                                            <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                                <td style={{ padding: '12px 16px', fontSize: '13px', color: '#64748b' }}>{item.date}</td>
                                                <td style={{ padding: '12px 16px', fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>{item.item?.name}</td>
                                                <td style={{ padding: '12px 16px', fontSize: '14px', fontWeight: '700', color: '#10b981', textAlign: 'right' }}>+{item.quantity}</td>
                                                <td style={{ padding: '12px 16px', fontSize: '13px', color: '#64748b' }}>{item.user?.name}</td>
                                                <td style={{ padding: '12px 16px', fontSize: '13px', color: '#64748b' }}>{item.note || '-'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {activeTab === 'stock-outs' && (
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr style={{ backgroundColor: '#f8fafc' }}>
                                            <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Tanggal</th>
                                            <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Barang</th>
                                            <th style={{ padding: '12px 16px', textAlign: 'right', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Jumlah</th>
                                            <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Pengguna</th>
                                            <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Catatan</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {stockOuts.map((item) => (
                                            <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                                <td style={{ padding: '12px 16px', fontSize: '13px', color: '#64748b' }}>{item.date}</td>
                                                <td style={{ padding: '12px 16px', fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>{item.item?.name}</td>
                                                <td style={{ padding: '12px 16px', fontSize: '14px', fontWeight: '700', color: '#6366f1', textAlign: 'right' }}>-{item.quantity}</td>
                                                <td style={{ padding: '12px 16px', fontSize: '13px', color: '#64748b' }}>{item.user?.name}</td>
                                                <td style={{ padding: '12px 16px', fontSize: '13px', color: '#64748b' }}>{item.note || '-'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function SummaryCard({ label, value, color }) {
    return (
        <div
            style={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '20px',
            }}
        >
            <p style={{ fontSize: '13px', fontWeight: '600', color: '#64748b', marginBottom: '8px' }}>{label}</p>
            <p style={{ fontSize: '28px', fontWeight: '800', color: color, lineHeight: 1 }}>{value}</p>
        </div>
    );
}
