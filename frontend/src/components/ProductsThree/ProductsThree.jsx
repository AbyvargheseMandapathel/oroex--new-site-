import React, { useState, useEffect, useRef } from 'react';
import './ProductsThree.css';
import productsData from '../../data/products.json';
import gsap from 'gsap';
import { ChevronLeft, ChevronRight, ShoppingCart, ArrowRight } from 'lucide-react';

const ProductsThree = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const imageRef = useRef(null);
    const contentRef = useRef(null);
    const bgTextRef = useRef(null);

    const currentProduct = productsData[currentIndex];

    const animateSlide = (direction, nextIndex) => {
        if (isAnimating) return;
        setIsAnimating(true);

        const tl = gsap.timeline({
            onComplete: () => {
                setCurrentIndex(nextIndex);
                setIsAnimating(false);
            }
        });

        // Exit animations
        tl.to('.p3-image', {
            y: direction === 'next' ? -50 : 50,
            opacity: 0,
            duration: 0.5,
            ease: 'power2.in'
        })
            .to('.p3-text-element', {
                y: -20,
                opacity: 0,
                duration: 0.4,
                stagger: 0.05,
                ease: 'power2.in'
            }, '<');

        // Enter animations (simulated by setting state then animating in)
        // Note: In a real complex slider, we'd have two sets of DOM elements. 
        // Here we use a slight delay to swap content then animate in.

        tl.call(() => {
            setCurrentIndex(nextIndex);
        });

        tl.fromTo('.p3-image',
            { y: direction === 'next' ? 50 : -50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
        )
            .fromTo('.p3-text-element',
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
                '<0.2'
            );
    };

    const nextSlide = () => {
        const nextIndex = (currentIndex + 1) % productsData.length;
        animateSlide('next', nextIndex);
    };

    const prevSlide = () => {
        const nextIndex = (currentIndex - 1 + productsData.length) % productsData.length;
        animateSlide('prev', nextIndex);
    };

    return (
        <section className="products-three-section">
            <div className="p3-bg-text" ref={bgTextRef}>PRODUCTS</div>

            <div className="p3-container">
                {/* Left Content */}
                <div className="p3-content" ref={contentRef}>
                    <div className="p3-header p3-text-element">
                        <span className="p3-label">Featured Product</span>
                        <span className="p3-counter">
                            {currentIndex + 1} <span className="p3-counter-total">/ {productsData.length}</span>
                        </span>
                    </div>

                    <h2 className="p3-title p3-text-element">{currentProduct.title}</h2>

                    <div className="p3-tags p3-text-element">
                        <span className="p3-tag">{currentProduct.category}</span>
                        <span className="p3-tag">Industrial</span>
                    </div>

                    <p className="p3-desc p3-text-element">{currentProduct.description}</p>

                    <div className="p3-price p3-text-element">{currentProduct.price}</div>

                    <div className="p3-actions p3-text-element">
                        <button className="p3-btn-primary">
                            Add to Order <ShoppingCart size={18} />
                        </button>
                        <button className="p3-btn-secondary">
                            View Specs <ArrowRight size={18} />
                        </button>
                    </div>
                </div>

                {/* Right Image */}
                <div className="p3-visual">
                    <div className="p3-image-wrapper">
                        <img
                            ref={imageRef}
                            src={currentProduct.image}
                            alt={currentProduct.title}
                            className="p3-image"
                        />
                        <div className="p3-overlay"></div>
                    </div>

                    <div className="p3-nav">
                        <button className="p3-nav-btn" onClick={prevSlide} disabled={isAnimating}>
                            <ChevronLeft size={24} />
                        </button>
                        <button className="p3-nav-btn" onClick={nextSlide} disabled={isAnimating}>
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductsThree;
