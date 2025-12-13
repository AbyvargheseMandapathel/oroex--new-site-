import React, { useEffect, useRef, useState } from 'react';
import './ProductsTwelve.css';
import productsData from '../../data/products.json';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Play, X, ArrowRight, Plus } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const ProductsTwelve = () => {
    const sectionRef = useRef(null);
    const cardsRef = useRef([]);
    const indicatorsRef = useRef([]);
    const [activeVideo, setActiveVideo] = useState(null);
    const videoRefs = useRef({});
    const modalRef = useRef(null);
    const scrollTriggerRef = useRef(null);

    // Limit to first 5 for the main slider
    const displayLimit = 5;
    const hasMore = productsData.length > displayLimit;
    const visibleProducts = productsData.slice(0, displayLimit);
    // Total items in the stack = visible products + 1 (for the "View More" card if it exists)
    const totalStackItems = hasMore ? visibleProducts.length + 1 : visibleProducts.length;

    useEffect(() => {
        const section = sectionRef.current;
        const cards = cardsRef.current;
        const indicators = indicatorsRef.current;

        if (!cards.length) return;

        const st = ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: `+=${totalStackItems * 150}%`, // Increased distance for smoother feel
            pin: true,
            scrub: 2, // Increased scrub for smoothness
            onUpdate: (self) => {
                const progress = self.progress * (totalStackItems - 1);
                const activeIndex = Math.floor(progress);

                // Update Cards
                cards.forEach((card, index) => {
                    if (!card) return;

                    if (index < activeIndex) {
                        // Past: Stacked behind
                        gsap.to(card, {
                            xPercent: -5 * (activeIndex - index),
                            scale: 1 - (activeIndex - index) * 0.05,
                            opacity: 1 - (activeIndex - index) * 0.2,
                            filter: 'blur(2px)',
                            zIndex: index,
                            duration: 1, // Smoother duration
                            ease: "power2.out",
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
                            duration: 1,
                            ease: "power2.out",
                            overwrite: true
                        });
                    } else {
                        // Future: Off-screen Right
                        gsap.to(card, {
                            xPercent: 120,
                            scale: 1,
                            opacity: 1,
                            zIndex: 100 + index,
                            duration: 1,
                            ease: "power2.out",
                            overwrite: true
                        });
                    }
                });

                // Update Indicators
                indicators.forEach((ind, index) => {
                    if (!ind) return;
                    if (index === activeIndex) {
                        gsap.to(ind, { color: '#e63946', scale: 1.1, opacity: 1, x: 10, duration: 0.5 });
                    } else {
                        gsap.to(ind, { color: '#fff', scale: 1, opacity: 0.3, x: 0, duration: 0.5 });
                    }
                });
            }
        });

        scrollTriggerRef.current = st;

        // Initial Set
        gsap.set(cards, { xPercent: 120 });
        gsap.set(cards[0], { xPercent: 0 });

        return () => {
            if (scrollTriggerRef.current) scrollTriggerRef.current.kill();
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, [totalStackItems]);

    // Handle Escape key for modal
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                handleClose();
            }
        };
        if (activeVideo) {
            window.addEventListener('keydown', handleEsc);
        }
        return () => window.removeEventListener('keydown', handleEsc);
    }, [activeVideo]);

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

    const handleOverlayClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            handleClose();
        }
    };

    const handleIndicatorClick = (index) => {
        if (!scrollTriggerRef.current) return;
        const st = scrollTriggerRef.current;
        // Calculate scroll position: start + (totalDistance * (index / (totalItems - 1)))
        // totalItems - 1 because the progress range is 0 to 1 mapping to 0 to lastIndex
        const progress = index / (totalStackItems - 1);
        const scrollPos = st.start + (st.end - st.start) * progress;

        gsap.to(window, {
            scrollTo: scrollPos,
            duration: 1,
            ease: "power2.out"
        });
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
                        {visibleProducts.map((product, index) => (
                            <div
                                key={product.id}
                                className="p12-indicator-item"
                                ref={el => indicatorsRef.current[index] = el}
                                onClick={() => handleIndicatorClick(index)}
                            >
                                <span className="p12-ind-num">0{index + 1}</span>
                                <span className="p12-ind-title">{product.title}</span>
                            </div>
                        ))}
                        {hasMore && (
                            <div
                                className="p12-indicator-item p12-view-more-ind"
                                ref={el => indicatorsRef.current[visibleProducts.length] = el}
                                onClick={() => handleIndicatorClick(visibleProducts.length)}
                            >
                                <span className="p12-ind-num">+</span>
                                <span className="p12-ind-title">View More</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Stack Area */}
                <div className="p12-stack-area">
                    <div className="p12-main-header">
                        <h2>OUR Products</h2>
                        <p className="p12-subheading">
                            Explore our range of industrial solutions
                        </p>
                    </div>

                    <div className="p12-cards-wrapper">
                        {visibleProducts.map((product, index) => (
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

                        {/* View More Card */}
                        {hasMore && (
                            <div
                                className="p12-card p12-view-more-card"
                                ref={el => cardsRef.current[visibleProducts.length] = el}
                            >
                                <div className="p12-view-more-content">
                                    <h3>Discover Our Full Range</h3>
                                    <p>Explore our complete catalog of explosion-proof solutions.</p>
                                    <button className="p12-view-more-btn">View All Products</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Video Modal */}
            {activeVideo && (
                <div className="p12-modal-overlay" onClick={handleOverlayClick}>
                    <div className="p12-modal-content" ref={modalRef}>
                        <button className="p12-close-btn" onClick={handleClose}>
                            <X size={32} />
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
