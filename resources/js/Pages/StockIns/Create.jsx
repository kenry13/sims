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

    const inputStyle = {
        width: '100%',
        border: '2px solid rgba(255,255,255,0.55)',
        borderRadius: '8px',
        padding: '10px 14px',
        fontSize: '13px',
        outline: 'none',
        boxSizing: 'border-box',
        color: '#ffffff',
        backgroundColor: 'rgba(255,255,255,0.08)',
    };

    const labelStyle = {
        display: 'inline-block',
        fontSize: '13px',
        fontWeight: '600',
        color: '#ffffff',
        backgroundColor: 'rgba(255,255,255,0.15)',
        padding: '3px 10px',
        borderRadius: '6px',
        marginBottom: '8px',
    };

    return (
        <AuthenticatedLayout header="Catat Barang Masuk">
            <Head title="Catat Barang Masuk" />

            <div
                style={{
                    flex: 1,
                    position: 'relative',
                    backgroundImage: "url('/Images/worker.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'local',
                    minHeight: '100%',
                }}
            >
                {/* Overlay */}
                <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(255,255,255,0.80)' }} />

                {/* Centered content */}
                <div style={{
                    position: 'relative',
                    zIndex: 1,
                    padding: '40px 24px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                }}>
                    <div style={{ width: '100%', maxWidth: '700px' }}>
                        <div style={{
                            backgroundColor: '#2a5f7a',
                            borderRadius: '12px',
                            padding: '28px',
                            boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
                            border: '1.5px solid #2a3f54',
                        }}>
                            <form onSubmit={handleSubmit}>

                                {/* Pilih Barang */}
                                <div style={{ marginBottom: '18px' }}>
                                    <label style={labelStyle}>Pilih Barang <span style={{ color: '#fca5a5' }}>*</span></label>
                                    <select
                                        value={data.item_id}
                                        onChange={e => setData('item_id', e.target.value)}
                                        style={inputStyle}
                                    >
                                        <option value="" style={{ backgroundColor: '#2a5f7a' }}>-- Pilih Barang --</option>
                                        {items.map(item => (
                                            <option key={item.id} value={item.id} style={{ backgroundColor: '#2a5f7a' }}>
                                                {item.name} (Stok: {item.stock} {item.unit})
                                            </option>
                                        ))}
                                    </select>
                                    {errors.item_id && <p style={{ color: '#fca5a5', fontSize: '12px', marginTop: '4px' }}>{errors.item_id}</p>}
                                </div>

                                {/* Info stok saat ini */}
                                {selectedItem && (
                                    <div style={{
                                        backgroundColor: 'rgba(255,255,255,0.12)',
                                        border: '1.5px solid rgba(255,255,255,0.30)',
                                        borderRadius: '8px',
                                        padding: '10px 14px',
                                        fontSize: '13px',
                                        color: '#ffffff',
                                        marginBottom: '18px',
                                    }}>
                                        Stok saat ini: <strong>{selectedItem.stock} {selectedItem.unit}</strong>
                                    </div>
                                )}

                                {/* Jumlah & Tanggal */}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '18px' }}>
                                    <div>
                                        <label style={labelStyle}>Jumlah <span style={{ color: '#fca5a5' }}>*</span></label>
                                        <input
                                            type="number"
                                            value={data.quantity}
                                            onChange={e => setData('quantity', e.target.value)}
                                            min="1"
                                            style={inputStyle}
                                        />
                                        {errors.quantity && <p style={{ color: '#fca5a5', fontSize: '12px', marginTop: '4px' }}>{errors.quantity}</p>}
                                    </div>
                                    <div>
                                        <label style={labelStyle}>Tanggal <span style={{ color: '#fca5a5' }}>*</span></label>
                                        <input
                                            type="date"
                                            value={data.date}
                                            onChange={e => setData('date', e.target.value)}
                                            style={inputStyle}
                                        />
                                        {errors.date && <p style={{ color: '#fca5a5', fontSize: '12px', marginTop: '4px' }}>{errors.date}</p>}
                                    </div>
                                </div>

                                {/* Keterangan */}
                                <div style={{ marginBottom: '24px' }}>
                                    <label style={labelStyle}>Keterangan</label>
                                    <textarea
                                        value={data.note}
                                        onChange={e => setData('note', e.target.value)}
                                        rows={4}
                                        placeholder="Opsional..."
                                        style={{ ...inputStyle, resize: 'vertical' }}
                                    />
                                </div>

                                {/* Tombol */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        style={{
                                            backgroundColor: 'rgba(34, 235, 8, 0.55)',
                                            color: '#ffffff',
                                            fontSize: '13px',
                                            fontWeight: '700',
                                            padding: '10px 22px',
                                            borderRadius: '8px',
                                            border: '2px solid rgba(255,255,255,0.40)',
                                            cursor: processing ? 'not-allowed' : 'pointer',
                                            opacity: processing ? 0.6 : 1,
                                            letterSpacing: '0.3px',
                                        }}
                                    >
                                        {processing ? 'Menyimpan...' : 'Catat Masuk'}
                                    </button>
                                    <Link href="/stock-ins" style={{ fontSize: '13px', color: 'rgb(255, 255, 255)', textDecoration: 'none' }}>
                                        Batal
                                    </Link>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>

                {/* Fix placeholder & select option colors */}
                <style>{`
                    input::placeholder, textarea::placeholder {
                        color: rgba(255,255,255,0.45) !important;
                    }
                    input[type="date"]::-webkit-calendar-picker-indicator {
                        filter: invert(1);
                    }
                `}</style>
            </div>
        </AuthenticatedLayout>
    );
}