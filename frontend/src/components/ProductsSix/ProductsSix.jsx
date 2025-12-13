import React, { useEffect, useRef, useState } from 'react';
import './ProductsSix.css';
import productsData from '../../data/products.json';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, X, ArrowRight, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ProductsSix = () => {
    const containerRef = useRef(null);
    const [activeVideo, setActiveVideo] = useState(null);
    const videoRefs = useRef({});

    useEffect(() => {
        const sections = gsap.utils.toArray('.p6-section');

        sections.forEach((section, i) => {
            const content = section.querySelector('.p6-content');
            const image = section.querySelector('.p6-image-wrapper');
            const bgText = section.querySelector('.p6-bg-text');

            // Animate content in when section comes into view
            gsap.fromTo(content.children,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top center",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            // Parallax effect for image
            gsap.fromTo(image,
                { y: 100, scale: 1.1 },
                {
                    y: -50,
                    scale: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                }
            );

            // Background text parallax
            gsap.fromTo(bgText,
                { x: '100%' },
                {
                    x: '-100%',
                    ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1
                    }
                }
            );
        });

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
        <div className="products-six-container" ref={containerRef}>
            <div className="p6-main-header">
                <h2>Our <span className="p6-accent">Products</span></h2>
                <div className="p6-scroll-hint">
                    <div className="p6-mouse"></div>
                    <span>SCROLL</span>
                </div>
            </div>

            {productsData.map((product, index) => (
                <section key={product.id} className="p6-section">
                    <div className="p6-bg-text">{product.category}</div>

                    <div className="p6-inner">
                        <div className="p6-content">
                            <div className="p6-number">0{index + 1}</div>
                            <h3 className="p6-title">{product.title}</h3>
                            <div className="p6-tags">
                                <span>{product.category}</span>
                                <span>Industrial Grade</span>
                            </div>
                            <p className="p6-desc">{product.description}</p>

                            <ul className="p6-features">
                                <li><CheckCircle2 size={16} className="p6-icon" /> High Efficiency</li>
                                <li><CheckCircle2 size={16} className="p6-icon" /> 24/7 Support</li>
                                <li><CheckCircle2 size={16} className="p6-icon" /> 5 Year Warranty</li>
                            </ul>

                            <div className="p6-price-row">
                                <span className="p6-price">{product.price}</span>
                                <button className="p6-btn">
                                    View Details <ArrowRight size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="p6-visual">
                            <div className="p6-image-wrapper">
                                <img src={product.image} alt={product.title} className="p6-img" />
                                <div className="p6-overlay">
                                    <button className="p6-play-btn" onClick={() => handlePlay(product.id)}>
                                        <Play size={32} fill="currentColor" />
                                        <span>WATCH VIDEO</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Video Modal */}
                    {activeVideo === product.id && (
                        <div className="p6-video-modal">
                            <button className="p6-modal-close" onClick={handleClose}>
                                <X size={32} />
                            </button>
                            <div className="p6-video-container">
                                <video
                                    ref={el => videoRefs.current[product.id] = el}
                                    src={product.videoUrl}
                                    controls
                                    className="p6-modal-video"
                                />
                            </div>
                        </div>
                    )}
                </section>
            ))}
        </div>
    );
};

export default ProductsSix;
