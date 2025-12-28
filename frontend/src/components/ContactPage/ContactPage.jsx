import React, { useState, useEffect } from 'react';
import './ContactPage.css';
import { Mail, Phone, MapPin, Send, CheckCircle, Loader } from 'lucide-react';

import { useSearchParams } from 'react-router-dom';
import { submitContact, getCompanyInfo } from '../../api';

const ContactPage = () => {
    const [searchParams] = useSearchParams();
    const productSlug = searchParams.get('product');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: productSlug ? `Inquiry about product: ${productSlug}` : '',
        message: '',
        product: productSlug || ''
    });

    const [companyInfo, setCompanyInfo] = useState(null);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [serverError, setServerError] = useState('');

    useEffect(() => {
        const fetchInfo = async () => {
            try {
                const data = await getCompanyInfo();
                setCompanyInfo(data);
            } catch (error) {
                console.error("Failed to fetch company info", error);
            }
        };
        fetchInfo();
    }, []);

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
        if (!formData.message.trim()) newErrors.message = 'Message is required';
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsSubmitting(true);
        setServerError('');

        try {
            await submitContact(formData);
            setIsSubmitting(false);
            setIsSuccess(true);
            setFormData({ name: '', email: '', subject: '', message: '', product: '' });
            setTimeout(() => setIsSuccess(false), 5000);
        } catch (err) {
            setIsSubmitting(false);
            setServerError(err.message || 'Something went wrong. Please try again.');
        }
    };

    return (
        <div className="contact-page-wrapper">
            <div className="contact-container">
                <div className="contact-header">
                    <h1 className="contact-main-title">Get in Touch</h1>
                    <p className="contact-subtitle">We'd love to hear from you. Please fill out this form or reach out using the details below.</p>
                </div>

                <div className="contact-content">
                    {/* Contact Details Column */}
                    <div className="contact-info-col">
                        <div className="info-card">
                            <h3 className="info-title">Contact Information</h3>

                            <div className="info-item">
                                <div className="info-icon">
                                    <MapPin size={24} />
                                </div>
                                <div className="info-text">
                                    <h4>Our Location</h4>
                                    <p>{companyInfo?.address || 'Loading...'}</p>
                                </div>
                            </div>

                            <div className="info-item">
                                <div className="info-icon">
                                    <Phone size={24} />
                                </div>
                                <div className="info-text">
                                    <h4>Phone Number</h4>
                                    <p>{companyInfo?.phone || 'Loading...'}</p>
                                </div>
                            </div>

                            <div className="info-item">
                                <div className="info-icon">
                                    <Mail size={24} />
                                </div>
                                <div className="info-text">
                                    <h4>Email Address</h4>
                                    <p>{companyInfo?.email || 'Loading...'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form Column */}
                    <div className="contact-form-col">
                        {isSuccess ? (
                            <div className="success-message">
                                <CheckCircle size={64} className="success-icon" />
                                <h2>Message Sent!</h2>
                                <p>Thank you for contacting us. We will get back to you shortly.</p>
                                <button className="reset-btn" onClick={() => setIsSuccess(false)}>Send Another Message</button>
                            </div>
                        ) : (
                            <form className="contact-form" onSubmit={handleSubmit}>
                                {serverError && <div className="error-msg" style={{ marginBottom: '1rem' }}>{serverError}</div>}
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={errors.name ? 'error' : ''}
                                        placeholder="Your Name"
                                    />
                                    {errors.name && <span className="error-msg">{errors.name}</span>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={errors.email ? 'error' : ''}
                                        placeholder="your@email.com"
                                    />
                                    {errors.email && <span className="error-msg">{errors.email}</span>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="subject">Subject</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className={errors.subject ? 'error' : ''}
                                        placeholder="How can we help?"
                                    />
                                    {errors.subject && <span className="error-msg">{errors.subject}</span>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className={errors.message ? 'error' : ''}
                                        placeholder="Write your message here..."
                                        rows="5"
                                    ></textarea>
                                    {errors.message && <span className="error-msg">{errors.message}</span>}
                                </div>

                                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <>
                                            <Loader size={20} className="spin" /> Sending...
                                        </>
                                    ) : (
                                        <>
                                            Send Message <Send size={20} />
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default ContactPage;
