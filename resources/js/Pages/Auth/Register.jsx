import { useEffect } from 'react';
import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    const inputStyle = {
        width: '100%',
        padding: '12px 14px',
        borderRadius: '8px',
        border: 'none',
        backgroundColor: '#ffffff',
        fontSize: '15px',
        outline: 'none',
        boxSizing: 'border-box',
    };

    const labelStyle = {
        display: 'block',
        color: '#ffffff',
        fontWeight: '700',
        fontSize: '15px',
        marginBottom: '8px',
        fontFamily: 'sans-serif',
    };

    return (
        <>
            <Head title="Register" />

            <div style={{
                minHeight: '100vh',
                width: '100%',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
            }}>
                {/* Blurred stretched background */}
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

                {/* Original image contain */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: 'url(/images/worker.jpg)',
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    zIndex: 1,
                }} />

                {/* Blue overlay */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(100, 150, 190, 0.45)',
                    zIndex: 2,
                }} />

                {/* Card */}
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
                    <form onSubmit={submit}>

                        {/* Name */}
                        <div style={{ marginBottom: '20px' }}>
                            <label htmlFor="name" style={labelStyle}>Name</label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                autoComplete="name"
                                autoFocus
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                style={inputStyle}
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        {/* Email */}
                        <div style={{ marginBottom: '20px' }}>
                            <label htmlFor="email" style={labelStyle}>Email</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                style={inputStyle}
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        {/* Password */}
                        <div style={{ marginBottom: '20px' }}>
                            <label htmlFor="password" style={labelStyle}>Password</label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                autoComplete="new-password"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                                style={inputStyle}
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        {/* Confirm Password */}
                        <div style={{ marginBottom: '24px' }}>
                            <label htmlFor="password_confirmation" style={labelStyle}>Confirm Password</label>
                            <input
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                autoComplete="new-password"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                required
                                style={inputStyle}
                            />
                            <InputError message={errors.password_confirmation} className="mt-2" />
                        </div>

                        {/* Footer */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            gap: '12px',
                        }}>
                            <Link
                                href={route('login')}
                                style={{
                                    color: '#d0e8f8',
                                    fontSize: '13px',
                                    textDecoration: 'underline',
                                    fontFamily: 'sans-serif',
                                }}
                            >
                                Already registered?
                            </Link>

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
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}