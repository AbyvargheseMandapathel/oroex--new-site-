import React from 'react';
import './ContactUs.css';
import { ArrowRight } from 'lucide-react';

const ContactUs = () => {
    return (
        <section className="contact-us-section">
            <div className="contact-video-bg">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="contact-video"
                >
                    <source src="https://videos.pexels.com/video-files/8555651/8555651-uhd_2560_1440_25fps.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="contact-overlay"></div>
            </div>

            <div className="contact-content">
                <div className="contact-center-wrapper">
                    <span className="contact-label">• CONTACT US</span>
                    <h2 className="contact-heading">Your Reliable Partner for All <br /> Solutions</h2>
                    <p className="contact-description">
                        Share your requirements—products, technical assistance, or complete turnkey delivery—and our team will
                        provide expert guidance, compliant solutions, and fully specified project documentation.
                    </p>
                    <button className="contact-button-red">
                        CONTACT US <ArrowRight size={20} className="btn-icon" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;
