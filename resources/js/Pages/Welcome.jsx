import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome - Smart Inventory Management System" />

            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'sans-serif' }}>

                {/* ── HEADER ─────────────────────────────────────────────── */}
                <header
                    style={{
                        background: '#2a5f7a',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0 32px',
                        height: '64px',
                        position: 'relative',
                        zIndex: 10,
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='64'%3E%3Cpath d='M0 32 Q25 10 50 32 Q75 54 100 32 Q125 10 150 32 Q175 54 200 32' stroke='rgba(255,255,255,0.08)' stroke-width='1.5' fill='none'/%3E%3Cpath d='M0 20 Q25 0 50 20 Q75 40 100 20 Q125 0 150 20 Q175 40 200 20' stroke='rgba(255,255,255,0.05)' stroke-width='1.5' fill='none'/%3E%3Cpath d='M0 44 Q25 24 50 44 Q75 64 100 44 Q125 24 150 44 Q175 64 200 44' stroke='rgba(255,255,255,0.05)' stroke-width='1.5' fill='none'/%3E%3C/svg%3E")`,
                    }}
                >
                    {/* Logo */}
                    <div
                        style={{
                            border: '2px solid rgba(255,255,255,0.55)',
                            borderRadius: '8px',
                            padding: '5px 12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            background: 'rgba(255,255,255,0.07)',
                        }}
                    >
                        <svg width="26" height="26" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="2" y="14" width="36" height="24" rx="2" fill="rgba(255,255,255,0.12)" stroke="white" strokeWidth="1.5"/>
                            <path d="M2 14 L20 6 L38 14" stroke="white" strokeWidth="1.5" fill="none"/>
                            <line x1="20" y1="6" x2="20" y2="38" stroke="white" strokeWidth="1.5"/>
                            <line x1="2" y1="14" x2="38" y2="14" stroke="white" strokeWidth="1.5"/>
                        </svg>
                        <span style={{ color: 'white', fontWeight: 700, fontSize: '13px', letterSpacing: '2px' }}>SMART</span>
                    </div>

                    {/* Nav */}
                    <nav style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                style={{ color: 'white', fontSize: '14px', textDecoration: 'none', padding: '6px 16px' }}
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    style={{ color: 'white', fontSize: '14px', textDecoration: 'none', padding: '6px 16px' }}
                                >
                                    Log In
                                </Link>
                                <Link
                                    href={route('register')}
                                    style={{
                                        color: 'white',
                                        fontSize: '14px',
                                        textDecoration: 'none',
                                        padding: '6px 18px',
                                        border: '1.5px solid white',
                                        borderRadius: '6px',
                                        fontWeight: 500,
                                    }}
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                {/* ── HERO ───────────────────────────────────────────────── */}
                {/*
                    CARA PAKAI GAMBAR:
                    1. Taruh file gambar di: public/images/warehouse.jpg
                    2. Kode di bawah sudah siap — tidak perlu ubah apapun lagi
                    3. Jika nama file berbeda, ganti 'warehouse.jpg' sesuai nama file kamu
                */}
                <section
                    style={{
                        flex: 1,
                        position: 'relative',
                        minHeight: '540px',
                        overflow: 'hidden',
                        backgroundImage: "url('/images/warehouse.jpg')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        /* Fallback warna jika gambar belum ada / gagal load */
                        backgroundColor: '#2a6080',
                    }}
                >
                    {/* Overlay biru gelap — membuat foto terlihat seperti di desain */}
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(20, 55, 80, 0.55)' }} />
                </section>

                {/* ── FOOTER TOP ─────────────────────────────────────────── */}
                <footer style={{ background: '#1a3545' }}>
                    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 32px 40px' }}>

                        {/* Logo row */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '40px' }}>
                            <div
                                style={{
                                    border: '2px solid rgba(255,255,255,0.5)',
                                    borderRadius: '8px',
                                    padding: '6px 14px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    background: 'rgba(255,255,255,0.06)',
                                }}
                            >
                                <svg width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="2" y="14" width="36" height="24" rx="2" fill="rgba(255,255,255,0.12)" stroke="white" strokeWidth="1.5"/>
                                    <path d="M2 14 L20 6 L38 14" stroke="white" strokeWidth="1.5" fill="none"/>
                                    <line x1="20" y1="6" x2="20" y2="38" stroke="white" strokeWidth="1.5"/>
                                    <line x1="2" y1="14" x2="38" y2="14" stroke="white" strokeWidth="1.5"/>
                                </svg>
                                <span style={{ color: 'white', fontWeight: 700, fontSize: '13px', letterSpacing: '2px' }}>SMART</span>
                            </div>
                            <div style={{ color: 'white', fontSize: '22px', fontWeight: 700, lineHeight: 1.25 }}>
                                Smart Inventory<br />Management System
                            </div>
                        </div>

                        {/* 4-column grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.5fr', gap: '32px' }}>

                            {/* About Us */}
                            <div>
                                <h3 style={{ color: 'white', fontSize: '15px', fontWeight: 600, marginBottom: '14px', marginTop: 0 }}>About Us</h3>
                                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', lineHeight: 1.75, marginBottom: '22px', marginTop: 0 }}>
                                    A Smart Inventory Management System is a digital system that helps businesses manage and monitor inventory automatically and in real time. This system reduces manual record-keeping by leveraging modern technology.
                                </p>
                                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                    <a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', display: 'flex' }}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                                        </svg>
                                    </a>
                                    <a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', display: 'flex' }}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                        </svg>
                                    </a>
                                    <a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', display: 'flex' }}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                                            <circle cx="4" cy="4" r="2"/>
                                        </svg>
                                    </a>
                                    <a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', display: 'flex' }}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                                            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                                        </svg>
                                    </a>
                                </div>
                            </div>

                            {/* Company */}
                            <div>
                                <h3 style={{ color: 'white', fontSize: '15px', fontWeight: 600, marginBottom: '14px', marginTop: 0 }}>Company</h3>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {['About Us', 'Service', 'Community', 'Testimonial'].map((item) => (
                                        <li key={item}>
                                            <a href="#" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', textDecoration: 'none' }}>{item}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Support */}
                            <div>
                                <h3 style={{ color: 'white', fontSize: '15px', fontWeight: 600, marginBottom: '14px', marginTop: 0 }}>Support</h3>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {['Help Center', 'Tweet @ Us', 'Contact', 'Feedback'].map((item) => (
                                        <li key={item}>
                                            <a href="#" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', textDecoration: 'none' }}>{item}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Contact */}
                            <div>
                                <h3 style={{ color: 'white', fontSize: '15px', fontWeight: 600, marginBottom: '14px', marginTop: 0 }}>Contact</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.5 10.82 19.79 19.79 0 01.5 2.18 2 2 0 012.47 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.16 6.16l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                                        </svg>
                                        <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>(021) 5088-9100</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                            <polyline points="22,6 12,13 2,6"/>
                                        </svg>
                                        <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>simsbusiness@gmail.com</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── FOOTER BOTTOM ─────────────────────────────────────── */}
                    <div style={{ background: '#0f1f2a', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                        <div
                            style={{
                                maxWidth: '1100px',
                                margin: '0 auto',
                                padding: '16px 32px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px' }}>
                                © Copyright by SIMS Company
                            </span>
                            <div style={{ display: 'flex', gap: '28px' }}>
                                {['Privacy Policy', 'Terms Of Use', 'Legal', 'Site Map'].map((item) => (
                                    <a key={item} href="#" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px', textDecoration: 'none' }}>
                                        {item}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}