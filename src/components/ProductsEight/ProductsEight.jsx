import React, { useEffect, useRef, useState } from 'react';
import './ProductsEight.css';
import productsData from '../../data/products.json';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, X, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ProductsEight = () => {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);
    const [activeVideo, setActiveVideo] = useState(null);
    const videoRefs = useRef({});

    useEffect(() => {
        const section = sectionRef.current;
        const container = containerRef.current;
        const cards = gsap.utils.toArray('.p8-card');

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
                end: () => `+=${getScrollAmount() * -1 + 200}`, // Extra scroll space
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true,
            }
        });

        // Scaling Animation for each card
        cards.forEach((card) => {
            gsap.fromTo(card,
                { scale: 0.8, opacity: 0.5, filter: 'blur(2px)' },
                {
                    scale: 1.1,
                    opacity: 1,
                    filter: 'blur(0px)',
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: card,
                        containerAnimation: scrollTween,
                        start: "center right", // When card center hits viewport right
                        end: "center center",   // When card center hits viewport center
                        scrub: true,
                        toggleActions: "play reverse play reverse"
                    }
                }
            );

            // Scale down as it leaves center
            gsap.to(card, {
                scale: 0.8,
                opacity: 0.5,
                filter: 'blur(2px)',
                scrollTrigger: {
                    trigger: card,
                    containerAnimation: scrollTween,
                    start: "center center",
                    end: "center left",
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
        <section className="products-eight-section" ref={sectionRef}>
            <div className="p8-header-fixed">
                <h2>Our <span className="p8-accent">Collection</span></h2>
                <p>Horizontal Scaling Gallery</p>
            </div>

            <div className="p8-container" ref={containerRef}>
                {productsData.map((product, index) => (
                    <div key={product.id} className="p8-card">
                        <div className="p8-card-inner">
                            <div className="p8-image-wrapper" onClick={() => handlePlay(product.id)}>
                                <img src={product.image} alt={product.title} className="p8-img" />
                                <div className="p8-overlay">
                                    <div className="p8-play-btn">
                                        <Play size={32} fill="currentColor" />
                                    </div>
                                    <span>EXPLORE</span>
                                </div>
                                <div className="p8-number">0{index + 1}</div>
                            </div>

                            <div className="p8-content">
                                <h3 className="p8-title">{product.title}</h3>
                                <p className="p8-cat">{product.category}</p>
                                <div className="p8-line"></div>
                                <div className="p8-footer">
                                    <span className="p8-price">{product.price}</span>
                                    <button className="p8-btn">
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
                <div className="p8-modal-overlay" onClick={handleClose}>
                    <div className="p8-modal-content" onClick={e => e.stopPropagation()}>
                        <button className="p8-close-btn" onClick={handleClose}>
                            <X size={24} />
                        </button>
                        <video
                            ref={el => videoRefs.current[activeVideo] = el}
                            src={productsData.find(p => p.id === activeVideo)?.videoUrl}
                            controls
                            className="p8-modal-video"
                        />
                    </div>
                </div>
            )}
        </section>
    );
};

export default ProductsEight;
