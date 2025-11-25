import React from 'react';
import './NavbarOne.css';
import menuItems from '../../data/navbarOneMenu.json';
import logo from '../../assets/logo.svg'; // Assuming logo exists here, based on previous Navbar

const NavbarOne = () => {
    return (
        <div className="navbar-one-wrapper">
            <nav className="navbar-one">
                <div className="navbar-one-logo">
                    <a href="/">
                        <img src={logo} alt="OroEx" />
                        {/* Fallback text if logo image has issues or for SEO, though image is preferred as per design */}
                        {/* <span className="logo-text">OroEx</span> */}
                    </a>
                </div>

                <div className="navbar-one-links">
                    {menuItems.map((item, index) => (
                        <a key={index} href={item.link} className="navbar-one-link">
                            {item.label}
                        </a>
                    ))}
                </div>

                <div className="navbar-one-mobile-menu">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 12H21" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M3 6H21" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M3 18H21" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>

                <div className="navbar-one-action">
                    <a href="/contact" className="contact-btn">
                        CONTACT US
                    </a>
                </div>
            </nav>
        </div>
    );
};

export default NavbarOne;
