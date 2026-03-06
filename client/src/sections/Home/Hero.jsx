import React from 'react';
import { motion } from 'framer-motion';
import { HiArrowRight, HiPlay } from 'react-icons/hi';
import { FaFacebook, FaTiktok } from 'react-icons/fa';
import './Hero.css';

const socialLinks = [
    {
        id: 1,
        name: 'Facebook',
        icon: <FaFacebook />,
        url: 'https://facebook.com/wdentz',
    },
    {
        id: 2,
        name: 'TikTok',
        icon: <FaTiktok />,
        url: 'https://tiktok.com/@wdentz',
    },
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
                        Smile{' '}
                        <span className="hero__title-gradient">Forever</span>{' '}
                        
                    </motion.h1>

                    <motion.p
                        className="hero__description"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                    Your smile is our greatest achievement. 
                    At W Dentz, we blend advanced dental science 
                    with a genuine passion for patient 
                    care — creating an experience that 
                    goes beyond the ordinary. Because you 
                    deserve a smile that speaks before you even say a word.
                    </motion.p>

                    <motion.div
                        className="hero__actions"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <p className="hero__consultation-text">Don't know what your teeth need? Let's figure it out together.</p>
                        <a href="#appointments" className="btn-primary">
                            Book Consultation <HiArrowRight />
                        </a>
                       {/* <a href="#about" className="btn-secondary">
                            <HiPlay /> Watch How It Works
                        </a> */}
                    </motion.div>

                    {/* Social Media Links */}
                    <motion.div
                        className="hero__social"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                    >
                        {socialLinks.map((social, index) => (
                            <a
                                key={social.id}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hero__social-link"
                                title={social.name}
                                style={{
                                    transitionDelay: `${index * 0.1}s`,
                                }}
                            >
                                {social.icon}
                            </a>
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

                        {/* Floating AI particles */}
                        <div className="hero__particles">
                            <div className="hero__particle hero__particle--1" />
                            <div className="hero__particle hero__particle--2" />
                            <div className="hero__particle hero__particle--3" />
                            <div className="hero__particle hero__particle--4" />
                            <div className="hero__particle hero__particle--5" />
                        </div>

                        {/* DNA Helix */}
                        <svg className="hero__dna-helix" viewBox="0 0 100 200" fill="none">
                            <defs>
                                <linearGradient id="dnaGrad" x1="0" y1="0" x2="100" y2="200">
                                    <stop offset="0%" stopColor="#00e5ff" />
                                    <stop offset="100%" stopColor="#7c4dff" />
                                </linearGradient>
                            </defs>
                            {/* Helix strands */}
                            <path d="M 50 10 Q 70 30 50 50 Q 30 70 50 90 Q 70 110 50 130 Q 30 150 50 170" stroke="url(#dnaGrad)" strokeWidth="1.5" opacity="0.6" />
                            <path d="M 50 10 Q 30 30 50 50 Q 70 70 50 90 Q 30 110 50 130 Q 70 150 50 170" stroke="url(#dnaGrad)" strokeWidth="1.5" opacity="0.6" />
                            {/* Connection nodes */}
                            <circle cx="50" cy="30" r="2" fill="#00e5ff" opacity="0.7" />
                            <circle cx="50" cy="70" r="2" fill="#2979ff" opacity="0.7" />
                            <circle cx="50" cy="110" r="2" fill="#7c4dff" opacity="0.7" />
                            <circle cx="50" cy="150" r="2" fill="#00e5ff" opacity="0.7" />
                        </svg>

                        {/* Tech grid overlay */}
                        <div className="hero__tech-grid">
                            <svg viewBox="0 0 100 100" fill="none">
                                <line x1="25" y1="0" x2="25" y2="100" stroke="#00e5ff" strokeWidth="0.5" opacity="0.15" />
                                <line x1="50" y1="0" x2="50" y2="100" stroke="#00e5ff" strokeWidth="0.5" opacity="0.15" />
                                <line x1="75" y1="0" x2="75" y2="100" stroke="#00e5ff" strokeWidth="0.5" opacity="0.15" />
                                <line x1="0" y1="25" x2="100" y2="25" stroke="#00e5ff" strokeWidth="0.5" opacity="0.15" />
                                <line x1="0" y1="50" x2="100" y2="50" stroke="#00e5ff" strokeWidth="0.5" opacity="0.15" />
                                <line x1="0" y1="75" x2="100" y2="75" stroke="#00e5ff" strokeWidth="0.5" opacity="0.15" />
                                <circle cx="25" cy="25" r="1" fill="#2979ff" opacity="0.4" />
                                <circle cx="75" cy="75" r="1" fill="#7c4dff" opacity="0.4" />
                            </svg>
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
