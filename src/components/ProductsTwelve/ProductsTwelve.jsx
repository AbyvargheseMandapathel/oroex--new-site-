import React, { useEffect, useRef, useState } from 'react';
import './ProductsTwelve.css';
import productsData from '../../data/products.json';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, X, ArrowRight, Plus } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ProductsTwelve = () => {
    const sectionRef = useRef(null);
    const cardsRef = useRef([]);
    const indicatorsRef = useRef([]);
    const [activeVideo, setActiveVideo] = useState(null);
    const videoRefs = useRef({});

    useEffect(() => {
        const section = sectionRef.current;
        const cards = cardsRef.current;
        const indicators = indicatorsRef.current;

        if (!cards.length) return;

        const totalCards = cards.length;

        ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: `+=${totalCards * 100}%`,
            pin: true,
            scrub: 1,
            onUpdate: (self) => {
                const progress = self.progress * (totalCards - 1);
                const activeIndex = Math.floor(progress);

                // Update Cards
                cards.forEach((card, index) => {
                    if (index < activeIndex) {
                        // Past: Stacked behind
                        gsap.to(card, {
                            xPercent: -5 * (activeIndex - index), // Move slightly left
                            scale: 1 - (activeIndex - index) * 0.05,
                            opacity: 1 - (activeIndex - index) * 0.2,
                            filter: 'blur(2px)',
                            zIndex: index,
                            duration: 0.5,
                            overwrite: true
                        });
                    } else if (index === activeIndex) {
                        // Active: Center
                        gsap.to(card, {
                            xPercent: 0,
                            scale: 1,
                            opacity: 1,
                            filter: 'blur(0px)',
                            zIndex: 100,
                            duration: 0.5,
                            overwrite: true
                        });
                    } else {
                        // Future: Off-screen Right
                        gsap.to(card, {
                            xPercent: 120, // Start from right
                            scale: 1,
                            opacity: 1,
                            zIndex: 100 + index,
                            duration: 0.5,
                            overwrite: true
                        });
                    }
                });

                // Update Indicators
                indicators.forEach((ind, index) => {
                    if (index === activeIndex) {
                        gsap.to(ind, { color: '#e63946', scale: 1.1, opacity: 1, x: 10, duration: 0.3 });
                    } else {
                        gsap.to(ind, { color: '#fff', scale: 1, opacity: 0.3, x: 0, duration: 0.3 });
                    }
                });
            }
        });

        // Initial Set
        gsap.set(cards, { xPercent: 120 });
        gsap.set(cards[0], { xPercent: 0 });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    const handlePlay = (id) => {
        setActiveVideo(id);
        setTimeout(() => {
            if (videoRefs.current[id]) {
                videoRefs.current[id].play();
            }
        }, 100);
    };

    const handleClose = () => {
        if (activeVideo && videoRefs.current[activeVideo]) {
            videoRefs.current[activeVideo].pause();
        }
        setActiveVideo(null);
    };

    return (
        <section className="products-twelve-section" ref={sectionRef}>
            <div className="p12-bg-grid"></div>

            <div className="p12-layout">
                {/* Left Indicator Sidebar */}
                <div className="p12-sidebar">
                    <div className="p12-sidebar-header">
                        <h3>Collection</h3>
                        <div className="p12-sidebar-line"></div>
                    </div>
                    <div className="p12-indicators-list">
                        {productsData.map((product, index) => (
                            <div
                                key={product.id}
                                className="p12-indicator-item"
                                ref={el => indicatorsRef.current[index] = el}
                            >
                                <span className="p12-ind-num">0{index + 1}</span>
                                <span className="p12-ind-title">{product.title}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Stack Area */}
                <div className="p12-stack-area">
                    {productsData.map((product, index) => (
                        <div
                            key={product.id}
                            className="p12-card"
                            ref={el => cardsRef.current[index] = el}
                        >
                            <div className="p12-card-content">
                                <div className="p12-info">
                                    <div className="p12-index">0{index + 1}</div>
                                    <h3 className="p12-title">{product.title}</h3>
                                    <div className="p12-category">{product.category}</div>
                                    <p className="p12-desc">{product.description}</p>
                                    <div className="p12-specs">
                                        <div className="p12-spec-item">
                                            <Plus size={14} className="p12-accent" /> High Efficiency
                                        </div>
                                        <div className="p12-spec-item">
                                            <Plus size={14} className="p12-accent" /> Durable Build
                                        </div>
                                    </div>
                                    <div className="p12-actions">
                                        <span className="p12-price">{product.price}</span>
                                        <button className="p12-cta">
                                            View Specs <ArrowRight size={16} />
                                        </button>
                                    </div>
                                </div>

                                <div className="p12-visual" onClick={() => handlePlay(product.id)}>
                                    <img src={product.image} alt={product.title} className="p12-img" />
                                    <div className="p12-overlay">
                                        <div className="p12-play-circle">
                                            <Play size={28} fill="currentColor" />
                                        </div>
                                        <span>WATCH VIDEO</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Video Modal */}
            {activeVideo && (
                <div className="p12-modal-overlay" onClick={handleClose}>
                    <div className="p12-modal-content" onClick={e => e.stopPropagation()}>
                        <button className="p12-close-btn" onClick={handleClose}>
                            <X size={24} />
                        </button>
                        <video
                            ref={el => videoRefs.current[activeVideo] = el}
                            src={productsData.find(p => p.id === activeVideo)?.videoUrl}
                            controls
                            className="p12-modal-video"
                        />
                    </div>
                </div>
            )}
        </section>
    );
};

export default ProductsTwelve;
