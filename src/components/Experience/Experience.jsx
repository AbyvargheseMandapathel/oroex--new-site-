
import React, { useEffect, useRef } from 'react';
import './Experience.css';

const Experience = () => {
    const containerRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current || !textRef.current) return;

            const container = containerRef.current;
            const rect = container.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Calculate progress: 0 when top of container hits top of viewport
            // 1 when we've scrolled through the scrollable height
            // The container height is much larger than window height (e.g. 400vh)
            // The sticky content is 100vh.
            // So we have (containerHeight - windowHeight) of scrollable distance.

            const scrollableDistance = container.offsetHeight - windowHeight;
            const scrolled = -rect.top; // How far we've scrolled past the top

            let progress = 0;
            if (scrolled > 0) {
                progress = Math.min(1, scrolled / scrollableDistance);
            }

            // Scale from 1 to a large number (e.g., 50) based on progress
            // Using a power curve for smoother acceleration
            const scale = 1 + Math.pow(progress * 20, 2);

            textRef.current.style.transform = `scale(${scale})`;

            // Fade out logic if needed, or just let it zoom past
            // For now, let's just keep it opaque as per request "text become enlarged"
            textRef.current.style.opacity = 1;
        };

        window.addEventListener('scroll', handleScroll);
        // Initial call
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <div className='experience' ref={containerRef}>
                <div className='experience-show'>
                    <video
                        className="experience-video"
                        autoPlay
                        loop
                        muted
                        playsInline
                    >
                        <source src="https://video-previews.elements.envatousercontent.com/files/d7fcf924-01c5-4095-8feb-b5da2b3cf9a8/video_preview_h264.mp4" type="video/mp4" />
                    </video>
                    <div className="experience-content">
                        <h1 className='experience-top'>Let Me show you</h1>
                        <div className='experience-middle-container'>
                            <h1 className='experience-middle' ref={textRef}>Enter My World</h1>
                        </div>
                        <h1 className='experience-bottom'>My Magic Trick</h1>
                        <div className='spacer-end'></div>
                    </div>
                </div>
            </div>
            <section className="next-section">
                <h2>Another Section</h2>
                <p>Content continues here...</p>
            </section>
        </>
    );
};

export default Experience;
