import React, { useState } from 'react';
import './NavbarOne.css';
import menuItems from '../../data/navbarOneMenu.json';
import logo from '../../assets/logo.svg';
import { X, ChevronDown } from 'lucide-react';

import { Link } from 'react-router-dom';

const NavbarOne = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Placeholder gallery images
    const galleryImages = [
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=200",
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=200",
        "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=200",
        "https://images.unsplash.com/photo-1542744094-297c11f7c10b?auto=format&fit=crop&q=80&w=200",
        "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?auto=format&fit=crop&q=80&w=200",
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=200"
    ];

    return (
        <div className="navbar-one-wrapper">
            <nav className="navbar-one">
                <div className="navbar-one-logo">
                    <Link to="/">
                        <img src={logo} alt="OroEx" />
                    </Link>
                </div>

                <div className="navbar-one-links">
                    {menuItems.map((item, index) => (
                        <Link key={index} to={item.link} className="navbar-one-link">
                            {item.label}
                        </Link>
                    ))}
                </div>

                <div className="navbar-one-mobile-menu" onClick={() => setIsMenuOpen(true)}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 12H21" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M3 6H21" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M3 18H21" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>

                <div className="navbar-one-action">
                    <Link to="/contact" className="contact-btn">
                        CONTACT US
                    </Link>
                </div>
            </nav>

            {/* Mobile Sidebar */}
            <div className={`navbar-sidebar-overlay ${isMenuOpen ? 'open' : ''}`} onClick={() => setIsMenuOpen(false)}></div>
            <div className={`navbar-sidebar ${isMenuOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <img src={logo} alt="OroEx" className="sidebar-logo" />
                    <button className="sidebar-close-btn" onClick={() => setIsMenuOpen(false)}>
                        <X size={24} />
                    </button>
                </div>

                <div className="sidebar-content">
                    <div className="sidebar-nav">
                        {menuItems.map((item, index) => (
                            <Link key={index} to={item.link} className="sidebar-link" onClick={() => setIsMenuOpen(false)}>
                                {item.label}
                                {item.hasSubmenu && <ChevronDown size={16} />}
                            </Link>
                        ))}
                    </div>

                    <div className="sidebar-section">
                        <h4 className="sidebar-section-title">Gallery</h4>
                        <div className="sidebar-gallery">
                            {galleryImages.map((img, idx) => (
                                <div key={idx} className="gallery-item">
                                    <img src={img} alt={`Gallery ${idx + 1}`} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="sidebar-section">
                        <h4 className="sidebar-section-title">Contact Us</h4>
                        <div className="sidebar-contact-info">
                            <p><strong>Address:</strong> Dubai, UAE</p>
                            <p><strong>Hours:</strong> 9:00 - 18:00, Mon - Fri, Sat - 9:30 - 16:00</p>
                            <p><strong>Phone:</strong> +971564129562</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavbarOne;
