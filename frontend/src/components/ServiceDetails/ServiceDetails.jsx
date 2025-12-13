import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ServiceDetails.css';
import servicesData from '../../data/services.json';
import { ArrowLeft } from 'lucide-react';

const ServiceDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const service = servicesData.find(s => s.id === parseInt(id));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!service) {
        return (
            <div className="service-details-page">
                <div className="sd-not-found">
                    <h2>Service not found</h2>
                    <button className="sd-back-btn" onClick={() => navigate('/services')}>
                        <ArrowLeft size={20} /> Back to Services
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="service-details-page">
            <div className="sd-hero">
                <video
                    src={service.videoUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="sd-video-bg"
                />
                <div className="sd-overlay"></div>
                <div className="sd-hero-content">
                    <button className="sd-back-btn" onClick={() => navigate('/services')}>
                        <ArrowLeft size={20} /> Back to Services
                    </button>
                    <h1 className="sd-title">{service.title}</h1>
                </div>
            </div>

            <div className="sd-main-content">
                <div className="sd-info">
                    <h2 className="sd-section-title">Overview</h2>
                    <p className="sd-description">
                        {service.description}
                        <br /><br />
                        At Oroex, we pride ourselves on delivering top-tier {service.title.toLowerCase()} capabilities.
                        Our team of experts ensures that every project meets the highest standards of safety,
                        efficiency, and innovation. Whether it's complex industrial requirements or specialized
                        offshore needs, our {service.title} services are designed to exceed expectations.
                    </p>
                </div>

                {/* Placeholder for more specific content based on service type could go here */}
                <div className="sd-features-grid">
                    <div className="sd-feature-card">
                        <h3 className="sd-feature-title">Certified Experts</h3>
                        <p className="sd-feature-text">Our team consists of highly trained professionals with years of field experience.</p>
                    </div>
                    <div className="sd-feature-card">
                        <h3 className="sd-feature-title">24/7 Support</h3>
                        <p className="sd-feature-text">Round-the-clock technical assistance and maintenance support.</p>
                    </div>
                    <div className="sd-feature-card">
                        <h3 className="sd-feature-title">Global Standards</h3>
                        <p className="sd-feature-text">Adhering to international safety and quality protocols.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetails;
