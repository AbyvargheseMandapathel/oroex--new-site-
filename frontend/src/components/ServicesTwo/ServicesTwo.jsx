import React, { useEffect, useRef } from 'react';
import './ServicesTwo.css';
import servicesData from '../../data/services.json';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    Wrench,
    Settings,
    Globe,
    Anchor,
    Cpu,
    Sun,
    ArrowRight
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
    Installation: Wrench,
    Maintenance: Settings,
    OnshoreOffshore: Globe,
    OffshoreSolutions: Anchor,
    Assembly: Cpu,
    SolarSolutions: Sun,
};

const ServicesTwo = () => {
    const sectionRef = useRef(null);
    const cardsRef = useRef([]);
    const videosRef = useRef([]);

    useEffect(() => {
        const cards = cardsRef.current;

        // Scroll-triggered stagger animation
        gsap.fromTo(
            cards,
            {
                opacity: 0,
                y: 100,
                scale: 0.8,
                rotationX: -15,
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                rotationX: 0,
                duration: 1.2,
                ease: 'power4.out',
                stagger: 0.15,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    end: 'top 20%',
                    toggleActions: 'play none none reverse',
                },
            }
        );

        // Magnetic hover effect for each card
        cards.forEach((card) => {
            if (!card) return;

            const handleMouseMove = (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                const moveX = (x / rect.width) * 15;
                const moveY = (y / rect.height) * 15;
                const rotateY = (x / rect.width) * 8;
                const rotateX = -(y / rect.height) * 8;

                gsap.to(card, {
                    x: moveX,
                    y: moveY,
                    rotationY: rotateY,
                    rotationX: rotateX,
                    duration: 0.5,
                    ease: 'power2.out',
                });
            };

            const handleMouseLeave = () => {
                gsap.to(card, {
                    x: 0,
                    y: 0,
                    rotationY: 0,
                    rotationX: 0,
                    duration: 0.8,
                    ease: 'elastic.out(1, 0.5)',
                });
            };

            card.addEventListener('mousemove', handleMouseMove);
            card.addEventListener('mouseleave', handleMouseLeave);

            return () => {
                card.removeEventListener('mousemove', handleMouseMove);
                card.removeEventListener('mouseleave', handleMouseLeave);
            };
        });
    }, []);

    const handleCardHover = (index, isEntering) => {
        const card = cardsRef.current[index];
        const video = videosRef.current[index];
        const icon = card?.querySelector('.icon-wrapper');
        const arrow = card?.querySelector('.arrow-icon');
        const videoOverlay = card?.querySelector('.video-overlay');

        if (isEntering) {
            // Play video
            if (video) {
                video.play();
            }

            // Animate video overlay
            gsap.to(videoOverlay, {
                opacity: 1,
                duration: 0.5,
                ease: 'power2.inOut',
            });

            // Animate icon
            gsap.to(icon, {
                scale: 1.2,
                rotation: 360,
                duration: 0.6,
                ease: 'back.out(1.7)',
            });

            // Animate arrow
            gsap.to(arrow, {
                x: 10,
                scale: 1.3,
                duration: 0.4,
                ease: 'power2.out',
            });
        } else {
            // Pause and reset video
            if (video) {
                video.pause();
                video.currentTime = 0;
            }

            // Hide video overlay
            gsap.to(videoOverlay, {
                opacity: 0,
                duration: 0.5,
                ease: 'power2.inOut',
            });

            // Reset icon
            gsap.to(icon, {
                scale: 1,
                rotation: 0,
                duration: 0.6,
                ease: 'power2.inOut',
            });

            // Reset arrow
            gsap.to(arrow, {
                x: 0,
                scale: 1,
                duration: 0.4,
                ease: 'power2.out',
            });
        }
    };

    return (
        <section className="servicestwo-section" ref={sectionRef}>
            <div className="servicestwo-container">
                <div className="servicestwo-grid">
                    {servicesData.map((service, index) => {
                        const IconComponent = iconMap[service.icon];
                        return (
                            <div
                                key={service.id}
                                className="servicestwo-card"
                                ref={(el) => (cardsRef.current[index] = el)}
                                onMouseEnter={() => handleCardHover(index, true)}
                                onMouseLeave={() => handleCardHover(index, false)}
                            >
                                {/* Video Background */}
                                <div className="video-overlay">
                                    <video
                                        ref={(el) => (videosRef.current[index] = el)}
                                        className="card-video"
                                        loop
                                        muted
                                        playsInline
                                    >
                                        <source src={service.videoUrl} type="video/mp4" />
                                    </video>
                                </div>

                                <div className="card-shine"></div>
                                <div className="icon-wrapper">
                                    {IconComponent && <IconComponent size={40} strokeWidth={1.5} />}
                                </div>
                                <h3 className="servicestwo-title">{service.title}</h3>
                                <p className="servicestwo-description">{service.description}</p>
                                <div className="servicestwo-footer">
                                    <span className="know-more">KNOW MORE</span>
                                    <ArrowRight className="arrow-icon" size={20} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ServicesTwo;
