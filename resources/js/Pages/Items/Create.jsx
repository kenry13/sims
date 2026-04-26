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
        <AuthenticatedLayout header="Tambah Barang">
            <Head title="Tambah Barang" />

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

                                {/* Kode & Nama */}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '18px' }}>
                                    <div>
                                        <label style={labelStyle}>Kode Barang <span style={{ color: '#fca5a5' }}>*</span></label>
                                        <input type="text" value={data.code} onChange={e => setData('code', e.target.value)}
                                            placeholder="ELK-001" style={inputStyle} />
                                        {errors.code && <p style={{ color: '#fca5a5', fontSize: '12px', marginTop: '4px' }}>{errors.code}</p>}
                                    </div>
                                    <div>
                                        <label style={labelStyle}>Nama Barang <span style={{ color: '#fca5a5' }}>*</span></label>
                                        <input type="text" value={data.name} onChange={e => setData('name', e.target.value)}
                                            placeholder="Laptop Lenovo" style={inputStyle} />
                                        {errors.name && <p style={{ color: '#fca5a5', fontSize: '12px', marginTop: '4px' }}>{errors.name}</p>}
                                    </div>
                                </div>

                                {/* Kategori & Supplier */}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '18px' }}>
                                    <div>
                                        <label style={labelStyle}>Kategori <span style={{ color: '#fca5a5' }}>*</span></label>
                                        <select value={data.category_id} onChange={e => setData('category_id', e.target.value)} style={inputStyle}>
                                            <option value="" style={{ backgroundColor: '#2a5f7a' }}>-- Pilih Kategori --</option>
                                            {categories?.map(cat => (
                                                <option key={cat.id} value={cat.id} style={{ backgroundColor: '#2a5f7a' }}>{cat.name}</option>
                                            ))}
                                        </select>
                                        {errors.category_id && <p style={{ color: '#fca5a5', fontSize: '12px', marginTop: '4px' }}>{errors.category_id}</p>}
                                    </div>
                                    <div>
                                        <label style={labelStyle}>Supplier <span style={{ color: '#fca5a5' }}>*</span></label>
                                        <select value={data.supplier_id} onChange={e => setData('supplier_id', e.target.value)} style={inputStyle}>
                                            <option value="" style={{ backgroundColor: '#2a5f7a' }}>-- Pilih Supplier --</option>
                                            {suppliers?.map(sup => (
                                                <option key={sup.id} value={sup.id} style={{ backgroundColor: '#2a5f7a' }}>{sup.name}</option>
                                            ))}
                                        </select>
                                        {errors.supplier_id && <p style={{ color: '#fca5a5', fontSize: '12px', marginTop: '4px' }}>{errors.supplier_id}</p>}
                                    </div>
                                </div>

                                {/* Stok, Min Stok, Satuan */}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '18px' }}>
                                    <div>
                                        <label style={labelStyle}>Stok Awal <span style={{ color: '#fca5a5' }}>*</span></label>
                                        <input type="number" value={data.stock} onChange={e => setData('stock', e.target.value)} min="0" style={inputStyle} />
                                        {errors.stock && <p style={{ color: '#fca5a5', fontSize: '12px', marginTop: '4px' }}>{errors.stock}</p>}
                                    </div>
                                    <div>
                                        <label style={labelStyle}>Stok Minimum <span style={{ color: '#fca5a5' }}>*</span></label>
                                        <input type="number" value={data.min_stock} onChange={e => setData('min_stock', e.target.value)} min="0" style={inputStyle} />
                                        {errors.min_stock && <p style={{ color: '#fca5a5', fontSize: '12px', marginTop: '4px' }}>{errors.min_stock}</p>}
                                    </div>
                                    <div>
                                        <label style={labelStyle}>Satuan <span style={{ color: '#fca5a5' }}>*</span></label>
                                        <input type="text" value={data.unit} onChange={e => setData('unit', e.target.value)} placeholder="unit / rim / pcs" style={inputStyle} />
                                        {errors.unit && <p style={{ color: '#fca5a5', fontSize: '12px', marginTop: '4px' }}>{errors.unit}</p>}
                                    </div>
                                </div>

                                {/* Deskripsi */}
                                <div style={{ marginBottom: '24px' }}>
                                    <label style={labelStyle}>Deskripsi</label>
                                    <textarea value={data.description} onChange={e => setData('description', e.target.value)}
                                        rows={4} placeholder="Opsional..."
                                        style={{ ...inputStyle, resize: 'vertical' }} />
                                </div>

                                {/* Tombol */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        style={{
                                            backgroundColor: 'rgba(255,255,255,0.15)',
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
                                        {processing ? 'Menyimpan...' : 'Simpan Barang'}
                                    </button>
                                    <Link href="/items" style={{ fontSize: '13px', color: 'rgb(255, 255, 255)', textDecoration: 'none' }}>
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
                `}</style>
            </div>
        </AuthenticatedLayout>
    );
}