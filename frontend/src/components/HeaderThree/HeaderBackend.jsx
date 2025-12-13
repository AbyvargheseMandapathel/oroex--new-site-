import React, { useEffect, useState, useRef } from 'react';
import './HeaderThree.css'; // Reusing CSS
import logo from '../../assets/logo.svg';
import { getHeaderVideos } from '../../api';

const HeaderBackend = () => {
    const [scale, setScale] = useState(1);
    const [opacity, setOpacity] = useState(1);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [headerVideos, setHeaderVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const wrapperRef = useRef(null);
    const videoRef = useRef(null);

    useEffect(() => {
        getHeaderVideos()
            .then(data => {
                setHeaderVideos(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch header videos", err);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (!wrapperRef.current) return;

            const wrapper = wrapperRef.current;
            const rect = wrapper.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // Calculate progress based on how much of the wrapper has been scrolled
            const scrollableDistance = rect.height - viewportHeight;
            const scrolled = -rect.top;

            let progress = scrolled / scrollableDistance;

            // Clamp progress between 0 and 1
            if (progress < 0) progress = 0;
            if (progress > 1) progress = 1;

            // Scale from 1 to ~120 to ensure it fills the screen
            const newScale = 1 + Math.pow(progress, 2.5) * 120;
            setScale(newScale);

            // Fade out logic: Start fading at 60% progress, fully transparent by 100%
            let newOpacity = 1;
            if (progress > 0.6) {
                newOpacity = 1 - (progress - 0.6) / 0.4;
                if (newOpacity < 0) newOpacity = 0;
            }
            setOpacity(newOpacity);
        };

        window.addEventListener('scroll', handleScroll);
        // Call once to set initial state if needed, though usually 0 scroll is default
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Loop through videos
    useEffect(() => {
        if (headerVideos.length === 0) return;

        const interval = setInterval(() => {
            setCurrentVideoIndex((prevIndex) =>
                (prevIndex + 1) % headerVideos.length
            );
        }, 8000); // Change video every 8 seconds

        return () => clearInterval(interval);
    }, [headerVideos]);

    // Handle video end event to smoothly transition
    const handleVideoEnd = () => {
        if (headerVideos.length === 0) return;
        setCurrentVideoIndex((prevIndex) =>
            (prevIndex + 1) % headerVideos.length
        );
    };

    if (loading) return null; // Or a loader or empty div

    // Fallback if no videos found? 
    if (headerVideos.length === 0) {
        return <div className="header-three-wrapper" style={{ background: 'black' }}></div>;
    }

    return (
        <div className="header-three-wrapper" ref={wrapperRef}>
            <div className="header-three-container">
                {headerVideos.map((video, index) => (
                    <video
                        key={video.id}
                        ref={index === currentVideoIndex ? videoRef : null}
                        className={`header-three-video ${index === currentVideoIndex ? 'active' : ''}`}
                        autoPlay
                        loop
                        muted
                        playsInline
                        onEnded={handleVideoEnd}
                        style={{
                            opacity: index === currentVideoIndex ? 1 : 0,
                            transition: 'opacity 1s ease-in-out'
                        }}
                    >
                        <source src={video.videoUrl} type="video/mp4" />
                    </video>
                ))}

                <div className="header-three-overlay"></div>

                <div
                    className="header-three-content"
                    style={{
                        transform: `scale(${scale})`,
                        opacity: opacity
                    }}
                >
                    <img src={logo} alt="OroEx Logo" className="header-three-logo" />
                </div>
            </div>
        </div>
    );
};

export default HeaderBackend;
