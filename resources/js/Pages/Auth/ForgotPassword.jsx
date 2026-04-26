import InputError from '@/Components/InputError';
import { Head, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <>
            <Head title="Forgot Password" />

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

                {/* Original image contain on top */}
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
                    {/* Description */}
                    <p style={{
                        color: '#d0e8f8',
                        fontSize: '14px',
                        marginBottom: '24px',
                        lineHeight: '1.6',
                        fontFamily: 'sans-serif',
                    }}>
                        Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.
                    </p>

                    {status && (
                        <div style={{ marginBottom: '16px', fontSize: '14px', color: '#4ade80', fontFamily: 'sans-serif' }}>
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit}>
                        {/* Email */}
                        <div style={{ marginBottom: '20px' }}>
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

                        {/* Submit button */}
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
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
                                Email Password Reset Link
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}