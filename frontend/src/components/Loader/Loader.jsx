import React from 'react';
import './Loader.css';
import logo from '../../assets/logo.svg';

const Loader = () => {
    return (
        <div className="loader-container">
            <img src={logo} alt="Loading..." className="loader-logo" />
        </div>
    );
};

export default Loader;
