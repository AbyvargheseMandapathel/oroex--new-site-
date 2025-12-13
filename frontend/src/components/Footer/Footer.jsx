import React from 'react';
import './Footer.css';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import logo from '../../assets/logo.svg';

const Footer = () => {
    return (
        <footer className="footer-section">
            <div className="footer-container">
                <div className="footer-top">
                    <div className="footer-col footer-brand">
                        <img src={logo} alt="OROEX" className="footer-logo-img" />
                        <p className="footer-desc">
                            Delivering excellence in industrial solutions. We build the future with precision and durability.
                        </p>
                    </div>

                    <div className="footer-col">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><a href="#">Home</a></li>
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Projects</a></li>
                            <li><a href="#">Services</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h3>Services</h3>
                        <ul>
                            <li><a href="#">Industrial Panels</a></li>
                            <li><a href="#">Explosion Proof</a></li>
                            <li><a href="#">Automation</a></li>
                            <li><a href="#">Maintenance</a></li>
                        </ul>
                    </div>

                    <div className="footer-col footer-contact">
                        <h3>Contact Us</h3>
                        <div className="contact-item">
                            <MapPin size={18} />
                            <span>123 Industrial Zone, Tech City</span>
                        </div>
                        <div className="contact-item">
                            <Phone size={18} />
                            <span>+1 234 567 8900</span>
                        </div>
                        <div className="contact-item">
                            <Mail size={18} />
                            <span>info@oroex.com</span>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="footer-copyright">
                        &copy; 2025 OroEx. All rights reserved.
                    </div>
                    <div className="footer-socials">
                        <a href="#" className="social-icon"><Facebook size={20} /></a>
                        <a href="#" className="social-icon"><Twitter size={20} /></a>
                        <a href="#" className="social-icon"><Instagram size={20} /></a>
                        <a href="#" className="social-icon"><Linkedin size={20} /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
