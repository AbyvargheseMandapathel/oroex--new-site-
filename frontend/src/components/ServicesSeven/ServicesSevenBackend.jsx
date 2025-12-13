import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ServicesSeven.css'; // Reuse CSS
import { getHomepageServices } from '../../api';
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

const ServicesSevenBackend = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const navigate = useNavigate();
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getHomepageServices()
            .then(data => {
                setServices(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch homepage services", err);
                setLoading(false);
            });
    }, []);

    if (loading) return null; // Or skeleton

    if (services.length === 0) return null;

    return (
        <section className="services-seven-section">
            <div className="s7-header">
                <h2 className="s7-title">Our Capabilities</h2>
                <p className="s7-subtitle">Explore our range of industrial solutions</p>
            </div>

            <div className="s7-container">
                {services.map((service, index) => {
                    const Icon = iconMap[service.icon] || Wrench;
                    const isActive = activeIndex === index;

                    return (
                        <div
                            key={service.id}
                            className={`s7-item ${isActive ? 'active' : ''}`}
                            onMouseEnter={() => setActiveIndex(index)}
                            onClick={() => setActiveIndex(index)}
                        >
                            <div className="s7-bg-media">
                                {service.videoUrl ? (
                                    <video
                                        src={service.videoUrl}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="s7-video"
                                    />
                                ) : (
                                    <div className="s7-video" style={{ background: '#1a1a1a' }}></div>
                                )}
                                <div className="s7-overlay"></div>
                            </div>

                            <div className="s7-content">
                                <div className="s7-collapsed-content">
                                    <span className="s7-number">0{index + 1}</span>
                                    <div className="s7-icon-wrapper">
                                        <Icon size={24} />
                                    </div>
                                    <span className="s7-vertical-text">{service.title}</span>
                                </div>

                                <div className="s7-expanded-content">
                                    <div className="s7-expanded-header">
                                        <div className="s7-icon-large">
                                            <Icon size={40} />
                                        </div>
                                        <h3 className="s7-item-title">{service.title}</h3>
                                    </div>
                                    <p className="s7-desc">{service.description}</p>
                                    <button
                                        className="s7-btn"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(`/services/${service.id}`);
                                        }}
                                    >
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

export default ServicesSevenBackend;
