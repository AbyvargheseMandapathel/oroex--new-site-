import React, { useEffect, useRef, useState } from 'react';
import './ServicesFour.css';
import servicesData from '../../data/services.json';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    Wrench,
    Settings,
    Globe,
    Anchor,
    Cpu,
    Sun,
    ArrowRight
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
    Installation: Wrench,
    Maintenance: Settings,
    OnshoreOffshore: Globe,
    OffshoreSolutions: Anchor,
    Assembly: Cpu,
    SolarSolutions: Sun,
};

const ServicesFour = () => {
    const containerRef = useRef(null);
    const leftColRef = useRef(null);
    const rightColRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const container = containerRef.current;
        const rightCol = rightColRef.current;
        const serviceItems = gsap.utils.toArray('.service-four-item');

        ScrollTrigger.create({
            trigger: container,
            start: 'top top',
            end: 'bottom bottom',
            pin: leftColRef.current,
            pinSpacing: false, // Important for split layout
        });

        serviceItems.forEach((item, index) => {
            ScrollTrigger.create({
                trigger: item,
                start: 'top center',
                end: 'bottom center',
                onEnter: () => setActiveIndex(index),
                onEnterBack: () => setActiveIndex(index),
            });
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    const activeService = servicesData[activeIndex];
    const ActiveIcon = iconMap[activeService.icon];

    return (
        <section className="services-four-section" ref={containerRef}>
            <div className="services-four-container">

                {/* Left Column - Sticky Visuals */}
                <div className="services-four-left" ref={leftColRef}>
                    <div className="visual-container">
                        {servicesData.map((service, index) => (
                            <div
                                key={service.id}
                                className={`visual-item ${index === activeIndex ? 'active' : ''}`}
                            >
                                <video
                                    src={service.videoUrl}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="visual-video"
                                />
                                <div className="visual-overlay"></div>
                                <div className="visual-content">
                                    <div className="visual-number">0{index + 1}</div>
                                    <h2 className="visual-title">{service.title}</h2>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column - Scrolling Content */}
                <div className="services-four-right" ref={rightColRef}>
                    <div className="services-four-header">
                        <h2 className="section-title">Our <span className="highlight">Expertise</span></h2>
                        <p className="section-subtitle">
                            Comprehensive solutions for the energy and industrial sectors.
                        </p>
                    </div>

                    <div className="services-list">
                        {servicesData.map((service, index) => {
                            const Icon = iconMap[service.icon];
                            return (
                                <div
                                    key={service.id}
                                    className={`service-four-item ${index === activeIndex ? 'active' : ''}`}
                                >
                                    <div className="service-item-content">
                                        <div className="service-icon-wrapper">
                                            {Icon && <Icon size={40} />}
                                        </div>
                                        <h3 className="service-item-title">{service.title}</h3>
                                        <p className="service-item-desc">{service.description}</p>
                                        <ul className="service-features">
                                            <li><span className="bullet"></span>Certified Safety</li>
                                            <li><span className="bullet"></span>24/7 Support</li>
                                            <li><span className="bullet"></span>Global Standards</li>
                                        </ul>
                                        <button className="service-btn">
                                            Learn More <ArrowRight size={18} />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default ServicesFour;
