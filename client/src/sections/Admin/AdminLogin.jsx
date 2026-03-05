import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import './AdminLogin.css';

const AdminLogin = () => {
    console.log('AdminLogin component loaded');
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            // Redirect to admin dashboard using React Router
            navigate('/admin/dashboard');
        } catch (err) {
            setError(err.message || 'Failed to login');
            console.error('Login error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="admin-login section">
            <div className="bg-grid" />
            <div className="admin-login__glow" />

            <div className="admin-login__container">
                <div className="admin-login__card glass-card">
                    <div className="admin-login__header">
                        <h1 className="admin-login__title">W Dentz Admin</h1>
                        <p className="admin-login__subtitle">Staff Portal</p>
                    </div>

                    <form onSubmit={handleLogin} className="admin-login__form">
                        <div className="admin-login__field">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@wdentz.com"
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="admin-login__field">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                                disabled={loading}
                            />
                        </div>

                        {error && (
                            <div className="admin-login__error">
                                <p>{error}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="btn-primary admin-login__submit"
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>

                    <div className="admin-login__footer">
                        <p>W Dentz © 2005-2026 | All Rights Reserved</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AdminLogin;
