import React, { useEffect, useRef, useState } from 'react';
import './ServicesSix.css';
import servicesData from '../../data/services.json';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Plus } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ServicesSix = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const sectionRef = useRef(null);
    const listRef = useRef(null);
    const videosRef = useRef([]);

    // Check for mobile to disable hover effects
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 1024);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Initial Animation
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate list items in
            gsap.from('.s6-item', {
                y: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: listRef.current,
                    start: 'top 80%',
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Video Transition Effect
    useEffect(() => {
        if (isMobile) return;

        videosRef.current.forEach((video, index) => {
            if (!video) return;

            if (index === activeIndex) {
                gsap.to(video, {
                    opacity: 0.6, // Dimmed for text readability
                    scale: 1.05,
                    duration: 1,
                    ease: 'power2.out'
                });
                video.play().catch(() => { });
            } else {
                gsap.to(video, {
                    opacity: 0,
                    scale: 1,
                    duration: 0.5,
                    ease: 'power2.out'
                });
                video.pause();
                video.currentTime = 0;
            }
        });
    }, [activeIndex, isMobile]);

    return (
        <section className="services-six-section" ref={sectionRef}>

            {/* Background Videos (Desktop Only) */}
            {!isMobile && (
                <div className="s6-bg-container">
                    {servicesData.map((service, index) => (
                        <div key={`bg-${service.id}`} className="s6-bg-wrapper">
                            <video
                                ref={el => videosRef.current[index] = el}
                                src={service.videoUrl}
                                className="s6-bg-video"
                                loop
                                muted
                                playsInline
                            />
                        </div>
                    ))}
                    <div className="s6-bg-overlay"></div>
                </div>
            )}

            <div className="s6-content-container">
                <div className="s6-header">
                    <h2 className="s6-main-title">Our Expertise</h2>
                    <p className="s6-subtitle">Precision engineering for a safer tomorrow.</p>
                </div>

                <div className="s6-list" ref={listRef}>
                    {servicesData.map((service, index) => (
                        <div
                            key={service.id}
                            className={`s6-item ${activeIndex === index ? 'active' : ''}`}
                            onMouseEnter={() => !isMobile && setActiveIndex(index)}
                        >
                            <div className="s6-item-header">
                                <span className="s6-number">0{index + 1}</span>
                                <h3 className="s6-item-title">{service.title}</h3>
                                <div className="s6-icon-indicator">
                                    {isMobile ? <ArrowRight /> : <Plus className={`plus-icon ${activeIndex === index ? 'rotate' : ''}`} />}
                                </div>
                            </div>

                            <div className="s6-item-body">
                                <p className="s6-desc">{service.description}</p>

                                {/* Mobile Video (Inline) */}
                                {isMobile && (
                                    <div className="s6-mobile-video-wrapper">
                                        <video
                                            src={service.videoUrl}
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            className="s6-mobile-video"
                                        />
                                    </div>
                                )}

                                <button className="s6-btn">
                                    Discover More
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesSix;
