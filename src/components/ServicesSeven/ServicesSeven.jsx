import React, { useState } from 'react';
import './ServicesSeven.css';
import servicesData from '../../data/services.json';
import {
    Wrench,
    Settings,
    Globe,
    Anchor,
    Cpu,
    Sun,
    ArrowRight,
    Plus
} from 'lucide-react';

const iconMap = {
    Installation: Wrench,
    Maintenance: Settings,
    OnshoreOffshore: Globe,
    OffshoreSolutions: Anchor,
    Assembly: Cpu,
    SolarSolutions: Sun,
};

const ServicesSeven = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="services-seven-section">
            <div className="s7-header">
                <h2 className="s7-title">Our Capabilities</h2>
                <p className="s7-subtitle">Explore our range of industrial solutions</p>
            </div>

            <div className="s7-container">
                {servicesData.map((service, index) => {
                    const Icon = iconMap[service.icon];
                    const isActive = activeIndex === index;

                    return (
                        <div
                            key={service.id}
                            className={`s7-item ${isActive ? 'active' : ''}`}
                            onMouseEnter={() => setActiveIndex(index)}
                            onClick={() => setActiveIndex(index)} // For mobile tap
                        >
                            <div className="s7-bg-media">
                                <video
                                    src={service.videoUrl}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="s7-video"
                                />
                                <div className="s7-overlay"></div>
                            </div>

                            <div className="s7-content">
                                <div className="s7-collapsed-content">
                                    <span className="s7-number">0{index + 1}</span>
                                    <div className="s7-icon-wrapper">
                                        {Icon && <Icon size={24} />}
                                    </div>
                                    <span className="s7-vertical-text">{service.title}</span>
                                </div>

                                <div className="s7-expanded-content">
                                    <div className="s7-expanded-header">
                                        <div className="s7-icon-large">
                                            {Icon && <Icon size={40} />}
                                        </div>
                                        <h3 className="s7-item-title">{service.title}</h3>
                                    </div>
                                    <p className="s7-desc">{service.description}</p>
                                    <button className="s7-btn">
                                        <span>View Service</span>
                                        <ArrowRight size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default ServicesSeven;
