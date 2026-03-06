import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaGraduationCap, FaTrophy, FaCertificate, FaStethoscope } from 'react-icons/fa';
import './About.css';
import machine from '../../assets/images/machine.jpg';
import brush from '../../assets/images/brush.jpg';
import treatment from '../../assets/images/tooth.jpg';
import team from '../../assets/images/doctor.jpg';

const galleryImages = [
    {
        id: 1,
        title: 'Advanced Equipment',
        url: machine,
    },
    {
        id: 2,
        title: 'Oral Wellness',
        url: brush,
    },
    {
        id: 3,
        title: 'Clinical Excellence',
        url: treatment,
    },
    {
        id: 4,
        title: 'Expert Doctors',
        url: team,
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
                                Beyond Dentistry <br />A Standard of Excellence
                            </h2>
                            <div className="about__year-badge">
                                <span className="about__year-number">2023</span>
                                <span className="about__year-text">Est.</span>
                            </div>
                        </div>
                        <p className="section-subtitle">
                        Founded in 2023,W Dentz is committed to providing top-notch care 
                        in a warm and welcoming environment. We prioritize patient 
                        safety and satisfaction, and our team works diligently to 
                        ensure your dental experience is as comfortable as possible.
                        If you are experiencing dental pain, discomfort, or any other 
                        dental issues that might require a tooth extraction, or any 
                        other related services don't hesitate to schedule an appointment 
                        with us. We are here to restore your oral health and keep your 
                        smile shining bright.
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

                {/* Doctor Credentials Strip */}
                <motion.div
                    className="about__doctor-credentials"
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <div className="about__doctor-header">
                        <h3>Meet Your Dentist</h3>
                    </div>
                    
                    <div className="about__credentials-grid">
                        <div className="about__credential-item">
                            <div className="about__credential-icon">
                                <FaStethoscope />
                            </div>
                            <span className="about__credential-title">Dr. Sammani Pathiranage</span>
                            <span className="about__credential-subtitle">SLMC Reg no : 3291</span>
                        </div>
                        
                        <div className="about__credential-item">
                            <div className="about__credential-icon">
                                <FaGraduationCap />
                            </div>
                            <span className="about__credential-title">Bachelor of Dental Surgery</span>
                            <span className="about__credential-subtitle">University of Peradeniya</span>
                        </div>
                        
                        <div className="about__credential-item">
                            <div className="about__credential-icon">
                                <FaTrophy />
                            </div>
                            <span className="about__credential-title">5+ Years</span>
                            <span className="about__credential-subtitle">Clinical Experience</span>
                        </div>
                        
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
