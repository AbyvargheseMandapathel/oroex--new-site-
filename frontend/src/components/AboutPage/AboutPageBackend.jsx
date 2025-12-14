import React, { useEffect, useState } from 'react';
import './AboutPage.css';
import { Award, BookOpen, Users, TrendingUp, Cpu, Settings } from 'lucide-react';
import { getAbout } from '../../api';
import Loader from '../Loader/Loader';
import '../RichText.css'; // Ensure proper styling for rich text
import SEO from '../SEO/SEO';

const AboutPageBackend = () => {
    const [aboutData, setAboutData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchAbout = async () => {
            try {
                const data = await getAbout();
                setAboutData(data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching about data:", err);
                // Don't error out entirely? Or use fallback? 
                // Let's set error for now.
                setError(err.message);
                setLoading(false);
            }
        };

        fetchAbout();
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

    if (loading) return <Loader text="Loading About Us..." />;

    // Fallback if error or no data (empty backend)
    // We can render static or just show error. Let's show error for dev visibility, or empty state.
    if (error) return <div className="text-center text-red-500 py-10">Error: {error}</div>;

    const title = aboutData && aboutData.title ? aboutData.title : "Who We Are";
    const description = aboutData && aboutData.description ? aboutData.description : "<p>About description not available.</p>";

    return (
        <div className="about-page-wrapper">
            <SEO
                title={title}
                description={aboutData?.description?.replace(/<[^>]*>/g, '').substring(0, 160) || "Learn more about OroEx."}
            />
            {/* Hero / Introduction Section */}
            <section className="about-hero">
                <div className="about-hero-content">
                    <h1 className="about-title">{title}</h1>
                    <div className="about-description rich-text-content" dangerouslySetInnerHTML={{ __html: description }} />
                </div>
            </section>

            {/* Values Section - Keeping Static for now as user only asked for "About Us Who We Are text" backend */}
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

export default AboutPageBackend;
