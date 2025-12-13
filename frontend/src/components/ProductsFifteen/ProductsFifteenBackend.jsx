import React, { useEffect, useRef, useState } from 'react';
import './ProductsFifteen.css'; // Reuse CSS
import gsap from 'gsap';
import { Play, ArrowRight, Plus } from 'lucide-react';
import InlineVideoPlayer from './InlineVideoPlayer';
import { getHomepageProducts } from '../../api';

const ProductsFifteenBackend = () => {
    const sectionRef = useRef(null);
    const cardsRef = useRef([]);
    const indicatorsRef = useRef([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [activeVideo, setActiveVideo] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getHomepageProducts()
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch homepage products", err);
                setLoading(false);
            });
    }, []);

    // Limit to first 5 for the main slider loop if needed, but backend already limits to 15.
    // The design seems to stack all of them or a subset. 
    // Let's assume we display top 5 stacked and a view more if more exist.
    const displayLimit = 5;
    const hasMore = products.length > displayLimit;
    const visibleProducts = products.slice(0, displayLimit);
    const totalStackItems = hasMore ? visibleProducts.length + 1 : visibleProducts.length;

    useEffect(() => {
        if (!products.length) return;

        let mm = gsap.matchMedia();
        const cards = cardsRef.current;
        const indicators = indicatorsRef.current;

        // Desktop Animation Context
        mm.add("(min-width: 1025px)", () => {
            if (!cards.length) return;

            // Reset active video when slide changes
            // setActiveVideo(null); 

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

            // Indicators Animation
            indicators.forEach((ind, index) => {
                if (!ind) return;
                if (index === activeIndex) {
                    gsap.to(ind, { color: '#e63946', scale: 1.1, opacity: 1, x: 10, duration: 0.3 });
                } else {
                    gsap.to(ind, { color: '#fff', scale: 1, opacity: 0.3, x: 0, duration: 0.3 });
                }
            });
        });

        // Mobile Context
        mm.add("(max-width: 1024px)", () => {
            gsap.set(cards, { clearProps: "all" });
        });

        return () => mm.revert();
    }, [activeIndex, totalStackItems, products]);

    // Initial Set for Desktop
    useEffect(() => {
        if (!products.length) return;
        let mm = gsap.matchMedia();
        mm.add("(min-width: 1025px)", () => {
            const cards = cardsRef.current;
            gsap.set(cards, { xPercent: 120 });
            if (cards[0]) gsap.set(cards[0], { xPercent: 0 });
        });
        return () => mm.revert();
    }, [products]);

    const handlePlay = (id, e) => {
        e.stopPropagation();
        setActiveVideo(id);
    };

    const handleCloseVideo = () => {
        setActiveVideo(null);
    };

    if (loading) return null; // Or skeleton

    if (products.length === 0) return null;

    return (
        <section className="products-fifteen-section" ref={sectionRef}>
            <div className="p15-bg-grid"></div>

            <div className="p15-layout">
                {/* Left Indicator Sidebar */}
                <div className="p15-sidebar">
                    <div className="p15-sidebar-header">
                        <h3>Collection</h3>
                        <div className="p15-sidebar-line"></div>
                    </div>
                    <div className="p15-indicators-list">
                        {visibleProducts.map((product, index) => (
                            <div
                                key={product.id}
                                className="p15-indicator-item"
                                ref={el => indicatorsRef.current[index] = el}
                                onMouseEnter={() => setActiveIndex(index)}
                            >
                                <span className="p15-ind-num">0{index + 1}</span>
                                <span className="p15-ind-title">{product.title}</span>
                            </div>
                        ))}
                        {hasMore && (
                            <div
                                className="p15-indicator-item p15-view-more-ind"
                                ref={el => indicatorsRef.current[visibleProducts.length] = el}
                                onMouseEnter={() => setActiveIndex(visibleProducts.length)}
                            >
                                <span className="p15-ind-num">+</span>
                                <span className="p15-ind-title">View More</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Stack/List Area */}
                <div className="p15-stack-area">
                    <div className="p15-main-header">
                        <h2>OUR Products</h2>
                        <p className="p15-subheading">
                            Explore our range of industrial solutions
                        </p>
                    </div>

                    <div className="p15-cards-wrapper">
                        {visibleProducts.map((product, index) => (
                            <div
                                key={product.id}
                                className="p15-card"
                                ref={el => cardsRef.current[index] = el}
                            >
                                <div className="p15-card-content">
                                    <div className="p15-info">
                                        <div className="p15-index">0{index + 1}</div>
                                        <h3 className="p15-title">{product.title}</h3>
                                        <div className="p15-category">{product.subcategory}</div>
                                        <p className="p15-desc">{product.description}</p>

                                        {product.features && product.features.length > 0 && (
                                            <div className="p15-specs">
                                                {product.features.map((feature, i) => (
                                                    <div className="p15-spec-item" key={i}>
                                                        <Plus size={14} className="p15-accent" /> {feature}
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        <div className="p15-actions">
                                            <span className="p15-price">{product.price}</span>
                                            <button className="p15-cta">
                                                View Specs <ArrowRight size={16} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="p15-visual">
                                        {activeVideo === product.id ? (
                                            <InlineVideoPlayer
                                                videoUrl={product.videoUrl}
                                                poster={product.image}
                                                onClose={handleCloseVideo}
                                            />
                                        ) : (
                                            <>
                                                <img src={product.image} alt={product.title} className="p15-img" />
                                                {product.videoUrl && (
                                                    <div className="p15-overlay" onClick={(e) => handlePlay(product.id, e)}>
                                                        <div className="p15-play-circle">
                                                            <Play size={28} fill="currentColor" />
                                                        </div>
                                                        <span>WATCH VIDEO</span>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* View More Card */}
                        {hasMore && (
                            <div
                                className="p15-card p15-view-more-card"
                                ref={el => cardsRef.current[visibleProducts.length] = el}
                            >
                                <div className="p15-view-more-content">
                                    <h3>Discover Our Full Range</h3>
                                    <p>Explore our complete catalog of explosion-proof solutions.</p>
                                    <button className="p15-view-more-btn">View All Products</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductsFifteenBackend;
