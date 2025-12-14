import React, { useEffect, useState } from 'react';
import './Footer.css';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import logo from '../../assets/logo.svg';
import { getNavbars, getServices, getCompanyInfo } from '../../api';
import { Link } from 'react-router-dom';

const Footer = () => {
    const [quickLinks, setQuickLinks] = useState([]);
    const [footerServices, setFooterServices] = useState([]);
    const [companyInfo, setCompanyInfo] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const navbars = await getNavbars();
                const services = await getServices();
                const info = await getCompanyInfo();

                setQuickLinks(navbars.filter(item => item.showInFooter));
                setFooterServices(services.filter(item => item.showInFooter));
                setCompanyInfo(info);
            } catch (error) {
                console.error("Error fetching footer data:", error);
            }
        };

        fetchData();
    }, []);

    const currentYear = new Date().getFullYear();

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
                            {quickLinks.map((link) => (
                                <li key={link.id || link.label}>
                                    <Link to={link.link}>{link.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h3>Services</h3>
                        <ul>
                            {footerServices.map((service) => (
                                <li key={service.id}>
                                    <Link to={`/services/${service.slug}`}>{service.title}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="footer-col footer-contact">
                        <h3>Contact Us</h3>
                        <div className="contact-item">
                            <MapPin size={18} />
                            <span>{companyInfo ? companyInfo.address : "123 Industrial Zone, Tech City"}</span>
                        </div>
                        <div className="contact-item">
                            <Phone size={18} />
                            <span>{companyInfo ? companyInfo.phone : "+1 234 567 8900"}</span>
                        </div>
                        <div className="contact-item">
                            <Mail size={18} />
                            <span>{companyInfo ? companyInfo.email : "info@oroex.com"}</span>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="footer-copyright">
                        &copy; {currentYear} OroEx. All rights reserved.
                    </div>
                    <div className="footer-socials">
                        {companyInfo?.facebook && <a href={companyInfo.facebook} target="_blank" rel="noopener noreferrer" className="social-icon"><Facebook size={20} /></a>}
                        {companyInfo?.twitter && <a href={companyInfo.twitter} target="_blank" rel="noopener noreferrer" className="social-icon"><Twitter size={20} /></a>}
                        {companyInfo?.instagram && <a href={companyInfo.instagram} target="_blank" rel="noopener noreferrer" className="social-icon"><Instagram size={20} /></a>}
                        {companyInfo?.linkedin && <a href={companyInfo.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon"><Linkedin size={20} /></a>}

                        {/* Fallbacks if no data yet (optional, or just show nothing) */}
                        {!companyInfo && (
                            <>
                                <a href="#" className="social-icon"><Facebook size={20} /></a>
                                <a href="#" className="social-icon"><Twitter size={20} /></a>
                                <a href="#" className="social-icon"><Instagram size={20} /></a>
                                <a href="#" className="social-icon"><Linkedin size={20} /></a>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
