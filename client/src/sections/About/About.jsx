import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './About.css';

const galleryImages = [
    {
        id: 1,
        title: 'Modern Clinic',
        url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&h=500&fit=crop',
    },
    {
        id: 2,
        title: 'Advanced Equipment',
        url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&h=500&fit=crop',
    },
    {
        id: 3,
        title: 'Treatment Room',
        url: 'https://images.unsplash.com/photo-1642909127882-f67fba0c4c18?w=500&h=500&fit=crop',
    },
    {
        id: 4,
        title: 'Expert Team',
        url: 'https://images.unsplash.com/photo-1631217314831-c02b2e9de096?w=500&h=500&fit=crop',
    },
];

const About = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="about" className="about section">
            <div className="bg-grid" />
            <div className="about__glow" />

            <div className="container" ref={ref}>
                <div className="about__header">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7 }}
                    >
                        <span className="section-label">About Us</span>
                        <div className="about__title-year">
                            <h2 className="section-title">
                                Where Innovation Meets<br />Dental Excellence
                            </h2>
                            <div className="about__year-badge">
                                <span className="about__year-number">2005</span>
                                <span className="about__year-text">Est.</span>
                            </div>
                        </div>
                        <p className="section-subtitle">
                            Founded in 2005, W Dentz has been pioneering the fusion of
                            advanced technology and compassionate dental care for over two
                            decades. We don't just treat teeth — we engineer smiles.
                        </p>
                    </motion.div>
                </div>

                <div className="about__content">
                    {/* Image Gallery */}
                    <motion.div
                        className="about__gallery"
                        initial={{ opacity: 0, y: 50 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="about__gallery-grid">
                            {galleryImages.map((image, index) => (
                                <motion.div
                                    key={image.id}
                                    className="about__gallery-item"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <img src={image.url} alt={image.title} />
                                    <div className="about__gallery-overlay">
                                        <p>{image.title}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Trust Strip */}
                <motion.div
                    className="about__trust"
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <div className="about__trust-item">
                        <span className="about__trust-number">25+</span>
                        <span className="about__trust-label">Expert Doctors</span>
                    </div>
                    <div className="about__trust-divider" />
                    <div className="about__trust-item">
                        <span className="about__trust-number">50K+</span>
                        <span className="about__trust-label">Procedures Done</span>
                    </div>
                    <div className="about__trust-divider" />
                    <div className="about__trust-item">
                        <span className="about__trust-number">12</span>
                        <span className="about__trust-label">Awards Won</span>
                    </div>
                    <div className="about__trust-divider" />
                    <div className="about__trust-item">
                        <span className="about__trust-number">3</span>
                        <span className="about__trust-label">Locations</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
