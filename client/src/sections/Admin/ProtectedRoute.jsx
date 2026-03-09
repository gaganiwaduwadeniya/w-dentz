import React, { useEffect, useState } from 'react';
import { auth } from '../../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

/**
 * ProtectedRoute component - wraps admin routes
 * Checks if user is authenticated before allowing access
 * SECURITY: Prevents unauthorized access to admin pages
 */
const ProtectedRoute = ({ component: Component }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
                // Redirect to login page immediately
                window.location.href = '/admin/login';
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Show loading screen while checking authentication
    if (loading) {
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                background: 'linear-gradient(135deg, #050d27 0%, #0f1b3f 100%)',
                color: 'var(--color-accent-cyan)',
                fontSize: '1.2rem',
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1rem',
                }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        border: '3px solid var(--color-accent-cyan)',
                        borderTop: '3px solid transparent',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                    }} />
                    <p>Verifying credentials...</p>
                </div>
                <style>{`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
            </div>
        );
    }

    // Only render component if authenticated
    // If not authenticated, redirect already happened in the useEffect
    return isAuthenticated ? <Component /> : null;
};

export default ProtectedRoute;
