import React from 'react';
import menuItems from '../../data/menu.json';
import logo from '../../assets/logo.svg';
import './Navbar.css';

const Navbar = ({ position = 'fixed' }) => {
    return (
        <nav className={`navbar-container navbar-${position}`}>
            <div className="navbar-logo">
                <a href="/">
                    <img src={logo} alt="Logo" width={90} height={28} />
                </a>
            </div>
            <ul className="navbar-menu">
                {menuItems.map((item, index) => (
                    <li key={index} className="navbar-item">
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
