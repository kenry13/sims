import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <>
            <Head title="Log in" />

            {/* Full-page background */}
            <div style={{
                minHeight: '100vh',
                width: '100%',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
            }}>
                {/* Background image with blue overlay */}
               <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: 'url(/images/worker.jpg)',
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: '#8fafc4',
                    zIndex: 0,
                    filter: 'none',
                }} />

                {/* Blur effect untuk area kosong di kiri & kanan */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: 'url(/images/worker.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    filter: 'blur(20px) brightness(0.85)',
                    transform: 'scale(1.1)',
                    zIndex: 0,
                }} />
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: 'url(/images/worker.jpg)',
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    zIndex: 1,
                }} />
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(100, 150, 190, 0.45)',
                    zIndex: 2,
                }} />

                {/* Login Card */}
                <div style={{
                    position: 'relative',
                    zIndex: 3,
                    backgroundColor: 'rgba(45, 75, 95, 0.88)',
                    borderRadius: '16px',
                    padding: '40px 44px',
                    width: '100%',
                    maxWidth: '460px',
                    boxShadow: '0 8px 40px rgba(0,0,0,0.35)',
                }}>
                    {status && (
                        <div style={{ marginBottom: '16px', fontSize: '14px', color: '#4ade80' }}>
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit}>
                        {/* Email */}
                        <div style={{ marginBottom: '24px' }}>
                            <label
                                htmlFor="email"
                                style={{
                                    display: 'block',
                                    color: '#ffffff',
                                    fontWeight: '700',
                                    fontSize: '15px',
                                    marginBottom: '8px',
                                    fontFamily: 'sans-serif',
                                }}
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                autoComplete="username"
                                autoFocus
                                onChange={(e) => setData('email', e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px 14px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    backgroundColor: '#ffffff',
                                    fontSize: '15px',
                                    outline: 'none',
                                    boxSizing: 'border-box',
                                }}
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        {/* Password */}
                        <div style={{ marginBottom: '20px' }}>
                            <label
                                htmlFor="password"
                                style={{
                                    display: 'block',
                                    color: '#ffffff',
                                    fontWeight: '700',
                                    fontSize: '15px',
                                    marginBottom: '8px',
                                    fontFamily: 'sans-serif',
                                }}
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px 14px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    backgroundColor: '#ffffff',
                                    fontSize: '15px',
                                    outline: 'none',
                                    boxSizing: 'border-box',
                                }}
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        {/* Remember me + Forgot password + Login button */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            gap: '10px',
                        }}>
                            {/* Remember me */}
                            <label style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                color: '#ffffff',
                                fontSize: '14px',
                                cursor: 'pointer',
                                fontFamily: 'sans-serif',
                            }}>
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                />
                                Remember me
                            </label>

                            {/* Forgot password + Login button */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        style={{
                                            color: '#d0e8f8',
                                            fontSize: '13px',
                                            textDecoration: 'underline',
                                            fontFamily: 'sans-serif',
                                        }}
                                    >
                                        Forgot your password?
                                    </Link>
                                )}

                                <button
                                    type="submit"
                                    disabled={processing}
                                    style={{
                                        backgroundColor: '#e8edf2',
                                        color: '#2d4b5f',
                                        fontWeight: '700',
                                        fontSize: '13px',
                                        letterSpacing: '0.08em',
                                        padding: '10px 20px',
                                        borderRadius: '8px',
                                        border: 'none',
                                        cursor: processing ? 'not-allowed' : 'pointer',
                                        opacity: processing ? 0.7 : 1,
                                        fontFamily: 'sans-serif',
                                        textTransform: 'uppercase',
                                    }}
                                >
                                    LOG IN
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}