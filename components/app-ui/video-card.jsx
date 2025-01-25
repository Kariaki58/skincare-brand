"use client";

import { useRef, useState } from 'react';

const VideoCard = ({ videoSrc, title }) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlayPause = () => {
        if (videoRef.current) {
        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <div className="relative">
                <video
                ref={videoRef}
                className="w-full"
                src={videoSrc}
                controls={false}
                onClick={handlePlayPause}
                />
                <button
                onClick={handlePlayPause}
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-2xl opacity-0 hover:opacity-100 transition-opacity"
                >
                {isPlaying ? 'Pause' : 'Play'}
                </button>
            </div>
        </div>
    );
};

export default VideoCard;
