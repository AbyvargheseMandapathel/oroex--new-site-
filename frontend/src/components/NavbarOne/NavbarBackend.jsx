import React, { useState, useEffect } from 'react';
import './NavbarOne.css'; // Reusing the CSS
import logo from '../../assets/logo.svg';
import { X, ChevronDown, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getNavbars } from '../../api';

const NavbarBackend = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
            setIsSearchOpen(false);
            setSearchQuery('');
        }
    };

    // Placeholder gallery images (kept from original)
    const galleryImages = [
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=200",
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=200",
        "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=200",
        "https://images.unsplash.com/photo-1542744094-297c11f7c10b?auto=format&fit=crop&q=80&w=200",
        "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?auto=format&fit=crop&q=80&w=200",
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=200"
    ];

    useEffect(() => {
        getNavbars()
            .then(data => {
                const filtered = data.filter(item => item.showInNavbar);
                setMenuItems(filtered);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch menu items", err);
                setLoading(false);
            });
    }, []);

    if (loading) return null; // Or a loader

    return (
        <div className="navbar-one-wrapper">
            <nav className="navbar-one">
                <div className="navbar-one-logo">
                    <Link to="/">
                        <img src={logo} alt="OroEx" />
                    </Link>
                </div>

                <div className={`navbar-one-links ${isSearchOpen ? 'hidden' : ''}`}>
                    {menuItems.map((item, index) => {
                        // If it's not a highlight item, render as normal link
                        if (!item.is_highlight) {
                            return (
                                <Link key={index} to={item.link} className="navbar-one-link">
                                    {item.label}
                                </Link>
                            );
                        }
                        return null;
                    })}
                </div>



                {/* Render Highlight Button (e.g. Contact Us) */}
                {/* Action Area: Search + Contact Button */}
                <div className="navbar-one-action-group">
                    <div className={`navbar-search-container ${isSearchOpen ? 'active' : ''}`}>
                        {isSearchOpen ? (
                            <form onSubmit={handleSearchSubmit} className="navbar-search-form">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    autoFocus
                                    className="navbar-search-input"
                                />
                                <button type="button" className="search-close-btn" onClick={() => setIsSearchOpen(false)}>
                                    <X size={20} />
                                </button>
                            </form>
                        ) : (
                            <button className="navbar-search-trigger" onClick={() => setIsSearchOpen(true)}>
                                <Search size={20} />
                            </button>
                        )}
                    </div>

                    <div className="navbar-one-action">
                        {menuItems.filter(item => item.is_highlight).map((item, index) => (
                            <Link key={index} to={item.link} className="contact-btn">
                                {item.label.toUpperCase()}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="navbar-one-mobile-menu" onClick={() => setIsMenuOpen(true)}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 12H21" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M3 6H21" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M3 18H21" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
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
                                {/* Assuming no submenu for dynamic items for now, or would need recursive structure from backend */}
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

export default NavbarBackend;
