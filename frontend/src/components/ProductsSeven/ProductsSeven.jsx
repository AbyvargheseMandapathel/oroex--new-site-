import React, { useState, useRef, useEffect } from 'react';
import './ProductsSeven.css';
import productsData from '../../data/products.json';
import { Play, X, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';

const ProductsSeven = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [videoModal, setVideoModal] = useState({ isOpen: false, videoUrl: '' });
    const sliderRef = useRef(null);
    const cardsRef = useRef([]);

    const totalSlides = productsData.length;

    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 1) % totalSlides);
    };

    const prevSlide = () => {
        setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    const openVideo = (url) => {
        setVideoModal({ isOpen: true, videoUrl: url });
    };

    const closeVideo = () => {
        setVideoModal({ isOpen: false, videoUrl: '' });
    };

    // Animation Effect on Slide Change
    useEffect(() => {
        const cards = cardsRef.current;

        gsap.to(cards, {
            xPercent: -100 * activeIndex,
            duration: 0.8,
            ease: "power3.inOut"
        });

        // Animate active card content
        const activeCard = cards[activeIndex];
        if (activeCard) {
            const content = activeCard.querySelector('.p7-content');
            const img = activeCard.querySelector('.p7-img');

            gsap.fromTo(content,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, delay: 0.3 }
            );

            gsap.fromTo(img,
                { scale: 1.2 },
                { scale: 1, duration: 1, ease: "power2.out" }
            );
        }

    }, [activeIndex]);

    return (
        <section className="products-seven-section">
            <div className="p7-bg-glow"></div>

            <div className="p7-header">
                <h2>Industrial <span className="p7-accent">Mastery</span></h2>
                <div className="p7-nav">
                    <button className="p7-nav-btn" onClick={prevSlide}><ChevronLeft /></button>
                    <div className="p7-indicators">
                        {productsData.map((_, idx) => (
                            <span
                                key={idx}
                                className={`p7-dot ${idx === activeIndex ? 'active' : ''}`}
                                onClick={() => setActiveIndex(idx)}
                            ></span>
                        ))}
                    </div>
                    <button className="p7-nav-btn" onClick={nextSlide}><ChevronRight /></button>
                </div>
            </div>

            <div className="p7-slider-container">
                <div className="p7-track" ref={sliderRef}>
                    {productsData.map((product, index) => (
                        <div
                            key={product.id}
                            className={`p7-card ${index === activeIndex ? 'active' : ''}`}
                            ref={el => cardsRef.current[index] = el}
                        >
                            <div className="p7-card-inner">
                                <div className="p7-image-wrapper" onClick={() => openVideo(product.videoUrl)}>
                                    <img src={product.image} alt={product.title} className="p7-img" />
                                    <div className="p7-overlay">
                                        <div className="p7-play-btn">
                                            <Play size={32} fill="currentColor" />
                                        </div>
                                        <span>WATCH DEMO</span>
                                    </div>
                                    <div className="p7-category">{product.category}</div>
                                </div>

                                <div className="p7-content">
                                    <h3 className="p7-title">{product.title}</h3>
                                    <p className="p7-desc">{product.description}</p>
                                    <div className="p7-footer">
                                        <span className="p7-price">{product.price}</span>
                                        <button className="p7-cta">
                                            DETAILS <ArrowRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Video Modal */}
            {videoModal.isOpen && (
                <div className="p7-modal-overlay" onClick={closeVideo}>
                    <div className="p7-modal-content" onClick={e => e.stopPropagation()}>
                        <button className="p7-close-btn" onClick={closeVideo}>
                            <X size={24} />
                        </button>
                        <video
                            src={videoModal.videoUrl}
                            controls
                            autoPlay
                            className="p7-modal-video"
                        />
                    </div>
                </div>
            )}
        </section>
    );
};

export default ProductsSeven;
