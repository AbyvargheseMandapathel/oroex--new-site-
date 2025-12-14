import React from 'react';
import './NotFound.css';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound = () => {
    return (
        <section className="not-found-section">
            <div className="not-found-content">
                <h1 className="error-code">404</h1>
                <div className="error-divider"></div>
                <h2 className="error-heading">Page Not Found</h2>
                <p className="error-description">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>
                <Link to="/" className="home-button">
                    <Home size={20} />
                    BACK TO HOME
                </Link>
            </div>

            {/* Ambient Background Elements */}
            <div className="ambient-circle c-1"></div>
            <div className="ambient-circle c-2"></div>
        </section>
    );
};

export default NotFound;
