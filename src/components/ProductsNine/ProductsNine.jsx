import React, { useEffect, useRef, useState } from 'react';
import './ProductsNine.css';
import productsData from '../../data/products.json';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, X, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ProductsNine = () => {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);
    const [activeVideo, setActiveVideo] = useState(null);
    const videoRefs = useRef({});

    useEffect(() => {
        const section = sectionRef.current;
        const container = containerRef.current;
        const cards = gsap.utils.toArray('.p9-card');

        // Calculate total scroll amount
        const getScrollAmount = () => {
            let containerWidth = container.scrollWidth;
            return -(containerWidth - window.innerWidth);
        };

        const scrollTween = gsap.to(container, {
            x: getScrollAmount,
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: () => `+=${getScrollAmount() * -1 + 500}`,
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true,
            }
        });

        // Scaling Animation
        cards.forEach((card) => {
            gsap.fromTo(card,
                { scale: 0.85, opacity: 0.6, filter: 'blur(3px)' },
                {
                    scale: 1.1,
                    opacity: 1,
                    filter: 'blur(0px)',
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: card,
                        containerAnimation: scrollTween,
                        start: "center 60%", // Adjusted trigger points
                        end: "center 40%",
                        scrub: true,
                        toggleActions: "play reverse play reverse"
                    }
                }
            );

            gsap.to(card, {
                scale: 0.85,
                opacity: 0.6,
                filter: 'blur(3px)',
                scrollTrigger: {
                    trigger: card,
                    containerAnimation: scrollTween,
                    start: "center 40%",
                    end: "center 20%",
                    scrub: true,
                    toggleActions: "play reverse play reverse"
                }
            });
        });

        return () => {
            scrollTween.kill();
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
        <section className="products-nine-section" ref={sectionRef}>
            <div className="p9-header-container">
                <h2 className="p9-main-title">Our <span className="p9-accent">Collection</span></h2>
                <p className="p9-subtitle">Horizontal Scaling Gallery</p>
            </div>

            <div className="p9-scroll-container" ref={containerRef}>
                {productsData.map((product, index) => (
                    <div key={product.id} className="p9-card">
                        <div className="p9-card-inner">
                            <div className="p9-image-wrapper" onClick={() => handlePlay(product.id)}>
                                <img src={product.image} alt={product.title} className="p9-img" />
                                <div className="p9-overlay">
                                    <div className="p9-play-btn">
                                        <Play size={32} fill="currentColor" />
                                    </div>
                                    <span>EXPLORE</span>
                                </div>
                                <div className="p9-number">0{index + 1}</div>
                            </div>

                            <div className="p9-content">
                                <h3 className="p9-title">{product.title}</h3>
                                <p className="p9-cat">{product.category}</p>
                                <div className="p9-line"></div>
                                <div className="p9-footer">
                                    <span className="p9-price">{product.price}</span>
                                    <button className="p9-btn">
                                        <ArrowRight size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Video Modal */}
            {activeVideo && (
                <div className="p9-modal-overlay" onClick={handleClose}>
                    <div className="p9-modal-content" onClick={e => e.stopPropagation()}>
                        <button className="p9-close-btn" onClick={handleClose}>
                            <X size={24} />
                        </button>
                        <video
                            ref={el => videoRefs.current[activeVideo] = el}
                            src={productsData.find(p => p.id === activeVideo)?.videoUrl}
                            controls
                            className="p9-modal-video"
                        />
                    </div>
                </div>
            )}
        </section>
    );
};

export default ProductsNine;
