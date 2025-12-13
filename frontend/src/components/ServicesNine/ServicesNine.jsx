import React, { useState, useEffect, useRef } from 'react';
import './ServicesNine.css';
import servicesData from '../../data/services.json';
import {
    Wrench,
    Settings,
    Globe,
    Anchor,
    Cpu,
    Sun,
    ChevronLeft,
    ChevronRight,
    ArrowRight
} from 'lucide-react';

const iconMap = {
    Installation: Wrench,
    Maintenance: Settings,
    OnshoreOffshore: Globe,
    OffshoreSolutions: Anchor,
    Assembly: Cpu,
    SolarSolutions: Sun,
};

const ServicesNine = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAutoPlay, setIsAutoPlay] = useState(true);
    const videoRefs = useRef([]);

    const totalItems = servicesData.length;

    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 1) % totalItems);
    };

    const prevSlide = () => {
        setActiveIndex((prev) => (prev - 1 + totalItems) % totalItems);
    };

    // Auto-play logic
    useEffect(() => {
        if (!isAutoPlay) return;
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, [isAutoPlay]);

    // Video playback logic
    useEffect(() => {
        videoRefs.current.forEach((video, index) => {
            if (!video) return;
            if (index === activeIndex) {
                video.play().catch(() => { });
            } else {
                video.pause();
                video.currentTime = 0;
            }
        });
    }, [activeIndex]);

    const getCardStyle = (index) => {
        // Calculate distance from active index, handling wrap-around
        let diff = (index - activeIndex + totalItems) % totalItems;
        if (diff > totalItems / 2) diff -= totalItems;

        const absDiff = Math.abs(diff);

        // Only show 3 cards: center, left, right
        let opacity = 0;
        let scale = 0.8;
        let zIndex = 0;
        let translateX = '0%';
        let pointerEvents = 'none';

        if (diff === 0) {
            opacity = 1;
            scale = 1.1;
            zIndex = 10;
            translateX = '0%';
            pointerEvents = 'auto';
        } else if (diff === 1 || diff === -totalItems + 1) { // Right neighbor
            opacity = 0.4;
            scale = 0.85;
            zIndex = 5;
            translateX = '60%';
            pointerEvents = 'auto';
        } else if (diff === -1 || diff === totalItems - 1) { // Left neighbor
            opacity = 0.4;
            scale = 0.85;
            zIndex = 5;
            translateX = '-60%';
            pointerEvents = 'auto';
        }

        return {
            opacity,
            transform: `translateX(${translateX}) scale(${scale})`,
            zIndex,
            pointerEvents
        };
    };

    return (
        <section className="services-nine-section">
            <div className="s9-header">
                <h2 className="s9-title">Excellence in Motion</h2>
                <p className="s9-subtitle">Swipe to explore our industrial capabilities.</p>
            </div>

            <div
                className="s9-carousel-container"
                onMouseEnter={() => setIsAutoPlay(false)}
                onMouseLeave={() => setIsAutoPlay(true)}
            >
                <button className="s9-nav-btn prev" onClick={prevSlide}>
                    <ChevronLeft size={32} />
                </button>

                <div className="s9-cards-wrapper">
                    {servicesData.map((service, index) => {
                        const Icon = iconMap[service.icon];
                        const style = getCardStyle(index);
                        const isActive = index === activeIndex;

                        return (
                            <div
                                key={service.id}
                                className={`s9-card ${isActive ? 'active' : ''}`}
                                style={style}
                                onClick={() => setActiveIndex(index)}
                            >
                                <div className="s9-card-inner">
                                    <div className="s9-media">
                                        <video
                                            ref={el => videoRefs.current[index] = el}
                                            src={service.videoUrl}
                                            loop
                                            muted
                                            playsInline
                                            className="s9-video"
                                        />
                                        <div className="s9-overlay"></div>
                                    </div>

                                    <div className="s9-content">
                                        <div className="s9-icon-badge">
                                            {Icon && <Icon size={28} />}
                                        </div>
                                        <h3 className="s9-card-title">{service.title}</h3>

                                        <div className={`s9-details ${isActive ? 'visible' : ''}`}>
                                            <p className="s9-desc">{service.description}</p>
                                            <button className="s9-action-btn">
                                                DETAILS <ArrowRight size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <button className="s9-nav-btn next" onClick={nextSlide}>
                    <ChevronRight size={32} />
                </button>
            </div>

            <div className="s9-indicators">
                {servicesData.map((_, index) => (
                    <div
                        key={index}
                        className={`s9-dot ${index === activeIndex ? 'active' : ''}`}
                        onClick={() => setActiveIndex(index)}
                    />
                ))}
            </div>
        </section>
    );
};

export default ServicesNine;
