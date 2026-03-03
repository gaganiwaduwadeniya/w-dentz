import React from 'react';
import { motion } from 'framer-motion';
import { HiArrowRight, HiPlay } from 'react-icons/hi';
import { FiShield, FiAward, FiUsers } from 'react-icons/fi';
import './Hero.css';

const stats = [
    { icon: <FiUsers />, value: '15K+', label: 'Happy Patients' },
    { icon: <FiAward />, value: '20+', label: 'Years Experience' },
    { icon: <FiShield />, value: '99%', label: 'Success Rate' },
];

const Hero = () => {
    return (
        <section id="home" className="hero section">
            <div className="bg-grid" />

            {/* Ambient glow effects */}
            <div className="hero__glow hero__glow--1" />
            <div className="hero__glow hero__glow--2" />
            <div className="hero__glow hero__glow--3" />

            <div className="container hero__container">
                <div className="hero__content">
                    <motion.div
                        className="hero__badge"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="hero__badge-dot" />
                        Next-Gen Dental Care
                    </motion.div>

                    <motion.h1
                        className="hero__title"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Your Smile,{' '}
                        <span className="hero__title-gradient">Redefined</span>{' '}
                        by Technology
                    </motion.h1>

                    <motion.p
                        className="hero__description"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        Experience the future of dentistry at W Dentz. We combine
                        cutting-edge AI diagnostics, 3D imaging, and precision laser
                        treatments to deliver a dental experience unlike anything you've
                        ever known.
                    </motion.p>

                    <motion.div
                        className="hero__actions"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <a href="#contact" className="btn-primary">
                            Book Consultation <HiArrowRight />
                        </a>
                        <a href="#about" className="btn-secondary">
                            <HiPlay /> Watch How It Works
                        </a>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        className="hero__stats"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                    >
                        {stats.map((stat, index) => (
                            <div key={index} className="hero__stat">
                                <div className="hero__stat-icon">{stat.icon}</div>
                                <div className="hero__stat-info">
                                    <span className="hero__stat-value">{stat.value}</span>
                                    <span className="hero__stat-label">{stat.label}</span>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* 3D Tooth Visual */}
                <motion.div
                    className="hero__visual"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                >
                    <div className="hero__tooth-container">
                        <div className="hero__tooth-ring hero__tooth-ring--1" />
                        <div className="hero__tooth-ring hero__tooth-ring--2" />
                        <div className="hero__tooth-ring hero__tooth-ring--3" />
                        <svg className="hero__tooth-svg" viewBox="0 0 200 260" fill="none">
                            <defs>
                                <linearGradient id="toothGrad" x1="40" y1="10" x2="160" y2="250">
                                    <stop offset="0%" stopColor="#00e5ff" />
                                    <stop offset="50%" stopColor="#2979ff" />
                                    <stop offset="100%" stopColor="#7c4dff" />
                                </linearGradient>
                                <filter id="glow">
                                    <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                                    <feMerge>
                                        <feMergeNode in="coloredBlur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                            </defs>
                            <path
                                d="M100 20C70 20 50 45 50 80C50 115 60 135 72 160C84 185 90 220 100 240C110 220 116 185 128 160C140 135 150 115 150 80C150 45 130 20 100 20Z"
                                stroke="url(#toothGrad)"
                                strokeWidth="2.5"
                                fill="none"
                                filter="url(#glow)"
                            />
                            <path
                                d="M70 75C80 90 90 85 100 90C110 85 120 90 130 75"
                                stroke="url(#toothGrad)"
                                strokeWidth="1.5"
                                fill="none"
                                opacity="0.5"
                            />
                            {/* Scan lines */}
                            <line x1="55" y1="100" x2="145" y2="100" stroke="#00e5ff" strokeWidth="0.5" opacity="0.3" className="hero__scan-line" />
                            <line x1="60" y1="130" x2="140" y2="130" stroke="#00e5ff" strokeWidth="0.5" opacity="0.2" className="hero__scan-line" />
                            <line x1="70" y1="160" x2="130" y2="160" stroke="#00e5ff" strokeWidth="0.5" opacity="0.15" className="hero__scan-line" />
                            {/* Data points */}
                            <circle cx="75" cy="65" r="3" fill="#00e5ff" opacity="0.8" className="hero__data-point" />
                            <circle cx="125" cy="65" r="3" fill="#7c4dff" opacity="0.8" className="hero__data-point" />
                            <circle cx="100" cy="200" r="3" fill="#2979ff" opacity="0.8" className="hero__data-point" />
                        </svg>

                        {/* Floating data badges */}
                        <div className="hero__data-badge hero__data-badge--1">
                            <span className="hero__data-badge-dot hero__data-badge-dot--green" />
                            AI Scan: Clear
                        </div>
                        <div className="hero__data-badge hero__data-badge--2">
                            <span className="hero__data-badge-dot hero__data-badge-dot--blue" />
                            3D Mapped
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="hero__scroll"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <div className="hero__scroll-line" />
                <span>Scroll</span>
            </motion.div>
        </section>
    );
};

export default Hero;
