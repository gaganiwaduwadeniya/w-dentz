import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
    FiMapPin, FiPhone, FiMail, FiClock
} from 'react-icons/fi';
import './Contact.css';

const contactInfo = [
    {
        icon: <FiMapPin />,
        title: 'Visit Us',
        lines: ['W Dentz, Princess Park, Malimbada, Matara'],
    },
    {
        icon: <FiPhone />,
        title: 'Call Us',
        lines: ['+94 70 704 7070'],
    },
    {
        icon: <FiMail />,
        title: 'Email Us',
        lines: ['www.wdentz@gmail.com'],
    },
    {
        icon: <FiClock />,
        title: 'Working Hours',
        lines: ['Mon - Sun: 5:00 PM - 7:30 PM', 'Closed on Public Holidays'],
    },
];

const Contact = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="contact" className="contact section">
            <div className="bg-grid" />
            <div className="contact__glow" />

            <div className="container" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="contact__header"
                >
                    <span className="section-label">Contact Info</span>
                    <h2 className="section-title">
                        Get In Touch<br />With Us
                    </h2>
                    <p className="section-subtitle">
                        Have questions? We'd love to hear from you. Reach out through any of these
                        channels and our team will respond as quickly as possible.
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
        </section>
    );
};

export default Contact;
