import React, { useEffect, useRef, useState } from 'react';
import './ProductsThirteen.css';
import productsData from '../../data/products.json';
import gsap from 'gsap';
import { Play, ArrowRight, Plus } from 'lucide-react';
import InlineVideoPlayer from './InlineVideoPlayer';

const ProductsThirteen = () => {
    const sectionRef = useRef(null);
    const cardsRef = useRef([]);
    const indicatorsRef = useRef([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [activeVideo, setActiveVideo] = useState(null);

    // Limit to first 5 for the main slider
    const displayLimit = 5;
    const hasMore = productsData.length > displayLimit;
    const visibleProducts = productsData.slice(0, displayLimit);
    // Total items in the stack = visible products + 1 (for the "View More" card if it exists)
    const totalStackItems = hasMore ? visibleProducts.length + 1 : visibleProducts.length;

    useEffect(() => {
        const cards = cardsRef.current;
        const indicators = indicatorsRef.current;

        if (!cards.length) return;

        // Reset active video when slide changes
        setActiveVideo(null);

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
                    duration: 0.5,
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
                    duration: 0.5,
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
                    duration: 0.5,
                    ease: "power2.out",
                    overwrite: true
                });
            }
        });

        // Update Indicators
        indicators.forEach((ind, index) => {
            if (!ind) return;
            if (index === activeIndex) {
                gsap.to(ind, { color: '#e63946', scale: 1.1, opacity: 1, x: 10, duration: 0.3 });
            } else {
                gsap.to(ind, { color: '#fff', scale: 1, opacity: 0.3, x: 0, duration: 0.3 });
            }
        });

    }, [activeIndex, totalStackItems]);

    // Initial Set
    useEffect(() => {
        const cards = cardsRef.current;
        gsap.set(cards, { xPercent: 120 });
        gsap.set(cards[0], { xPercent: 0 });
    }, []);

    const handlePlay = (id, e) => {
        e.stopPropagation(); // Prevent triggering other clicks if any
        setActiveVideo(id);
    };

    const handleCloseVideo = () => {
        setActiveVideo(null);
    };

    return (
        <section className="products-thirteen-section" ref={sectionRef}>
            <div className="p13-bg-grid"></div>

            <div className="p13-layout">
                {/* Left Indicator Sidebar */}
                <div className="p13-sidebar">
                    <div className="p13-sidebar-header">
                        <h3>Collection</h3>
                        <div className="p13-sidebar-line"></div>
                    </div>
                    <div className="p13-indicators-list">
                        {visibleProducts.map((product, index) => (
                            <div
                                key={product.id}
                                className="p13-indicator-item"
                                ref={el => indicatorsRef.current[index] = el}
                                onMouseEnter={() => setActiveIndex(index)}
                            >
                                <span className="p13-ind-num">0{index + 1}</span>
                                <span className="p13-ind-title">{product.title}</span>
                            </div>
                        ))}
                        {hasMore && (
                            <div
                                className="p13-indicator-item p13-view-more-ind"
                                ref={el => indicatorsRef.current[visibleProducts.length] = el}
                                onMouseEnter={() => setActiveIndex(visibleProducts.length)}
                            >
                                <span className="p13-ind-num">+</span>
                                <span className="p13-ind-title">View More</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Stack Area */}
                <div className="p13-stack-area">
                    <div className="p13-main-header">
                        <h2>OUR Products</h2>
                        <p className="p13-subheading">
                            Explore our range of industrial solutions
                        </p>
                    </div>

                    <div className="p13-cards-wrapper">
                        {visibleProducts.map((product, index) => (
                            <div
                                key={product.id}
                                className="p13-card"
                                ref={el => cardsRef.current[index] = el}
                            >
                                <div className="p13-card-content">
                                    <div className="p13-info">
                                        <div className="p13-index">0{index + 1}</div>
                                        <h3 className="p13-title">{product.title}</h3>
                                        <div className="p13-category">{product.category}</div>
                                        <p className="p13-desc">{product.description}</p>
                                        <div className="p13-specs">
                                            <div className="p13-spec-item">
                                                <Plus size={14} className="p13-accent" /> High Efficiency
                                            </div>
                                            <div className="p13-spec-item">
                                                <Plus size={14} className="p13-accent" /> Durable Build
                                            </div>
                                        </div>
                                        <div className="p13-actions">
                                            <span className="p13-price">{product.price}</span>
                                            <button className="p13-cta">
                                                View Specs <ArrowRight size={16} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="p13-visual">
                                        {activeVideo === product.id ? (
                                            <InlineVideoPlayer
                                                videoUrl={product.videoUrl}
                                                poster={product.image}
                                                onClose={handleCloseVideo}
                                            />
                                        ) : (
                                            <>
                                                <img src={product.image} alt={product.title} className="p13-img" />
                                                <div className="p13-overlay" onClick={(e) => handlePlay(product.id, e)}>
                                                    <div className="p13-play-circle">
                                                        <Play size={28} fill="currentColor" />
                                                    </div>
                                                    <span>WATCH VIDEO</span>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* View More Card */}
                        {hasMore && (
                            <div
                                className="p13-card p13-view-more-card"
                                ref={el => cardsRef.current[visibleProducts.length] = el}
                            >
                                <div className="p13-view-more-content">
                                    <h3>Discover Our Full Range</h3>
                                    <p>Explore our complete catalog of explosion-proof solutions.</p>
                                    <button className="p13-view-more-btn">View All Products</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductsThirteen;
