import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
    FiMapPin, FiPhone, FiMail, FiClock,
    FiSend, FiCheck, FiAlertCircle
} from 'react-icons/fi';
import axios from 'axios';
import './Contact.css';

const contactInfo = [
    {
        icon: <FiMapPin />,
        title: 'Visit Us',
        lines: ['123 Innovation Drive, Suite 500', 'San Francisco, CA 94107'],
    },
    {
        icon: <FiPhone />,
        title: 'Call Us',
        lines: ['+1 (555) 234-5678', '+1 (555) 876-5432'],
    },
    {
        icon: <FiMail />,
        title: 'Email Us',
        lines: ['info@wdentz.com', 'appointments@wdentz.com'],
    },
    {
        icon: <FiClock />,
        title: 'Working Hours',
        lines: ['Mon - Fri: 8:00 AM - 8:00 PM', 'Sat: 9:00 AM - 5:00 PM'],
    },
];

const Contact = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', service: '', message: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            const res = await axios.post('/api/contact', formData);
            setStatus({ type: 'success', message: res.data.message });
            setFormData({ name: '', email: '', phone: '', service: '', message: '' });
        } catch (err) {
            const msg = err.response?.data?.message || 'Something went wrong. Please try again.';
            setStatus({ type: 'error', message: msg });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="contact section">
            <div className="bg-grid" />
            <div className="contact__glow" />

            <div className="container" ref={ref}>
                <div className="contact__layout">
                    {/* Left: Header & Content */}
                    <div className="contact__left">
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="contact__header"
                        >
                            <span className="section-label">Contact Us</span>
                            <h2 className="section-title">
                                Let's Start Your<br />Smile Journey
                            </h2>
                            <p className="section-subtitle">
                                Ready to experience the future of dental care? Reach out to us and
                                our team will craft the perfect treatment plan for you.
                            </p>
                        </motion.div>

                        <div className="contact__info-grid">
                            {contactInfo.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                                    className="contact__info-card glass-card"
                                >
                                    <div className="contact__info-icon">{item.icon}</div>
                                    <div className="contact__info-content">
                                        <h4>{item.title}</h4>
                                        {item.lines.map((line, i) => (
                                            <p key={i}>{line}</p>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Form */}
                    <div className="contact__right">
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.7, delay: 0.4 }}
                        >
                        <form className="contact__form glass-card" onSubmit={handleSubmit}>
                            <h3 className="contact__form-title">Book Your Appointment</h3>
                            <div className="glow-divider" />

                            <div className="contact__form-grid">
                                <div className="contact__field">
                                    <label htmlFor="name">Full Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="contact__field">
                                    <label htmlFor="email">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="john@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="contact__field">
                                    <label htmlFor="phone">Phone Number</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        placeholder="+1 (555) 000-0000"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="contact__field">
                                    <label htmlFor="service">Select Service</label>
                                    <select
                                        id="service"
                                        name="service"
                                        value={formData.service}
                                        onChange={handleChange}
                                    >
                                        <option value="">Choose a service</option>
                                        <option value="ai-diagnosis">AI-Powered Diagnosis</option>
                                        <option value="whitening">Laser Teeth Whitening</option>
                                        <option value="smile-design">Digital Smile Design</option>
                                        <option value="implants">Robotic Implants</option>
                                        <option value="veneers">Cosmetic Veneers</option>
                                        <option value="orthodontics">Orthodontics & Aligners</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>

                            <div className="contact__field contact__field--full">
                                <label htmlFor="message">Your Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="5"
                                    placeholder="Tell us about your dental goals or concerns..."
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {status.message && (
                                <div className={`contact__status contact__status--${status.type}`}>
                                    {status.type === 'success' ? <FiCheck /> : <FiAlertCircle />}
                                    {status.message}
                                </div>
                            )}

                            <button type="submit" className="btn-primary contact__submit" disabled={loading}>
                                {loading ? (
                                    <span className="contact__spinner" />
                                ) : (
                                    <>Send Message <FiSend /></>
                                )}
                            </button>
                        </form>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
