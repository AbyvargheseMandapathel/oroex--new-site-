import React from 'react';
import HeaderThree from '../HeaderThree/HeaderThree';
import ServicesSeven from '../ServicesSeven/ServicesSeven';
import ProductsFifteen from '../ProductsFifteen/ProductsFifteen';
import ProjectsTwo from '../ProjectsTwo/ProjectsTwo';
import ContactUs from '../ContactUs/ContactUs';

const Home = () => {
    return (
        <div className="home-page">
            <HeaderThree />
            <ServicesSeven />
            <ProductsFifteen />
            <ProjectsTwo />
            <ContactUs />
        </div>
    );
};

export default Home;
