import React, { useEffect, useRef, useState } from 'react';
import './ProductsTen.css';
import productsData from '../../data/products.json';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, X, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ProductsTen = () => {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);
    const [activeVideo, setActiveVideo] = useState(null);
    const videoRefs = useRef({});

    useEffect(() => {
        const section = sectionRef.current;
        const container = containerRef.current;
        const cards = gsap.utils.toArray('.p10-card');

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

        // 3D Rotation Animation
        cards.forEach((card) => {
            // Rotate IN (Left to Center)
            gsap.fromTo(card,
                {
                    rotationY: 45,
                    scale: 0.8,
                    opacity: 0.5,
                    z: -100
                },
                {
                    rotationY: 0,
                    scale: 1.1,
                    opacity: 1,
                    z: 0,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: card,
                        containerAnimation: scrollTween,
                        start: "center 80%",
                        end: "center center",
                        scrub: true,
                    }
                }
            );

            // Rotate OUT (Center to Right)
            gsap.to(card, {
                rotationY: -45,
                scale: 0.8,
                opacity: 0.5,
                z: -100,
                scrollTrigger: {
                    trigger: card,
                    containerAnimation: scrollTween,
                    start: "center center",
                    end: "center 20%",
                    scrub: true,
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
        <section className="products-ten-section" ref={sectionRef}>
            <div className="p10-header">
                <h2>Future <span className="p10-accent">Ready</span></h2>
                <p>3D Perspective Showcase</p>
            </div>

            <div className="p10-viewport">
                <div className="p10-container" ref={containerRef}>
                    {productsData.map((product, index) => (
                        <div key={product.id} className="p10-card">
                            <div className="p10-card-inner">
                                <div className="p10-media" onClick={() => handlePlay(product.id)}>
                                    <img src={product.image} alt={product.title} className="p10-img" />
                                    <div className="p10-overlay">
                                        <div className="p10-play-btn">
                                            <Play size={32} fill="currentColor" />
                                        </div>
                                        <span>VIEW DEMO</span>
                                    </div>
                                    <div className="p10-badge">{product.category}</div>
                                </div>

                                <div className="p10-content">
                                    <div className="p10-number">0{index + 1}</div>
                                    <h3 className="p10-title">{product.title}</h3>
                                    <p className="p10-desc">{product.description}</p>
                                    <div className="p10-footer">
                                        <span className="p10-price">{product.price}</span>
                                        <button className="p10-btn">
                                            <ArrowUpRight size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Video Modal */}
            {activeVideo && (
                <div className="p10-modal-overlay" onClick={handleClose}>
                    <div className="p10-modal-content" onClick={e => e.stopPropagation()}>
                        <button className="p10-close-btn" onClick={handleClose}>
                            <X size={24} />
                        </button>
                        <video
                            ref={el => videoRefs.current[activeVideo] = el}
                            src={productsData.find(p => p.id === activeVideo)?.videoUrl}
                            controls
                            className="p10-modal-video"
                        />
                    </div>
                </div>
            )}
        </section>
    );
};

export default ProductsTen;
