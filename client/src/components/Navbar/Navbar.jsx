import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineMenuAlt3, HiX } from 'react-icons/hi';
import './Navbar.css';

const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            // Detect active section
            const sections = navLinks.map(l => l.href.slice(1));
            for (let i = sections.length - 1; i >= 0; i--) {
                const el = document.getElementById(sections[i]);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= 150) {
                        setActiveSection(sections[i]);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (href) => {
        setMenuOpen(false);
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
    <>
        <motion.nav
            className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
            <div className="navbar__container container">
                {/* Logo */}
                <a href="#home" className="navbar__logo" onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}>
                    <div className="navbar__logo-icon">
                        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                            <path d="M18 3C12 3 9 8 9 13C9 18 11 21 13 25C15 29 16 33 18 33C20 33 21 29 23 25C25 21 27 18 27 13C27 8 24 3 18 3Z" stroke="url(#grad)" strokeWidth="2" fill="none" />
                            <defs>
                                <linearGradient id="grad" x1="9" y1="3" x2="27" y2="33">
                                    <stop offset="0%" stopColor="#00e5ff" />
                                    <stop offset="100%" stopColor="#7c4dff" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <span className="navbar__logo-text">
                        W <span className="navbar__logo-highlight">Dentz</span>
                    </span>
                </a>

                {/* Desktop nav */}
                <ul className="navbar__links">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <a
                                href={link.href}
                                className={`navbar__link ${activeSection === link.href.slice(1) ? 'navbar__link--active' : ''}`}
                                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                            >
                                {link.name}
                                {activeSection === link.href.slice(1) && (
                                    <motion.div className="navbar__link-indicator" layoutId="activeIndicator" />
                                )}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* CTA Button - Highlighted on right */}
                <a
                    href="#appointments"
                    className="navbar__cta btn-primary"
                    onClick={(e) => { e.preventDefault(); handleNavClick('#appointments'); }}
                >
                    Book Appointment
                </a>

                {/* Mobile toggle */}
                <button className="navbar__toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
                    {menuOpen ? <HiX size={28} /> : <HiOutlineMenuAlt3 size={28} />}
                </button>
            </div>
        </motion.nav>

        {/* Mobile menu - rendered outside motion.nav to avoid transform containing block breaking position:fixed */}
        <AnimatePresence>
            {menuOpen && (
                <motion.div
                    className="navbar__mobile"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {navLinks.map((link, index) => (
                        <motion.a
                            key={link.name}
                            href={link.href}
                            className="navbar__mobile-link"
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                        >
                            {link.name}
                        </motion.a>
                    ))}
                    <a
                        href="#appointments"
                        className="btn-primary"
                        style={{ marginTop: '16px', width: '100%', justifyContent: 'center' }}
                        onClick={(e) => { e.preventDefault(); handleNavClick('#appointments'); }}
                    >
                        Book Appointment
                    </a>
                </motion.div>
            )}
        </AnimatePresence>
    </>
    );
};

export default Navbar;
