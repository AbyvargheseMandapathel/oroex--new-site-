import React, { useEffect, useState, useRef } from 'react';
import './HeaderOne.css';
import logo from '../../assets/logo.svg';

const HeaderOne = () => {
    const [scale, setScale] = useState(1);
    const wrapperRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!wrapperRef.current) return;

            const wrapper = wrapperRef.current;
            const rect = wrapper.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // Calculate progress based on how much of the wrapper has been scrolled
            // When rect.top is 0, progress is 0.
            // When rect.bottom equals viewportHeight, progress is 1 (end of sticky).
            // Total scrollable distance is wrapper.height - viewportHeight.
            const scrollableDistance = rect.height - viewportHeight;
            const scrolled = -rect.top;

            let progress = scrolled / scrollableDistance;

            // Clamp progress between 0 and 1
            if (progress < 0) progress = 0;
            if (progress > 1) progress = 1;

            // Scale from 1 to ~120 to ensure it fills the screen
            // Using a power curve (2.5) for smoother acceleration towards the end
            const newScale = 1 + Math.pow(progress, 2.5) * 120;
            setScale(newScale);
        };

        window.addEventListener('scroll', handleScroll);
        // Initial call to set state correctly on load
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="header-one-wrapper" ref={wrapperRef}>
            <div className="header-one-container">
                <video
                    className="header-video-bg"
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    <source
                        src="https://video-previews.elements.envatousercontent.com/files/d7fcf924-01c5-4095-8feb-b5da2b3cf9a8/video_preview_h264.mp4"
                        type="video/mp4"
                    />
                    Your browser does not support the video tag.
                </video>

                <div className="header-overlay"></div>

                <div
                    className="header-content"
                    style={{ transform: `scale(${scale})` }}
                >
                    <img src={logo} alt="OroEx Logo" className="header-logo" />
                </div>
            </div>
        </div>
    );
};

export default HeaderOne;
