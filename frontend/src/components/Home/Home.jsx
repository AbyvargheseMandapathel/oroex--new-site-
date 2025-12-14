import React from 'react';
import HeaderBackend from '../HeaderThree/HeaderBackend';
import ServicesSevenBackend from '../ServicesSeven/ServicesSevenBackend';
import ProductsFifteenBackend from '../ProductsFifteen/ProductsFifteenBackend';
import ProjectsTwoBackEnd from '../ProjectsTwo/ProjectsTwoBackEnd';
import ContactUs from '../ContactUs/ContactUs';
import SEO from '../SEO/SEO';

const Home = () => {
    return (
        <div className="home-page">
            <SEO
                title="Home"
                description="Welcome to OroEx. Your reliable partner for all solutions."
            />
            < HeaderBackend />
            <ServicesSevenBackend />
            <ProductsFifteenBackend />
            <ProjectsTwoBackEnd />
            <ContactUs />
        </div>
    );
};

export default Home;
