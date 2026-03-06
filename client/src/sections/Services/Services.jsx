import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
    FiStar, FiSun, FiGrid, FiActivity,
    FiSmile, FiArrowUpRight, FiTool, FiZap
} from 'react-icons/fi';
import { HiOutlineSparkles } from 'react-icons/hi';
import { RiSurgicalMaskLine } from 'react-icons/ri';
import './Services.css';

const services = [
    {
        icon: <FiTool />,
        title: 'Restorations (Dental fillings)',
        description: 'Durable and natural-looking fillings that repair cavities and restore damaged teeth, bringing back full function and a healthy smile.',
        tag: 'Most Popular',
        color: '#e040fb',
        tagColor: '#00e5ff',
    },
    {
        icon: <FiStar />,
        title: 'Dental Extractions',
        description: 'Safe and gentle removal of damaged, decayed, or problematic teeth to relieve pain and protect your overall oral health.',
        tag: null,
        color: '#00e5ff',
    },
    {
        icon: <FiSun />,
        title: 'Crown and Bridges',
        description: 'Custom-crafted crowns and bridges that restore the strength, appearance, and function of missing or damaged teeth for a seamless smile.',
        tag: null,
        color: '#2979ff',
    },
    {
        icon: <FiGrid />,
        title: 'Root Canal Treatment',
        description: 'A pain-relieving procedure that removes infected pulp from inside the tooth, saving your natural tooth while eliminating discomfort.',
        tag: null,
        color: '#7c4dff',
    },
    {
        icon: <FiActivity />,
        title: 'Dental Scaling',
        description: 'A professional deep-cleaning treatment that removes plaque and tartar buildup from teeth and gumlines, keeping gum disease at bay.',
        tag: null,
        color: '#1de9b6',
    },
    {
        icon: <HiOutlineSparkles />,
        title: 'Dentures',
        description: 'Comfortable, natural-looking removable dentures crafted to replace missing teeth and restore your confidence in eating and smiling.',
        tag: null,
        color: '#ff6d00',
    },
    {
        icon: <RiSurgicalMaskLine />,
        title: 'Minor Oral Surgeries',
        description: 'Minimally invasive surgical procedures performed with precision and care to address a range of oral conditions in a safe clinical setting.',
        tag: null,
        color: '#ff1744',
    },
    {
        icon: <FiZap />,
        title: 'Teeth Whitening',
        description: 'A safe and effective professional whitening treatment that removes stains and discoloration, leaving you with a brighter, more radiant smile.',
        tag: 'New',
        color: '#00bfa5',
        tagColor: '#ff6d00',
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
                            <span className="services__card-tag" style={{ background: `${service.tagColor || service.color}20`, color: service.tagColor || service.color, borderColor: `${service.tagColor || service.color}40` }}>
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
