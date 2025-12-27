import React, { useState, useEffect } from 'react';
import logo from '../../assets/logo.svg';
import './Navbar.css';
import { getNavbars } from '../../api';

const Navbar = ({ position = 'fixed' }) => {
    const [navItems, setNavItems] = useState([]);

    useEffect(() => {
        const fetchNavs = async () => {
            try {
                const data = await getNavbars();
                console.log("Navbar Data:", data);
                const filtered = data.filter(item => item.showInNavbar);
                console.log("Filtered Navbar:", filtered);
                setNavItems(filtered);
            } catch (err) {
                console.error("Failed to load navbar", err);
            }
        };
        fetchNavs();
    }, []);

    return (
        <nav className={`navbar-container navbar-${position}`}>
            <div className="navbar-logo">
                <a href="/">
                    <img src={logo} alt="Logo" width={90} height={28} />
                </a>
            </div>
            <ul className="navbar-menu">
                {navItems.map((item, index) => (
                    <li key={item.id || index} className="navbar-item">
                        <a href={item.link} className="navbar-link">
                            {item.label}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navbar;
