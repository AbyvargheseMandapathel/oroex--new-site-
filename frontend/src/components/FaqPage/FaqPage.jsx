import React, { useState } from 'react';
import './FaqPage.css';
import faqsData from '../../data/faqs.json';
import { Plus, Minus } from 'lucide-react';

const FaqPage = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFaq = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="faq-page-wrapper">
            <div className="faq-header">
                <h1 className="faq-title">Frequently Asked Questions</h1>
                <p className="faq-subtitle">Find answers to common questions about our products and services.</p>
            </div>

            <div className="faq-container">
                {faqsData.map((faq, index) => (
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
                                maxHeight: activeIndex === index ? '200px' : '0',
                                opacity: activeIndex === index ? 1 : 0
                            }}
                        >
                            <p>{faq.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FaqPage;
