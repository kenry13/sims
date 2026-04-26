import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name:    '',
        phone:   '',
        address: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/suppliers');
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
        <AuthenticatedLayout header="Tambah Supplier">
            <Head title="Tambah Supplier" />

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

                                {/* Nama Supplier */}
                                <div style={{ marginBottom: '18px' }}>
                                    <label style={labelStyle}>Nama Supplier <span style={{ color: '#fca5a5' }}>*</span></label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        placeholder="PT Maju Jaya"
                                        style={inputStyle}
                                    />
                                    {errors.name && <p style={{ color: '#fca5a5', fontSize: '12px', marginTop: '4px' }}>{errors.name}</p>}
                                </div>

                                {/* No. Telepon */}
                                <div style={{ marginBottom: '18px' }}>
                                    <label style={labelStyle}>No. Telepon</label>
                                    <input
                                        type="text"
                                        value={data.phone}
                                        onChange={e => setData('phone', e.target.value)}
                                        placeholder="08123456789"
                                        style={inputStyle}
                                    />
                                    {errors.phone && <p style={{ color: '#fca5a5', fontSize: '12px', marginTop: '4px' }}>{errors.phone}</p>}
                                </div>

                                {/* Alamat */}
                                <div style={{ marginBottom: '24px' }}>
                                    <label style={labelStyle}>Alamat</label>
                                    <textarea
                                        value={data.address}
                                        onChange={e => setData('address', e.target.value)}
                                        rows={4}
                                        placeholder="Jl. Contoh No. 1, Bandung"
                                        style={{ ...inputStyle, resize: 'vertical' }}
                                    />
                                    {errors.address && <p style={{ color: '#fca5a5', fontSize: '12px', marginTop: '4px' }}>{errors.address}</p>}
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
                                        {processing ? 'Menyimpan...' : 'Simpan Supplier'}
                                    </button>
                                    <Link href="/suppliers" style={{ fontSize: '13px', color: 'rgb(255, 255, 255)', textDecoration: 'none' }}>
                                        Batal
                                    </Link>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>

                {/* Fix placeholder color */}
                <style>{`
                    input::placeholder, textarea::placeholder {
                        color: rgba(255,255,255,0.45) !important;
                    }
                `}</style>
            </div>
        </AuthenticatedLayout>
    );
}