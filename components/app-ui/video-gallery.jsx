import VideoCard from "./video-card";


const VideoGallery = () => {
    const videos = [
        { src: '/videos/video-1.mp4', title: 'Video 1' },
        { src: '/videos/video-2.mp4', title: 'Video 2' },
        { src: '/videos/video-1.mp4', title: 'Video 3' },
    ];

    return (
        <div className="flex flex-wrap justify-center gap-4  mb-10 px-2 md:mb-5 lg:mb-0 lg:px-0">
        {videos.map((video, index) => (
            <VideoCard key={index} videoSrc={video.src} title={video.title} />
        ))}
        </div>
    );
};

export default VideoGallery;
