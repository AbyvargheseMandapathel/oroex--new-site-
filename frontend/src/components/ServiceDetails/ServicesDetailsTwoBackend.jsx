import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ServicesDetailsTwo.css';
import '../RichText.css'; // Rich Text Styles
import { getServiceDetails } from '../../api';
import {
    ArrowLeft,
    CheckCircle,
    Clock,
    Shield,
    Phone
} from 'lucide-react';

const ServicesDetailsTwoBackend = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        getServiceDetails(slug)
            .then(data => {
                setService(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch service details", err);
                setLoading(false);
            });
    }, [slug]);

    if (loading) return (
        <div className="sd2-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            Loading...
        </div>
    );

    if (!service) {
        return (
            <div className="sd2-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <h2>Service Not Found</h2>
                <button className="sd2-back-btn" onClick={() => navigate('/services')} style={{ position: 'static', marginTop: '20px' }}>
                    Back to Services
                </button>
            </div>
        );
    }

    return (
        <div className="sd2-page">
            <button className="sd2-back-btn" onClick={() => navigate('/services')}>
                <ArrowLeft size={18} /> Back
            </button>

            {/* Hero Section */}
            <section className="sd2-hero">
                {service.videoUrl ? (
                    <video
                        src={service.videoUrl}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="sd2-video-bg"
                    />
                ) : (
                    <div className="sd2-video-bg" style={{ background: '#111' }}></div>
                )}
                <div className="sd2-overlay"></div>

                <div className="sd2-hero-content">
                    <h1 className="sd2-title">{service.title}</h1>
                    <p className="sd2-subtitle">{service.shortDescription}</p>
                </div>
            </section>

            {/* Main Content */}
            <div className="sd2-container">
                {/* Left Column: Rich Text Content */}
                <div className="sd2-main">
                    <div className="sd2-rich-text">
                        {service.longDescription ? (
                            <div dangerouslySetInnerHTML={{ __html: service.longDescription }} />
                        ) : (
                            // Fallback if no rich text provided
                            <div>
                                <p>
                                    At Oroex, we are committed to providing world-class <strong>{service.title}</strong> solutions.
                                    Our team of dedicated professionals ensures that every project is executed with precision and care.
                                </p>
                                <p>{service.description}</p>
                                <h3>Why Choose Us?</h3>
                                <ul>
                                    <li>Industry-leading expertise</li>
                                    <li>State-of-the-art technology</li>
                                    <li>Commitment to safety and sustainability</li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: Sidebar Info */}
                <aside className="sd2-sidebar">
                    {/* <div className="sd2-card">
                        <div className="sd2-card-title">
                            <Shield size={20} className="text-blue-500" />
                            Premium Guarantee
                        </div>
                        <ul className="sd2-feature-list">
                            <li className="sd2-feature-item">
                                <div className="sd2-feature-icon"><CheckCircle size={18} /></div>
                                <div className="sd2-feature-text">
                                    <h4>Certified Experts</h4>
                                    <p>Our team is fully licensed and trained.</p>
                                </div>
                            </li>
                            <li className="sd2-feature-item">
                                <div className="sd2-feature-icon"><Clock size={18} /></div>
                                <div className="sd2-feature-text">
                                    <h4>On-Time Delivery</h4>
                                    <p>We respect your time and project deadlines.</p>
                                </div>
                            </li>
                        </ul>
                    </div> */}

                    <div className="sd2-card">
                        <div className="sd2-card-title">
                            <Phone size={20} />
                            Get in Touch
                        </div>
                        <p style={{ color: '#9ca3af', marginBottom: '20px', fontSize: '0.9rem' }}>
                            Ready to start your project?
                        </p>
                        <button className="sd2-contact-btn" onClick={() => navigate('/contact')}>
                            Contact Us Now
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default ServicesDetailsTwoBackend;
