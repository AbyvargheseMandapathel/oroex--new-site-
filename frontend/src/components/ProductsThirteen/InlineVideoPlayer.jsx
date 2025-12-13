import React, { useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import './ProductsThirteen.css'; // Reusing the same CSS file for simplicity

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
        <div className="p13-inline-video-container">
            <video
                ref={videoRef}
                src={videoUrl}
                poster={poster}
                controls
                className="p13-inline-video"
                onEnded={onClose}
            />
            <button className="p13-inline-close-btn" onClick={(e) => {
                e.stopPropagation();
                onClose();
            }}>
                <X size={20} />
            </button>
        </div>
    );
};

export default InlineVideoPlayer;
