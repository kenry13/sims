import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ category }) {
    const { data, setData, put, processing, errors } = useForm({
        name:        category.name,
        description: category.description ?? '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/categories/${category.id}`);
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
        <AuthenticatedLayout header="Edit Kategori">
            <Head title="Edit Kategori" />

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

                                {/* Nama Kategori */}
                                <div style={{ marginBottom: '18px' }}>
                                    <label style={labelStyle}>Nama Kategori <span style={{ color: '#fca5a5' }}>*</span></label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        placeholder="Elektronik"
                                        style={inputStyle}
                                    />
                                    {errors.name && <p style={{ color: '#fca5a5', fontSize: '12px', marginTop: '4px' }}>{errors.name}</p>}
                                </div>

                                {/* Deskripsi */}
                                <div style={{ marginBottom: '24px' }}>
                                    <label style={labelStyle}>Deskripsi</label>
                                    <textarea
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                        rows={4}
                                        placeholder="Opsional..."
                                        style={{ ...inputStyle, resize: 'vertical' }}
                                    />
                                    {errors.description && <p style={{ color: '#fca5a5', fontSize: '12px', marginTop: '4px' }}>{errors.description}</p>}
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
                                        {processing ? 'Menyimpan...' : 'Update Kategori'}
                                    </button>
                                    <Link href="/categories" style={{ fontSize: '13px', color: 'rgb(255, 255, 255)', textDecoration: 'none' }}>
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