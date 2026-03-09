import React, { useState, useRef, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import {
    FiSend, FiCheck, FiAlertCircle, FiChevronLeft, FiChevronRight
} from 'react-icons/fi';
import axios from 'axios';
import DoctorAvailability from '../../components/DoctorAvailability/DoctorAvailability';
import './BookAppointment.css';

const BookAppointment = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        message: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleDateSelect = (day) => {
        const year = currentMonth.getFullYear();
        const month = String(currentMonth.getMonth() + 1).padStart(2, '0');
        const dayStr = String(day).padStart(2, '0');
        const selectedDate = `${year}-${month}-${dayStr}`;
        setFormData({ ...formData, date: selectedDate });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const res = await axios.post(`${apiUrl}/api/contact`, formData);
            setStatus({ type: 'success', message: res.data.message });
            setFormData({ name: '', email: '', phone: '', date: '', time: '', message: '' });
        } catch (err) {
            const msg = err.response?.data?.message || 'Something went wrong. Please try again.';
            setStatus({ type: 'error', message: msg });
        } finally {
            setLoading(false);
        }
    };

    // Calendar generation
    const daysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const firstDayOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const calendarDays = useMemo(() => {
        const days = [];
        const firstDay = firstDayOfMonth(currentMonth);
        const totalDays = daysInMonth(currentMonth);

        // Empty cells for days before month starts
        for (let i = 0; i < firstDay; i++) {
            days.push(null);
        }

        // Days of the month
        for (let day = 1; day <= totalDays; day++) {
            days.push(day);
        }

        return days;
    }, [currentMonth]);

    const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });

    const prevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    };

    const nextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    };

    const isDateSelected = (day) => {
        if (!day || !formData.date) return false;
        const year = currentMonth.getFullYear();
        const month = String(currentMonth.getMonth() + 1).padStart(2, '0');
        const dayStr = String(day).padStart(2, '0');
        return formData.date === `${year}-${month}-${dayStr}`;
    };

    const isDateInPast = (day) => {
        if (!day) return false;
        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today;
    };

    return (
        <section id="appointments" className="book-appointment section">
            <div className="bg-grid" />
            <div className="book-appointment__glow" />

            <div className="container" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="book-appointment__header"
                >
                    <span className="section-label">Book Your Appointment</span>
                    <h2 className="section-title">
                        Schedule Your<br />Perfect Visit
                    </h2>
                    <p className="section-subtitle">
                        Choose your preferred date and time, and we'll confirm your appointment instantly.
                        Our team looks forward to giving you the smile you deserve.
                    </p>
                </motion.div>

                {/* Availability Above Layout */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="book-appointment__availability-wrapper"
                >
                    <DoctorAvailability />
                </motion.div>

                <div className="book-appointment__layout">
                    {/* Left: Calendar */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="book-appointment__calendar-wrapper"
                    >
                        <div className="calendar-card glass-card">
                            <div className="calendar-header">
                                <h3>Select Date</h3>
                                <p className="selected-date">
                                    {formData.date ? new Date(formData.date).toLocaleDateString('en-US', { 
                                        year: 'numeric', 
                                        month: 'long', 
                                        day: 'numeric' 
                                    }) : 'No date selected'}
                                </p>
                            </div>

                            <div className="calendar-wrapper">
                                <div className="calendar-nav">
                                    <button onClick={prevMonth} className="nav-btn" title="Previous month">
                                        <FiChevronLeft />
                                    </button>
                                    <h4>{monthName}</h4>
                                    <button onClick={nextMonth} className="nav-btn" title="Next month">
                                        <FiChevronRight />
                                    </button>
                                </div>

                                <div className="calendar-weekdays">
                                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                        <div key={day} className="weekday">{day}</div>
                                    ))}
                                </div>

                                <div className="calendar-days">
                                    {calendarDays.map((day, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => day && !isDateInPast(day) && handleDateSelect(day)}
                                            className={`calendar-day ${!day ? 'empty' : ''} ${isDateInPast(day) ? 'past' : ''} ${isDateSelected(day) ? 'selected' : ''}`}
                                            disabled={!day || isDateInPast(day)}
                                        >
                                            {day}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="calendar-info">
                                <p>📅 Click on a date to select your preferred appointment day</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="book-appointment__form-wrapper"
                    >
                        <form className="book-appointment__form glass-card" onSubmit={handleSubmit}>
                            <h3 className="form-title">Your Details</h3>
                            <div className="glow-divider" />

                            <div className="form-grid">
                                <div className="form-field">
                                    <label htmlFor="name">Full Name *</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Your Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-field">
                                    <label htmlFor="email">Email Address *</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="youremail@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-field">
                                    <label htmlFor="phone">Phone Number</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        placeholder="+94 00 000 0000"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-field">
                                    <label htmlFor="time">Preferred Time *</label>
                                    <select
                                        id="time"
                                        name="time"
                                        value={formData.time}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="05:00">5:00 PM</option>
                                        <option value="05:30">5:30 PM</option>
                                        <option value="06:00">6:00 PM</option>
                                        <option value="06:30">6:30 PM</option>
                                        <option value="07:00">7:00 PM</option>
                                        <option value="07:30">7:30 PM</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-field form-field--full">
                                <label htmlFor="message">Any Special Notes?</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="2"
                                    placeholder="Tell us about any concerns or preferences..."
                                    value={formData.message}
                                    onChange={handleChange}
                                />
                            </div>

                            {status.message && (
                                <div className={`form-status form-status--${status.type}`}>
                                    {status.type === 'success' ? <FiCheck /> : <FiAlertCircle />}
                                    {status.message}
                                </div>
                            )}

                            <button type="submit" className="btn-primary form-submit" disabled={loading}>
                                {loading ? (
                                    <span className="form-spinner" />
                                ) : (
                                    <>Book Appointment <FiSend /></>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default BookAppointment;
