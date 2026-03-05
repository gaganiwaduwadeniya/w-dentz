import React, { useEffect, useState } from 'react';
import { auth } from '../../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

/**
 * ProtectedRoute component - wraps admin routes
 * Checks if user is authenticated before allowing access
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
                window.location.href = '/admin/login';
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                background: 'var(--color-bg-primary)',
                color: 'var(--color-accent-cyan)',
                fontSize: '1.2rem',
            }}>
                Loading...
            </div>
        );
    }

    return isAuthenticated ? <Component /> : null;
};

export default ProtectedRoute;
