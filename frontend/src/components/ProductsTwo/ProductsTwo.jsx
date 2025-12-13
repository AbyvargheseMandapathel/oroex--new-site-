import React, { useEffect, useRef } from 'react';
import './ProductsTwo.css';
import productsData from '../../data/products.json';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShoppingCart, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ProductsTwo = () => {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        const container = containerRef.current;

        // Calculate the total width to scroll
        // We need to account for the window width to ensure the last item is fully visible
        const getScrollAmount = () => {
            let containerWidth = container.scrollWidth;
            return -(containerWidth - window.innerWidth + 100); // 100px buffer
        };

        const tween = gsap.to(container, {
            x: getScrollAmount,
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: () => `+=${getScrollAmount() * -1}`,
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true,
                anticipatePin: 1
            }
        });

        return () => {
            tween.kill();
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <section className="products-two-section" ref={sectionRef}>
            <div className="p2-header-fixed">
                <h2 className="p2-title">Industrial <span className="p2-highlight">Catalog</span></h2>
                <div className="p2-scroll-indicator">
                    <div className="p2-line"></div>
                    <span>SCROLL</span>
                </div>
            </div>

            <div className="p2-container" ref={containerRef}>
                {/* Intro Card */}
                <div className="p2-card intro-card">
                    <div className="p2-intro-content">
                        <h3>Premium<br />Equipment</h3>
                        <p>Explore our range of high-performance industrial machinery designed for the future.</p>
                    </div>
                </div>

                {productsData.map((product, index) => (
                    <div key={product.id} className="p2-card product-card">
                        <div className="p2-image-container">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="p2-image"
                            />
                            <div className="p2-overlay"></div>
                            <div className="p2-price-tag">{product.price}</div>
                        </div>

                        <div className="p2-content">
                            <div className="p2-top">
                                <span className="p2-cat">{product.category}</span>
                                <span className="p2-id">0{index + 1}</span>
                            </div>

                            <h3 className="p2-name">{product.title}</h3>
                            <p className="p2-desc">{product.description}</p>

                            <div className="p2-actions">
                                <button className="p2-btn-icon">
                                    <ShoppingCart size={20} />
                                </button>
                                <button className="p2-btn-text">
                                    Details <ArrowUpRight size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProductsTwo;
