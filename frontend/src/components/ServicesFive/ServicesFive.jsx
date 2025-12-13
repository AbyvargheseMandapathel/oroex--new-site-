import React, { useEffect, useRef } from 'react';
import './ServicesFive.css';
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

const ServicesFive = () => {
    return (
        <section className="services-five-section">
            <div className="services-five-header">
                <h2 className="sf-main-title">Core Capabilities</h2>
                <p className="sf-subtitle">
                    Engineering solutions designed for the most demanding environments.
                </p>
            </div>

            <div className="services-five-container">
                {servicesData.map((service, index) => {
                    const Icon = iconMap[service.icon];
                    return (
                        <div
                            key={service.id}
                            className="sf-card-wrapper"
                            style={{ '--index': index }}
                        >
                            <div className="sf-card">
                                <div className="sf-card-visual">
                                    <video
                                        src={service.videoUrl}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="sf-video"
                                    />
                                    <div className="sf-overlay"></div>
                                </div>

                                <div className="sf-card-content">
                                    <div className="sf-card-header">
                                        <span className="sf-number">0{index + 1}</span>
                                        <div className="sf-icon-box">
                                            {Icon && <Icon size={28} />}
                                        </div>
                                    </div>

                                    <div className="sf-card-body">
                                        <h3 className="sf-title">{service.title}</h3>
                                        <p className="sf-desc">{service.description}</p>

                                        <div className="sf-tags">
                                            <span>Industrial</span>
                                            <span>Safety</span>
                                            <span>Efficiency</span>
                                        </div>

                                        <button className="sf-btn">
                                            Explore Service <ArrowUpRight size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default ServicesFive;
