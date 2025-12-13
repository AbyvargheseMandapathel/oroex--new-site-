import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ServicesPage.css';
import servicesData from '../../data/services.json';
import {
    Wrench,
    Settings,
    Globe,
    Anchor,
    Cpu,
    Sun,
    ArrowRight
} from 'lucide-react';

const iconMap = {
    Installation: Wrench,
    Maintenance: Settings,
    OnshoreOffshore: Globe,
    OffshoreSolutions: Anchor,
    Assembly: Cpu,
    SolarSolutions: Sun,
};

const ServicesPage = () => {
    const navigate = useNavigate();

    return (
        <div className="services-page">
            <div className="sp-header">
                <h1 className="sp-title">Our Services</h1>
                <p className="sp-subtitle">Comprehensive industrial solutions designed for efficiency and reliability.</p>
            </div>

            <div className="sp-grid">
                {servicesData.map((service) => {
                    const Icon = iconMap[service.icon];
                    return (
                        <div
                            key={service.id}
                            className="sp-card"
                            onClick={() => navigate(`/services/${service.id}`)}
                        >
                            <div className="sp-card-media">
                                <video
                                    src={service.videoUrl}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="sp-video"
                                />
                                <div className="sp-overlay"></div>
                            </div>
                            <div className="sp-content">
                                <div className="sp-icon-wrapper">
                                    {Icon && <Icon size={24} color="#fff" />}
                                </div>
                                <h3 className="sp-card-title">{service.title}</h3>
                                <p className="sp-card-desc">{service.description}</p>
                                <div className="sp-link">
                                    View Details <ArrowRight size={16} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ServicesPage;
