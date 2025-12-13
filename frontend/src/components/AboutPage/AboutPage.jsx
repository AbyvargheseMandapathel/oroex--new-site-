import React, { useEffect } from 'react';
import './AboutPage.css';
import { Award, BookOpen, Users, TrendingUp, Cpu, Settings } from 'lucide-react';

const AboutPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const values = [
        {
            icon: <Award size={32} />,
            title: "Leadership",
            description: "As a leader in the industry, we are committed to staying ahead of the curve. We continuously adapt to the evolving needs of our customers and seize new opportunities in the market. By choosing OroEx, you can expect to benefit from the latest services, technologies, and developments in the industry."
        },
        {
            icon: <BookOpen size={32} />,
            title: "Continuous Learning",
            description: "We enhance our expertise and ensure that we can offer you the most up-to-date and reliable solutions for your specific requirements. We understand the critical importance of safety and compliance in hazardous environments, and we strive to provide you with cutting-edge solutions that align with the latest industry standards."
        },
        {
            icon: <Users size={32} />,
            title: "Customer Relations",
            description: "We place our customers at the forefront of our business. Your satisfaction is our top priority, and we are committed to going the extra mile to meet and exceed your expectations. Superior customer service is a fundamental aspect of our company, and we take pride in serving you diligently."
        },
        {
            icon: <TrendingUp size={32} />,
            title: "Industry Insights",
            description: "By closely following industry trends and developments, we gain valuable insights into emerging technologies, regulatory changes, and best practices. Our deep understanding of hazardous environments allows us to anticipate challenges and recommend solutions that mitigate risks and ensure compliance."
        },
        {
            icon: <Cpu size={32} />,
            title: "Problem Solving",
            description: "Hazardous environments can present complex challenges that require specialized solutions. Our team's expertise equips us with the skills to analyze and solve intricate problems related to hazardous areas. We approach each project with a problem-solving mindset, ensuring that we deliver solutions that address your specific challenges effectively."
        },
        {
            icon: <Settings size={32} />,
            title: "Tailored Solutions",
            description: "With our extensive knowledge and expertise, we can provide customized solutions that are specifically tailored to your unique requirements. We take into account factors such as the nature of your operations, the specific hazards involved, and any regulatory considerations. This ensures that the solutions we offer are the most effective and reliable for your specific needs."
        }
    ];

    return (
        <div className="about-page-wrapper">
            {/* Hero / Introduction Section */}
            <section className="about-hero">
                <div className="about-hero-content">
                    <h1 className="about-title">Who We Are</h1>
                    <p className="about-description">
                        OroEx is a trusted provider of a comprehensive selection of explosion-proof products and services, catering to the specific needs of the oil and gas industry. Our commitment to delivering exceptional solutions and support remains unwavering, empowering our esteemed customers to achieve their goals effectively.
                    </p>
                    <p className="about-description">
                        Drawing upon our extensive experience in the field, we have earned a reputation as the leading experts in explosion-proof technology within our region. Our dedication to excellence sets us apart and ensures that our customers receive unparalleled quality and expertise in every aspect of our offerings.
                    </p>
                    <p className="about-description">
                        As an ISO 9001 – 2008 certified company, we adhere to stringent quality management systems, ensuring that our products and services consistently meet or exceed industry standards. We continuously strive to improve our processes and maintain the highest level of customer satisfaction.
                    </p>
                </div>
            </section>

            {/* Values Section */}
            <section className="about-values">
                <h2 className="values-title">Our Values</h2>
                <div className="values-grid">
                    {values.map((val, index) => (
                        <div key={index} className="value-card">
                            <div className="value-icon">
                                {val.icon}
                            </div>
                            <h3 className="value-card-title">{val.title}</h3>
                            <p className="value-card-desc">{val.description}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
