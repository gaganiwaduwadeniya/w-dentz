import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
    FiStar, FiSun, FiGrid, FiActivity,
    FiSmile, FiArrowUpRight
} from 'react-icons/fi';
import { HiOutlineSparkles } from 'react-icons/hi';
import { RiSurgicalMaskLine } from 'react-icons/ri';
import './Services.css';

const services = [
    {
        icon: <FiStar />,
        title: 'AI-Powered Diagnosis',
        description: 'Our advanced neural networks analyze dental imaging to detect cavities, fractures, and abnormalities with unprecedented accuracy.',
        tag: 'Most Popular',
        color: '#00e5ff',
    },
    {
        icon: <FiSun />,
        title: 'Laser Teeth Whitening',
        description: 'Professional-grade laser whitening that delivers up to 8 shades brighter in a single session — painless and long-lasting.',
        tag: null,
        color: '#2979ff',
    },
    {
        icon: <FiGrid />,
        title: 'Digital Smile Design',
        description: 'Preview your perfect smile with our 3D visualization technology before any treatment begins. Plan with confidence.',
        tag: 'New',
        color: '#7c4dff',
    },
    {
        icon: <FiActivity />,
        title: 'Robotic Implants',
        description: 'Computer-guided implant placement for precision down to 0.1mm. Faster healing, perfect positioning, guaranteed results.',
        tag: null,
        color: '#1de9b6',
    },
    {
        icon: <HiOutlineSparkles />,
        title: 'Cosmetic Veneers',
        description: 'Ultra-thin porcelain veneers crafted with CAD/CAM technology for a flawless, natural-looking transformation.',
        tag: null,
        color: '#ff6d00',
    },
    {
        icon: <FiSmile />,
        title: 'Orthodontics & Aligners',
        description: 'Invisible aligners designed using AI biomechanics for faster, more comfortable teeth straightening.',
        tag: null,
        color: '#e040fb',
    },
];

const Services = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="services" className="services section">
            <div className="bg-grid" />
            <div className="services__glow services__glow--1" />
            <div className="services__glow services__glow--2" />

            <div className="container" ref={ref}>
                <div className="services__header">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7 }}
                    >
                        <span className="section-label">Our Services</span>
                        <h2 className="section-title">
                            Advanced Treatments,<br />Exceptional Results
                        </h2>
                        <p className="section-subtitle">
                            From routine checkups to complex restorative procedures, every
                            service at W Dentz is powered by the latest in dental technology.
                        </p>
                    </motion.div>
                </div>

                <div className="services__grid">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            className="services__card glass-card"
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            {service.tag && (
                                <span className="services__card-tag" style={{ background: `${service.color}20`, color: service.color, borderColor: `${service.color}40` }}>
                                    {service.tag}
                                </span>
                            )}

                            <div className="services__card-icon" style={{ color: service.color, background: `${service.color}10`, borderColor: `${service.color}25` }}>
                                {service.icon}
                            </div>

                            <h3 className="services__card-title">{service.title}</h3>
                            <p className="services__card-desc">{service.description}</p>

                            <div className="services__card-footer">
                                <div className="services__card-glow" style={{ background: service.color }} />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA Banner */}
                <motion.div
                    className="services__cta"
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <div className="services__cta-content">
                        <h3>Not sure which treatment is right for you?</h3>
                        <p>Our AI-powered assessment tool can help recommend the best treatment plan for your unique needs.</p>
                    </div>
                    <a href="#contact" className="btn-primary">
                        Get Free Assessment <FiArrowUpRight />
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default Services;
