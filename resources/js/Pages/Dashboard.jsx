import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout header="Dashboard" auth={auth}>
            <Head title="Dashboard" />

            {/*
                Wrapper: background gambar worker.jpg.
                - Tidak pakai minHeight 100vh agar gambar tidak overflow keluar area konten
                - height: 100% mengikuti tinggi main element (flex-1)
                - backgroundSize: cover + center agar gambar proporsional dan pas
                - Overlay putih 80% agar gambar sangat pudar/samar seperti referensi
            */}
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

                    {/* Stat Cards */}
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(4, 1fr)',
                            gap: '16px',
                            marginBottom: '16px',
                        }}
                    >
                        <StatCard label="Total Barang"  value={4} icon={<IconBox />} />
                        <StatCard label="Barang Masuk"  value={4} icon={<IconArrowIn />} />
                        <StatCard label="Barang Keluar" value={2} icon={<IconArrowOut />} />
                        <StatCard label="Stok Menipis"  value={2} icon={<IconWarning />} />
                    </div>

                    {/* Welcome banner */}
                    <div
                        style={{
                            borderRadius: '12px',
                            padding: '20px 24px',
                            backgroundColor: '#2a5f7a',
                        }}
                    >
                        <h2 style={{ fontWeight: '700', fontSize: '16px', color: 'white', margin: 0 }}>
                            Selamat datang, {auth.user.name}!
                        </h2>
                        <p style={{ fontSize: '13px', color: 'white', margin: '4px 0 0 0' }}>
                            Gunakan menu di sidebar untuk mengelola inventaris
                        </p>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function StatCard({ label, value, icon }) {
    return (
        <div
            style={{
                backgroundColor: '#b8cdd9',
                border: '1.5px solid #9ab8c8',
                borderRadius: '12px',
                padding: '16px 20px',
                minHeight: '110px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ fontWeight: '700', fontSize: '14px', color: '#1a2e40' }}>{label}</span>
                <span style={{ color: '#1a2e40' }}>{icon}</span>
            </div>
            <p style={{ fontWeight: '900', fontSize: '42px', color: '#111827', lineHeight: 1, margin: 0 }}>
                {value}
            </p>
        </div>
    );
}

function IconBox() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
    );
}

function IconArrowIn() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
        </svg>
    );
}

function IconArrowOut() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
    );
}

function IconWarning() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        </svg>
    );
}