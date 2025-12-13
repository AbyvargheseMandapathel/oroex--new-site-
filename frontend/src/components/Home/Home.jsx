import React from 'react';
import HeaderBackend from '../HeaderThree/HeaderBackend';
import ServicesSevenBackend from '../ServicesSeven/ServicesSevenBackend';
import ProductsFifteenBackend from '../ProductsFifteen/ProductsFifteenBackend';
import ProjectsTwoBackEnd from '../ProjectsTwo/ProjectsTwoBackEnd';
import ContactUs from '../ContactUs/ContactUs';

const Home = () => {
    return (
        <div className="home-page">
            < HeaderBackend />
            <ServicesSevenBackend />
            <ProductsFifteenBackend />
            <ProjectsTwoBackEnd />
            <ContactUs />
        </div>
    );
};

export default Home;
