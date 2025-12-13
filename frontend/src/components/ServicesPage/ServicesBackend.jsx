import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ServicesPage.css'; // Reusing CSS
import { getServices } from '../../api';
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

const ServicesBackend = () => {
    const navigate = useNavigate();
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getServices()
            .then(data => {
                setServices(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch services", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="services-page">Loading...</div>;

    return (
        <div className="services-page">
            <div className="sp-header">
                <h1 className="sp-title">Our Services</h1>
                <p className="sp-subtitle">Comprehensive industrial solutions designed for efficiency and reliability.</p>
            </div>

            <div className="sp-grid">
                {services.map((service) => {
                    // Fallback to Wrench if icon not found in map, or handle gracefully
                    const Icon = iconMap[service.icon] || Wrench;
                    return (
                        <div
                            key={service.id}
                            className="sp-card"
                            onClick={() => navigate(`/services/${service.id}`)}
                        >
                            <div className="sp-card-media">
                                {service.videoUrl ? (
                                    <video
                                        src={service.videoUrl}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="sp-video"
                                    />
                                ) : (
                                    <div className="sp-video" style={{ background: '#333' }}></div>
                                )}
                                <div className="sp-overlay"></div>
                            </div>
                            <div className="sp-content">
                                <div className="sp-icon-wrapper">
                                    <Icon size={24} color="#fff" />
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

export default ServicesBackend;
