import React, { useEffect, useRef } from 'react';
import './ServicesThree.css';
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
    ArrowRight,
    CheckCircle2
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

const ServicesThree = ({
    backgroundColor = "#050505",
    accentColor = "#e63946",
    textColor = "#ffffff",
    subTextColor = "#a0a0a0",
    cardBgColor = "#1a1a1a"
}) => {
    const sectionRef = useRef(null);
    const triggerRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        const trigger = triggerRef.current;

        if (!section || !trigger) return;

        let ctx = gsap.context(() => {
            const scrollWidth = section.scrollWidth;
            const windowWidth = window.innerWidth;

            gsap.to(section, {
                x: () => -(scrollWidth - windowWidth),
                ease: "none",
                scrollTrigger: {
                    trigger: trigger,
                    start: "top top",
                    end: () => `+=${scrollWidth - windowWidth}`,
                    scrub: 1,
                    pin: true,
                    invalidateOnRefresh: true,
                    anticipatePin: 1,
                }
            });
        }, triggerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div
            className="services-three-wrapper"
            ref={triggerRef}
            style={{
                "--bg-color": backgroundColor,
                "--accent-color": accentColor,
                "--text-color": textColor,
                "--sub-text-color": subTextColor,
                "--card-bg-color": cardBgColor
            }}
        >
            <div className="services-three-container" ref={sectionRef}>

                {/* Intro Card */}
                <div className="service-three-card intro-card">
                    <div className="intro-content">
                        <h2 className="intro-title">Our <span className="highlight">Services</span></h2>
                        <p className="intro-desc">
                            Delivering excellence in oil, gas, and industrial sectors with cutting-edge safety and operational solutions.
                        </p>
                        <div className="scroll-indicator">
                            <span>Scroll to explore</span>
                            <ArrowRight className="animate-bounce-right" />
                        </div>
                    </div>
                </div>

                {/* Service Cards */}
                {servicesData.map((service, index) => {
                    const IconComponent = iconMap[service.icon];
                    return (
                        <div key={service.id} className="service-three-card">
                            <div className="card-inner">
                                <div className="card-video-bg">
                                    <video
                                        src={service.videoUrl}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="bg-video"
                                    />
                                    <div className="video-overlay"></div>
                                </div>

                                <div className="card-content">
                                    <div className="icon-box">
                                        {IconComponent && <IconComponent size={32} />}
                                    </div>
                                    <h3 className="card-title">{service.title}</h3>
                                    <p className="card-desc">{service.description}</p>

                                    <button className="learn-more-btn">
                                        <span>View Details</span>
                                        <ArrowRight size={16} />
                                    </button>
                                </div>

                                <div className="card-number">
                                    0{index + 1}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ServicesThree;
