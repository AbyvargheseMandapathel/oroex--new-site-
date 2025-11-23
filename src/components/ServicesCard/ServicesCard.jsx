import React, { useEffect, useRef } from 'react';
import './ServicesCard.css';
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

const ServicesCard = () => {
    const sectionRef = useRef(null);
    const cardsRef = useRef([]);

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

                const moveX = (x / rect.width) * 20;
                const moveY = (y / rect.height) * 20;
                const rotateY = (x / rect.width) * 10;
                const rotateX = -(y / rect.height) * 10;

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

            // Cleanup
            return () => {
                card.removeEventListener('mousemove', handleMouseMove);
                card.removeEventListener('mouseleave', handleMouseLeave);
            };
        });
    }, []);

    const handleCardHover = (index, isEntering) => {
        const card = cardsRef.current[index];
        const icon = card?.querySelector('.icon-wrapper');
        const arrow = card?.querySelector('.arrow-icon');

        if (isEntering) {
            gsap.to(icon, {
                scale: 1.2,
                rotation: 360,
                duration: 0.6,
                ease: 'back.out(1.7)',
            });
            gsap.to(arrow, {
                x: 10,
                scale: 1.3,
                duration: 0.4,
                ease: 'power2.out',
            });
        } else {
            gsap.to(icon, {
                scale: 1,
                rotation: 0,
                duration: 0.6,
                ease: 'power2.inOut',
            });
            gsap.to(arrow, {
                x: 0,
                scale: 1,
                duration: 0.4,
                ease: 'power2.out',
            });
        }
    };

    return (
        <section className="services-section" ref={sectionRef}>
            <div className="services-container">
                <div className="services-grid">
                    {servicesData.map((service, index) => {
                        const IconComponent = iconMap[service.icon];
                        return (
                            <div
                                key={service.id}
                                className="service-card"
                                ref={(el) => (cardsRef.current[index] = el)}
                                onMouseEnter={() => handleCardHover(index, true)}
                                onMouseLeave={() => handleCardHover(index, false)}
                            >
                                <div className="card-shine"></div>
                                <div className="icon-wrapper">
                                    {IconComponent && <IconComponent size={40} strokeWidth={1.5} />}
                                </div>
                                <h3 className="service-title">{service.title}</h3>
                                <p className="service-description">{service.description}</p>
                                <div className="service-footer">
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

export default ServicesCard;
