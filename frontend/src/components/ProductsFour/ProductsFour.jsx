import React, { useState, useRef } from 'react';
import './ProductsFour.css';
import productsData from '../../data/products.json';
import { Play, X, ShoppingCart, ArrowUpRight } from 'lucide-react';

const ProductsFour = () => {
    const [activeVideoId, setActiveVideoId] = useState(null);
    const videoRefs = useRef({});

    const handleCardClick = (id) => {
        setActiveVideoId(id);
        setTimeout(() => {
            if (videoRefs.current[id]) {
                videoRefs.current[id].play().catch(e => console.log("Autoplay prevented", e));
            }
        }, 100);
    };

    const handleCloseVideo = (e, id) => {
        e.stopPropagation();
        if (videoRefs.current[id]) {
            videoRefs.current[id].pause();
            videoRefs.current[id].currentTime = 0;
        }
        setActiveVideoId(null);
    };

    return (
        <section className="products-four-section">
            <div className="p4-header">
                <h2 className="p4-title">Industrial <span className="p4-highlight">Innovations</span></h2>
                <p className="p4-subtitle">Click on any product to see it in action.</p>
            </div>

            <div className="p4-grid">
                {productsData.map((product) => {
                    const isPlaying = activeVideoId === product.id;

                    return (
                        <div
                            key={product.id}
                            className={`p4-card ${isPlaying ? 'playing' : ''}`}
                            onClick={() => !isPlaying && handleCardClick(product.id)}
                        >
                            <div className="p4-media-container">
                                {/* Image Layer */}
                                <div className={`p4-image-layer ${isPlaying ? 'hidden' : ''}`}>
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="p4-image"
                                    />
                                    <div className="p4-overlay">
                                        <div className="p4-play-btn">
                                            <Play size={32} fill="currentColor" />
                                        </div>
                                    </div>
                                    <div className="p4-category-badge">{product.category}</div>
                                </div>

                                {/* Video Layer */}
                                <div className={`p4-video-layer ${isPlaying ? 'visible' : ''}`}>
                                    <video
                                        ref={el => videoRefs.current[product.id] = el}
                                        src={product.videoUrl}
                                        className="p4-video"
                                        loop
                                        playsInline
                                        controls={false}
                                    />
                                    <button
                                        className="p4-close-btn"
                                        onClick={(e) => handleCloseVideo(e, product.id)}
                                    >
                                        <X size={24} />
                                    </button>
                                </div>
                            </div>

                            <div className="p4-content">
                                <div className="p4-info">
                                    <h3 className="p4-card-title">{product.title}</h3>
                                    <p className="p4-price">{product.price}</p>
                                </div>
                                <div className="p4-actions">
                                    <button className="p4-action-btn primary">
                                        <ShoppingCart size={18} />
                                    </button>
                                    <button className="p4-action-btn secondary">
                                        <ArrowUpRight size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default ProductsFour;
