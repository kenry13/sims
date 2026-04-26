import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function AuthenticatedLayout({ header, children }) {
    const { auth } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const navItems = [
        {
            label: 'Dashboard',
            href: '/dashboard',
            roles: ['admin', 'user'],
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                    <rect x="14" y="14" width="7" height="7" rx="1" />
                </svg>
            ),
        },
        {
            label: 'Barang',
            href: '/items',
            roles: ['admin', 'user'],
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 8v4l3 3" strokeLinecap="round" />
                </svg>
            ),
        },
        {
            label: 'Kategori',
            href: '/categories',
            roles: ['admin'],
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            ),
        },
        {
            label: 'Suplier',
            href: '/suppliers',
            roles: ['admin'],
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <rect x="1" y="10" width="13" height="10" rx="1" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 13h4l3 4v3h-7V13z" />
                    <circle cx="5.5" cy="20.5" r="1.5" />
                    <circle cx="18.5" cy="20.5" r="1.5" />
                </svg>
            ),
        },
        {
            label: 'Barang Masuk',
            href: '/stock-ins',
            roles: ['admin', 'user'],
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
            ),
        },
        {
            label: 'Barang Keluar',
            href: '/stock-outs',
            roles: ['admin', 'user'],
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
            ),
        },
        {
            label: 'Laporan',
            href: '#',
            roles: ['admin'],
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
            ),
        },
    ];

    const userRole = auth?.user?.role ?? 'user';
    const filteredNav = navItems.filter(item => item.roles.includes(userRole));
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

    return (
        <div className="min-h-screen flex" style={{ fontFamily: "'Segoe UI', sans-serif" }}>

            {/* Sidebar */}
            <aside
                className="flex flex-col fixed h-full z-20 transition-all duration-300"
                style={{
                    width: sidebarOpen ? '210px' : '60px',
                    backgroundColor: '#2a5f7a',
                }}
            >
                {/* Logo */}
                <div
                    className="flex items-center gap-3"
                    style={{
                        padding: '16px',
                        borderBottom: '2px solid rgb(255, 255, 255)',
                    }}
                >
                    <div
                        className="flex-shrink-0 flex items-center justify-center rounded"
                        style={{ width: '36px', height: '36px', backgroundColor: '#4a8fa8' }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={1.8}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                    </div>
                    {sidebarOpen && (
                        <div>
                            <p style={{ fontWeight: '700', fontSize: '14px', color: '#ffffff', lineHeight: 1.2, margin: 0 }}>SIMS</p>
                            <p style={{ fontSize: '11px', color: '#ffffff', margin: 0, opacity: 0.6 }}>Smart Inventory</p>
                        </div>
                    )}
                </div>

                {/* Nav */}
                <nav className="flex-1 py-3 overflow-y-auto">
                    {filteredNav.map((item) => {
                        const isActive = currentPath === item.href || currentPath.startsWith(item.href + '/');
                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="flex items-center gap-3 !text-white"
                                style={{
                                    padding: '10px 16px',
                                    fontSize: '13px',
                                    color: '#ffffff',
                                    fontWeight: isActive ? '600' : '400',
                                    textDecoration: isActive ? 'underline' : 'none',
                                    backgroundColor: isActive ? 'rgba(255,255,255,0.12)' : 'transparent',
                                    transition: 'background-color 0.15s',
                                    WebkitTextFillColor: '#ffffff',
                                }}
                                onMouseEnter={e => { if (!isActive) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)'; }}
                                onMouseLeave={e => { if (!isActive) e.currentTarget.style.backgroundColor = 'transparent'; }}
                            >
                                <span className="flex-shrink-0 !text-white" style={{ color: '#ffffff' }}>{item.icon}</span>
                                {sidebarOpen && <span style={{ color: '#ffffff' }}>{item.label}</span>}
                            </Link>
                        );
                    })}
                </nav>

                {/* User info */}
                {auth?.user && (
                    <div style={{ padding: '14px 16px', borderTop: '2px solid rgb(255, 255, 255)' }}>
                        {sidebarOpen ? (
                            <>
                                <p style={{ fontSize: '11px', color: '#ffffff', opacity: 0.6, margin: 0 }}>Login sebagai</p>
                                <p style={{ fontSize: '14px', fontWeight: '700', color: '#ffffff', marginTop: '2px', margin: '2px 0 0 0' }}>{auth.user.name}</p>
                                <span
                                    style={{
                                        fontSize: '11px',
                                        padding: '2px 10px',
                                        borderRadius: '999px',
                                        marginTop: '6px',
                                        display: 'inline-block',
                                        backgroundColor: auth.user.role === 'admin' ? '#2d6a9f' : '#2d7a4f',
                                        color: 'white',
                                    }}
                                >
                                    {auth.user.role === 'admin' ? 'Admin' : auth.user.role}
                                </span>
                            </>
                        ) : (
                            <div
                                style={{
                                    width: '32px', height: '32px', borderRadius: '50%',
                                    backgroundColor: '#2d6a9f', color: 'white',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '13px', fontWeight: '700', margin: '0 auto',
                                }}
                            >
                                {auth.user.name?.charAt(0).toUpperCase()}
                            </div>
                        )}
                    </div>
                )}
            </aside>

            {/* Main area */}
            <div
                className="flex-1 flex flex-col transition-all duration-300"
                style={{ marginLeft: sidebarOpen ? '210px' : '60px' }}
            >
                {/* Topbar */}
                <header
                    className="flex items-center justify-between sticky top-0 z-10"
                    style={{
                        backgroundColor: 'white',
                        padding: '14px 24px',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                    }}
                >
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', display: 'flex', flexDirection: 'column', gap: '5px' }}
                        >
                            <span style={{ display: 'block', width: '22px', height: '2px', backgroundColor: '#374151', borderRadius: '2px' }} />
                            <span style={{ display: 'block', width: '22px', height: '2px', backgroundColor: '#374151', borderRadius: '2px' }} />
                            <span style={{ display: 'block', width: '22px', height: '2px', backgroundColor: '#374151', borderRadius: '2px' }} />
                        </button>
                        {header && (
                            <h1 style={{ fontWeight: '700', fontSize: '18px', color: '#111827' }}>{header}</h1>
                        )}
                    </div>
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        style={{ color: '#e53e3e', fontSize: '14px', fontWeight: '600', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                        Logout
                    </Link>
                </header>

                {/* Content */}
                <main className="flex-1" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}