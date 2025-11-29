import React, { useRef, useState, useEffect } from 'react';
import './ServicesEight.css';
import servicesData from '../../data/services.json';
import {
    Wrench,
    Settings,
    Globe,
    Anchor,
    Cpu,
    Sun,
    ArrowUpRight
} from 'lucide-react';

const iconMap = {
    Installation: Wrench,
    Maintenance: Settings,
    OnshoreOffshore: Globe,
    OffshoreSolutions: Anchor,
    Assembly: Cpu,
    SolarSolutions: Sun,
};

const ServicesEight = () => {
    const containerRef = useRef(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleMouseMove = (e) => {
            const rect = container.getBoundingClientRect();
            setMousePosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        };

        container.addEventListener('mousemove', handleMouseMove);
        return () => container.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section className="services-eight-section">
            <div className="s8-header">
                <h2 className="s8-title">Our Services</h2>
                <p className="s8-subtitle">
                    Advanced solutions for complex industrial challenges.
                </p>
            </div>

            <div
                className="s8-grid"
                ref={containerRef}
                style={{
                    '--mouse-x': `${mousePosition.x}px`,
                    '--mouse-y': `${mousePosition.y}px`,
                }}
            >
                {servicesData.map((service, index) => {
                    const Icon = iconMap[service.icon];
                    return (
                        <div key={service.id} className="s8-card">
                            <div className="s8-card-content">
                                <div className="s8-video-wrapper">
                                    <video
                                        src={service.videoUrl}
                                        loop
                                        muted
                                        playsInline
                                        className="s8-video"
                                        onMouseEnter={(e) => e.target.play()}
                                        onMouseLeave={(e) => {
                                            e.target.pause();
                                            e.target.currentTime = 0;
                                        }}
                                    />
                                    <div className="s8-video-overlay"></div>
                                    <div className="s8-icon-badge">
                                        {Icon && <Icon size={24} />}
                                    </div>
                                </div>

                                <div className="s8-text-content">
                                    <div className="s8-card-header">
                                        <span className="s8-number">0{index + 1}</span>
                                        <ArrowUpRight className="s8-arrow" size={20} />
                                    </div>
                                    <h3 className="s8-card-title">{service.title}</h3>
                                    <p className="s8-card-desc">{service.description}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default ServicesEight;
