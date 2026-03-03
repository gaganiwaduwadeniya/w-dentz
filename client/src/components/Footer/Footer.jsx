import React from 'react';
import { FiInstagram, FiTwitter, FiFacebook, FiLinkedin, FiArrowUp } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="footer">
            <div className="footer__glow" />
            <div className="container">
                <div className="footer__grid">
                    {/* Brand */}
                    <div className="footer__brand">
                        <div className="footer__logo">
                            <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
                                <path d="M18 3C12 3 9 8 9 13C9 18 11 21 13 25C15 29 16 33 18 33C20 33 21 29 23 25C25 21 27 18 27 13C27 8 24 3 18 3Z" stroke="url(#footerGrad)" strokeWidth="2" fill="none" />
                                <defs>
                                    <linearGradient id="footerGrad" x1="9" y1="3" x2="27" y2="33">
                                        <stop offset="0%" stopColor="#00e5ff" />
                                        <stop offset="100%" stopColor="#7c4dff" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <span>W <span className="footer__logo-highlight">Dentz</span></span>
                        </div>
                        <p className="footer__tagline">
                            Redefining dental care with cutting-edge technology.
                            Your smile is our innovation.
                        </p>
                        <div className="footer__social">
                            <a href="#" className="footer__social-link" aria-label="Instagram"><FiInstagram /></a>
                            <a href="#" className="footer__social-link" aria-label="Twitter"><FiTwitter /></a>
                            <a href="#" className="footer__social-link" aria-label="Facebook"><FiFacebook /></a>
                            <a href="#" className="footer__social-link" aria-label="LinkedIn"><FiLinkedin /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer__col">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><a href="#home">Home</a></li>
                            <li><a href="#about">About Us</a></li>
                            <li><a href="#services">Services</a></li>
                            <li><a href="#contact">Contact</a></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div className="footer__col">
                        <h4>Services</h4>
                        <ul>
                            <li><a href="#services">AI Diagnosis</a></li>
                            <li><a href="#services">Laser Whitening</a></li>
                            <li><a href="#services">Digital Smile Design</a></li>
                            <li><a href="#services">Robotic Implants</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="footer__col">
                        <h4>Contact</h4>
                        <ul>
                            <li>123 Innovation Drive</li>
                            <li>San Francisco, CA 94107</li>
                            <li>+1 (555) 234-5678</li>
                            <li>info@wdentz.com</li>
                        </ul>
                    </div>
                </div>

                <div className="footer__bottom">
                    <p>&copy; {new Date().getFullYear()} W Dentz Dental. All rights reserved.</p>
                    <button className="footer__scroll-top" onClick={scrollToTop} aria-label="Scroll to top">
                        <FiArrowUp />
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
