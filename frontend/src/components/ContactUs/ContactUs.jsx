import React, { useEffect, useState } from 'react';
import './ContactUs.css';
import { ArrowRight, MapPin, Phone, Mail } from 'lucide-react';
import { getCompanyInfo } from '../../api';
import { Link } from 'react-router-dom';

const ContactUs = () => {
    const [companyInfo, setCompanyInfo] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const info = await getCompanyInfo();
                setCompanyInfo(info);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <section className="contact-us-section">
            <div className="contact-video-bg">
                <video autoPlay loop muted playsInline className="contact-video">
                    <source src="https://videos.pexels.com/video-files/8555651/8555651-uhd_2560_1440_25fps.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="contact-overlay"></div>
            </div>

            <div className="contact-content-wrapper">
                <div className="contact-grid">
                    {/* Left Side: Headings */}
                    <div className="contact-info-side">
                        <span className="contact-label">• CONTACT US</span>
                        <h2 className="contact-heading">Your Reliable Partner for All Solutions</h2>
                        <p className="contact-description">
                            Share your requirements—products, technical assistance, or complete turnkey delivery—and our team will
                            provide expert guidance, compliant solutions, and fully specified project documentation.
                        </p>
                    </div>

                    {/* Right Side: Contact Details & CTA */}
                    <div className="contact-details-side">
                        <div className="contact-card">
                            <h3 className="card-title">Get in Touch</h3>
                            <div className="contact-details-list">
                                <div className="contact-detail-row">
                                    <MapPin className="detail-icon" />
                                    <span>{companyInfo?.address || "Loading..."}</span>
                                </div>
                                <div className="contact-detail-row">
                                    <Phone className="detail-icon" />
                                    <span>{companyInfo?.phone || "Loading..."}</span>
                                </div>
                                <div className="contact-detail-row">
                                    <Mail className="detail-icon" />
                                    <span>{companyInfo?.email || "Loading..."}</span>
                                </div>
                            </div>

                            <Link to="/contact" className="contact-button-red flex-center">
                                CONTACT US <ArrowRight size={20} className="btn-icon" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;
