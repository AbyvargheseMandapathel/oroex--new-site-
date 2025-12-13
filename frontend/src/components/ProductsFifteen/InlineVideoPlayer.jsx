import React, { useRef, useEffect } from 'react';
import { X } from 'lucide-react';

const InlineVideoPlayer = ({ videoUrl, poster, onClose }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(error => {
                console.log("Autoplay prevented:", error);
            });
        }
    }, []);

    return (
        <div className="p15-inline-video-container">
            <video
                ref={videoRef}
                src={videoUrl}
                poster={poster}
                className="p15-inline-video"
                controls
                playsInline
                loop
            />
            <button className="p15-inline-close-btn" onClick={onClose}>
                <X size={20} />
            </button>
        </div>
    );
};

export default InlineVideoPlayer;
