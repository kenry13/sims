import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout header="Dashboard" auth={auth}>
            <Head title="Dashboard" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <StatCard label="Total Barang"  value="4" color="blue"   icon="📦" />
                <StatCard label="Barang Masuk"  value="4" color="green"  icon="📥" />
                <StatCard label="Barang Keluar" value="2" color="red"    icon="📤" />
                <StatCard label="Stok Menipis"  value="2" color="yellow" icon="⚠️" />
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-base font-semibold text-gray-700 mb-4">
                    Selamat datang, {auth.user.name}!
                </h2>
                <p className="text-sm text-gray-400">
                    Gunakan menu di sidebar untuk mengelola inventaris.
                </p>
            </div>
        </AuthenticatedLayout>
    );
}

function StatCard({ label, value, color, icon }) {
    const colors = {
        blue:   'bg-blue-50 border-blue-200 text-blue-700',
        green:  'bg-green-50 border-green-200 text-green-700',
        red:    'bg-red-50 border-red-200 text-red-700',
        yellow: 'bg-yellow-50 border-yellow-200 text-yellow-700',
    };

    return (
        <div className={`rounded-xl border p-5 ${colors[color]}`}>
            <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{label}</span>
                <span className="text-2xl">{icon}</span>
            </div>
            <p className="text-3xl font-bold">{value}</p>
        </div>
    );
}