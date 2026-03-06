import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiX, FiClock } from 'react-icons/fi';
import './DoctorAvailability.css';

const DoctorAvailability = () => {
    const [availability, setAvailability] = useState({});
    const [loading, setLoading] = useState(true);

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    useEffect(() => {
        fetchAvailability();
    }, []);

    const fetchAvailability = async () => {
        try {
            // Fetch from backend
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
                // Set default availability if not found
                setDefaultAvailability();
            }
        } catch (error) {
            console.error('Error fetching availability:', error);
            setDefaultAvailability();
        } finally {
            setLoading(false);
        }
    };

    const setDefaultAvailability = () => {
        const defaultAvail = {};
        daysOfWeek.forEach(day => {
            defaultAvail[day] = {
                day,
                available: day !== 'Sunday',
                workingHours: '9:00 AM - 6:00 PM',
            };
        });
        setAvailability(defaultAvail);
    };

    if (loading) {
        return (
            <div className="availability-container">
                <div className="availability-loading">Loading schedule...</div>
            </div>
        );
    }

    return (
        <div className="availability-container">
            <div className="availability-header">
                <h3>Doctor's Availability</h3>
                <p>Check our weekly schedule</p>
            </div>

            <div className="availability-grid">
                {daysOfWeek.map((day, index) => {
                    const dayAvail = availability[day] || { available: false };
                    return (
                        <motion.div
                            key={day}
                            className={`availability-card ${dayAvail.available ? 'available' : 'unavailable'}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                        >
                            <div className="availability-day">{day}</div>
                            
                            <div className="availability-status">
                                {dayAvail.available ? (
                                    <>
                                        <FiCheck className="status-icon available-icon" />
                                        <span className="status-text">Available</span>
                                    </>
                                ) : (
                                    <>
                                        <FiX className="status-icon unavailable-icon" />
                                        <span className="status-text">Closed</span>
                                    </>
                                )}
                            </div>

                            {dayAvail.available && dayAvail.workingHours && (
                                <div className="availability-hours">
                                    <FiClock className="hours-icon" />
                                    <span>{dayAvail.workingHours}</span>
                                </div>
                            )}
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default DoctorAvailability;
