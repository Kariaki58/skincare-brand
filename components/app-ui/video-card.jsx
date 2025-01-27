"use client";

import { useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';

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
                    className="w-full cursor-pointer"
                    src={videoSrc}
                    onClick={handlePlayPause}
                />
                <button
                    onClick={handlePlayPause}
                    className="absolute top-2 right-2 bg-black bg-opacity-70 text-white rounded-full p-2 flex items-center justify-center"
                >
                    {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </button>
            </div>
        </div>
    );
};

export default VideoCard;
