import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ServiceDetails.css'; // Reuse CSS
import { getServiceDetails } from '../../api';
import { ArrowLeft } from 'lucide-react';

const ServiceDetailsBackend = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        getServiceDetails(id)
            .then(data => {
                setService(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch service details", err);
                setError(true);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="service-details-page">Loading...</div>;

    if (error || !service) {
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
                {service.videoUrl ? (
                    <video
                        src={service.videoUrl}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="sd-video-bg"
                    />
                ) : (
                    <div className="sd-video-bg" style={{ background: '#222' }}></div>
                )}
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
                    <div className="sd-description">
                        {service.longDescription ? (
                            <div dangerouslySetInnerHTML={{ __html: service.longDescription }} />
                        ) : (
                            <p>
                                {service.description}
                                <br /><br />
                                At Oroex, we pride ourselves on delivering top-tier {service.title.toLowerCase()} capabilities.
                                Our team of experts ensures that every project meets the highest standards of safety,
                                efficiency, and innovation. Whether it's complex industrial requirements or specialized
                                offshore needs, our {service.title} services are designed to exceed expectations.
                            </p>
                        )}
                    </div>
                </div>

                {/* <div className="sd-features-grid">
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
                </div> */}
            </div>
        </div>
    );
};

export default ServiceDetailsBackend;
