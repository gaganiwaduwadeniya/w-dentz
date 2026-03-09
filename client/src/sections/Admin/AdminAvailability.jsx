import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheck, FiX, FiSave, FiRefreshCw, FiArrowLeft } from 'react-icons/fi';
import { auth } from '../../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import './AdminAvailability.css';

const AdminAvailability = () => {
    const [availability, setAvailability] = useState({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    // SECURITY: Check authentication on component mount
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                // Not authenticated - redirect to login immediately
                window.location.href = '/admin/login';
                return;
            }
            setIsAuthenticated(true);
            fetchAvailability();
        });

        return () => unsubscribe();
    }, []);

    const fetchAvailability = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/availability`
            );

            if (response.ok) {
                const data = await response.json();
                const availabilityMap = {};
                data.forEach(item => {
                    availabilityMap[item.day] = item;
                });
                setAvailability(availabilityMap);
            } else {
                initializeDefaultAvailability();
            }
        } catch (error) {
            console.error('Error fetching availability:', error);
            initializeDefaultAvailability();
        } finally {
            setLoading(false);
        }
    };

    const initializeDefaultAvailability = () => {
        const defaultAvail = {};
        daysOfWeek.forEach(day => {
            defaultAvail[day] = {
                day,
                available: day !== 'Sunday',
                workingHours: '9:00 AM - 6:00 PM',
                date: '',
            };
        });
        setAvailability(defaultAvail);
    };

    const toggleDayAvailability = (day) => {
        setAvailability(prev => ({
            ...prev,
            [day]: {
                ...prev[day],
                available: !prev[day].available,
            },
        }));
    };

    const updateWorkingHours = (day, hours) => {
        setAvailability(prev => ({
            ...prev,
            [day]: {
                ...prev[day],
                workingHours: hours,
            },
        }));
    };

    const updateDate = (day, date) => {
        setAvailability(prev => ({
            ...prev,
            [day]: {
                ...prev[day],
                date: date,
            },
        }));
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            const availabilityArray = Object.values(availability);

            const response = await fetch(
                `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/availability`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${await getAuthToken()}`,
                    },
                    body: JSON.stringify(availabilityArray),
                }
            );

            if (response.ok) {
                setMessage({
                    type: 'success',
                    text: 'Availability updated successfully!',
                });
                setTimeout(() => setMessage({ type: '', text: '' }), 3000);
            } else {
                throw new Error('Failed to update availability');
            }
        } catch (error) {
            console.error('Error saving availability:', error);
            setMessage({
                type: 'error',
                text: 'Failed to save availability. Please try again.',
            });
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        } finally {
            setSaving(false);
        }
    };

    const getAuthToken = async () => {
        try {
            const token = await auth.currentUser?.getIdToken();
            return token || '';
        } catch (error) {
            console.error('Error getting auth token:', error);
            return '';
        }
    };

    const handleRefresh = () => {
        fetchAvailability();
    };

    if (loading) {
        return (
            <section className="admin-availability">
                <div className="admin-availability__header-bar">
                    <button 
                        className="back-btn"
                        onClick={() => navigate('/admin/dashboard')}
                        title="Back to Dashboard"
                    >
                        <FiArrowLeft /> Back
                    </button>
                    <h1 className="admin-availability__title">Doctor Availability Manager</h1>
                </div>
                <div className="admin-availability-container">
                    <div className="admin-availability-loading">Loading schedule...</div>
                </div>
            </section>
        );
    }

    return (
        <section className="admin-availability">
            <div className="admin-availability__header-bar">
                <button 
                    className="back-btn"
                    onClick={() => navigate('/admin/dashboard')}
                    title="Back to Dashboard"
                >
                    <FiArrowLeft /> Back
                </button>
                <h1 className="admin-availability__title">Doctor Availability Manager</h1>
            </div>

            <div className="admin-availability-container">
            {message.text && (
                <motion.div
                    className={`availability-message ${message.type}`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                >
                    {message.type === 'success' ? <FiCheck /> : <FiX />}
                    {message.text}
                </motion.div>
            )}

            <div className="availability-items">
                {daysOfWeek.map((day, index) => (
                    <motion.div
                        key={day}
                        className="availability-item"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                        <div className="item-day-column">
                            <span className="item-day">{day}</span>
                        </div>

                        <div className="item-toggle-column">
                            <button
                                className={`toggle-btn ${availability[day]?.available ? 'active' : ''}`}
                                onClick={() => toggleDayAvailability(day)}
                            >
                                {availability[day]?.available ? (
                                    <>
                                        <FiCheck /> Open
                                    </>
                                ) : (
                                    <>
                                        <FiX /> Closed
                                    </>
                                )}
                            </button>
                        </div>

                        {availability[day]?.available && (
                            <div className="item-hours-column">
                                <input
                                    type="date"
                                    className="date-input"
                                    value={availability[day]?.date || ''}
                                    onChange={(e) => updateDate(day, e.target.value)}
                                    placeholder="Optional: Specific date"
                                />
                                <input
                                    type="text"
                                    className="hours-input"
                                    value={availability[day]?.workingHours || ''}
                                    onChange={(e) => updateWorkingHours(day, e.target.value)}
                                    placeholder="e.g., 9:00 AM - 6:00 PM"
                                />
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>

            <button
                className="save-btn"
                onClick={handleSave}
                disabled={saving}
            >
                {saving ? (
                    <>
                        <FiRefreshCw className="spinner" /> Saving...
                    </>
                ) : (
                    <>
                        <FiSave /> Save Changes
                    </>
                )}
            </button>
            </div>
        </section>
    );
};

export default AdminAvailability;
