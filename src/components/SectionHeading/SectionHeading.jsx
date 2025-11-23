import React, { useEffect, useRef } from 'react';
import './SectionHeading.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SectionHeading = ({ title = "Our Services", subtitle = "Comprehensive industrial electrical solutions tailored to your needs" }) => {
    const headingRef = useRef(null);
    const subtitleRef = useRef(null);

    useEffect(() => {
        // Animate heading
        gsap.fromTo(
            headingRef.current,
            {
                opacity: 0,
                y: 50,
                scale: 0.9,
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: headingRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
            }
        );

        // Animate subtitle
        gsap.fromTo(
            subtitleRef.current,
            {
                opacity: 0,
                y: 30,
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                delay: 0.3,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: headingRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
            }
        );
    }, []);

    return (
        <section className="section-heading">
            <div className="heading-container">
                <h2 className="main-heading" ref={headingRef}>
                    {title}
                </h2>
                <p className="subtitle" ref={subtitleRef}>
                    {subtitle}
                </p>
            </div>
        </section>
    );
};

export default SectionHeading;
