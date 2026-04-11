import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function AuthenticatedLayout({ header, children }) {
    const { auth } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const navItems = [
        { label: 'Dashboard',     href: '/dashboard',    icon: '📊', roles: ['admin', 'user'] },
        { label: 'Barang',        href: '/items',         icon: '📦', roles: ['admin', 'user'] },
        { label: 'Kategori',      href: '/categories',    icon: '🏷️', roles: ['admin'] },
        { label: 'Supplier',      href: '/suppliers',     icon: '🚚', roles: ['admin'] },
        { label: 'Barang Masuk',  href: '/stock-ins',     icon: '📥', roles: ['admin', 'user'] },
        { label: 'Barang Keluar', href: '/stock-outs',    icon: '📤', roles: ['admin', 'user'] },
        { label: 'Laporan',       href: '#',              icon: '📋', roles: ['admin'] },
    ];

    // Kalau auth atau user belum ada, jangan crash
    const userRole = auth?.user?.role ?? 'user';

    const filteredNav = navItems.filter(item =>
        item.roles.includes(userRole)
    );

    return (
        <div className="min-h-screen bg-gray-100 flex">

            {/* Sidebar */}
            <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-gray-900 text-white transition-all duration-300 flex flex-col fixed h-full z-10`}>

                {/* Logo */}
                <div className="flex items-center gap-3 px-4 py-5 border-b border-gray-700">
                    <span className="text-xl">📦</span>
                    {sidebarOpen && (
                        <div>
                            <p className="font-bold text-sm">SIMS</p>
                            <p className="text-xs text-gray-400">Smart Inventory</p>
                        </div>
                    )}
                </div>

                {/* Nav */}
                <nav className="flex-1 py-4 overflow-y-auto">
                    {filteredNav.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                        >
                            <span>{item.icon}</span>
                            {sidebarOpen && <span>{item.label}</span>}
                        </Link>
                    ))}
                </nav>

                {/* User info */}
                {sidebarOpen && auth?.user && (
                    <div className="px-4 py-4 border-t border-gray-700">
                        <p className="text-xs text-gray-400">Login sebagai</p>
                        <p className="text-sm font-medium truncate">{auth.user.name}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full mt-1 inline-block ${
                            auth.user.role === 'admin'
                                ? 'bg-blue-600'
                                : 'bg-green-600'
                        }`}>
                            {auth.user.role}
                        </span>
                    </div>
                )}
            </aside>

            {/* Main area */}
            <div className={`flex-1 flex flex-col ${sidebarOpen ? 'ml-64' : 'ml-16'} transition-all duration-300`}>

                {/* Topbar */}
                <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="text-gray-500 hover:text-gray-800 text-xl"
                        >
                            ☰
                        </button>
                        {header && (
                            <h1 className="text-base font-semibold text-gray-800">{header}</h1>
                        )}
                    </div>

                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="text-sm text-red-500 hover:text-red-700 font-medium"
                    >
                        Logout
                    </Link>
                </header>

                {/* Content */}
                <main className="flex-1 p-6">
                    {children}
                </main>

            </div>
        </div>
    );
}