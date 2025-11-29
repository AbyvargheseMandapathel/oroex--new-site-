import React, { useEffect, useRef, useState } from 'react';
import './ProductsFive.css';
import productsData from '../../data/products.json';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, X, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ProductsFive = () => {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);
    const [expandedId, setExpandedId] = useState(null);
    const videoRefs = useRef({});

    useEffect(() => {
        const section = sectionRef.current;
        const container = containerRef.current;

        // Horizontal Scroll Logic
        const getScrollAmount = () => {
            let containerWidth = container.scrollWidth;
            return -(containerWidth - window.innerWidth);
        };

        const tween = gsap.to(container, {
            x: getScrollAmount,
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: () => `+=${getScrollAmount() * -1 + 500}`, // Add some scroll distance
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true,
            }
        });

        // Skew Effect on Scroll
        let proxy = { skew: 0 },
            skewSetter = gsap.quickSetter(".p5-card", "skewX", "deg"),
            clamp = gsap.utils.clamp(-10, 10);

        ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            onUpdate: (self) => {
                let skew = clamp(self.getVelocity() / -300);
                if (Math.abs(skew) > Math.abs(proxy.skew)) {
                    proxy.skew = skew;
                    gsap.to(proxy, {
                        skew: 0,
                        duration: 0.8,
                        ease: "power3",
                        overwrite: true,
                        onUpdate: () => skewSetter(proxy.skew)
                    });
                }
            }
        });

        return () => {
            tween.kill();
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    const handleCardClick = (id) => {
        setExpandedId(id);
        setTimeout(() => {
            if (videoRefs.current[id]) {
                videoRefs.current[id].play().catch(e => console.log("Autoplay blocked", e));
            }
        }, 300); // Delay for expansion animation
    };

    const handleClose = (e) => {
        e.stopPropagation();
        if (expandedId && videoRefs.current[expandedId]) {
            videoRefs.current[expandedId].pause();
        }
        setExpandedId(null);
    };

    return (
        <section className="products-five-section" ref={sectionRef}>
            <div className="p5-bg-text">INNOVATION</div>

            <div className="p5-header-fixed">
                <h2>Product <span className="p5-accent">Gallery</span></h2>
                <p>Scroll to explore</p>
            </div>

            <div className="p5-container" ref={containerRef}>
                {productsData.map((product, index) => {
                    const isExpanded = expandedId === product.id;

                    return (
                        <div
                            key={product.id}
                            className={`p5-card ${isExpanded ? 'expanded' : ''}`}
                            onClick={() => !isExpanded && handleCardClick(product.id)}
                        >
                            <div className="p5-card-inner">
                                <div className="p5-media">
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="p5-img"
                                    />
                                    <div className="p5-overlay">
                                        <div className="p5-play-icon">
                                            <Play size={40} fill="currentColor" />
                                        </div>
                                        <span className="p5-view-text">Click to View</span>
                                    </div>

                                    {/* Video Player (Only renders/plays when expanded) */}
                                    <div className={`p5-video-wrapper ${isExpanded ? 'visible' : ''}`}>
                                        <video
                                            ref={el => videoRefs.current[product.id] = el}
                                            src={product.videoUrl}
                                            className="p5-video"
                                            loop
                                            playsInline
                                            controls={false}
                                        />
                                        <button className="p5-close-btn" onClick={handleClose}>
                                            <X size={30} />
                                        </button>

                                        <div className="p5-video-info">
                                            <h3>{product.title}</h3>
                                            <p>{product.description}</p>
                                            <button className="p5-cta-btn">
                                                Get Quote <ArrowUpRight size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="p5-info">
                                    <span className="p5-cat">{product.category}</span>
                                    <h3 className="p5-title">{product.title}</h3>
                                    <div className="p5-price">{product.price}</div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default ProductsFive;
