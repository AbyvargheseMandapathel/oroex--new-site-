import React, { useState, useEffect } from 'react';
import './FaqPage.css';
import { Plus, Minus } from 'lucide-react';
import Loader from '../Loader/Loader';
import { getFaqs } from '../../api';

const FAQBackend = () => {
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeIndex, setActiveIndex] = useState(null);

    useEffect(() => {
        const fetchFaqs = async () => {
            try {
                const data = await getFaqs();
                setFaqs(data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching FAQs:", err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchFaqs();
    }, []);

    const toggleFaq = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    if (loading) return <Loader text="Loading FAQs..." />;
    if (error) return <div className="text-center text-red-500 py-10">Error: {error}</div>;

    return (
        <div className="faq-page-wrapper">
            <div className="faq-header">
                <h1 className="faq-title">Frequently Asked Questions</h1>
                <p className="faq-subtitle">Find answers to common questions about our products and services.</p>
            </div>

            <div className="faq-container">
                {faqs.map((faq, index) => (
                    <div
                        key={faq.id}
                        className={`faq-item ${activeIndex === index ? 'active' : ''}`}
                        onClick={() => toggleFaq(index)}
                    >
                        <div className="faq-question">
                            <h3>{faq.question}</h3>
                            <div className="faq-icon">
                                {activeIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                            </div>
                        </div>
                        <div
                            className="faq-answer"
                            style={{
                                maxHeight: activeIndex === index ? '500px' : '0',
                                opacity: activeIndex === index ? 1 : 0
                            }}
                        >
                            <p>{faq.answer}</p>
                        </div>
                    </div>
                ))}

                {faqs.length === 0 && (
                    <div className="text-center py-10">
                        <p>No FAQs available at the moment.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FAQBackend;
