"use client";

import { motion } from "framer-motion";
import { Playfair_Display } from "next/font/google";
import Link from "next/link";


const playfair_display = Playfair_Display({
    subsets: ["latin"],
    weight: "400"
});


const VideoBackground = () => {
    return (
        <div className="relative w-full h-screen overflow-hidden">
        {/* Background Video */}
        <video
            autoPlay
            loop
            muted
            className="absolute top-0 left-0 w-full h-full object-cover"
        >
            <source src="/videos/video-1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white p-6">
            <motion.h1
            className={`text-white text-4xl ${playfair_display.className} tracking-widest mb-10`}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            >
                CHARLOTTE’S EXPERTS IN HAIR BRAIDING & WEAVING.
            </motion.h1>
            <motion.p
            className="text-lg md:text-xl mt-4 max-w-2xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            >
            </motion.p>
            <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-6"
            >
                <Link href="/appointment" className="border-2 border-[#333333] bg-[#214207] px-10 py-4 text-white hover:bg-[#4caf50] hover:text-white transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl ml-5 text-[12px] font-[300]">
                    BOOK AN APPOINTMENT
                </Link>
            </motion.div>
        </div>
        </div>
    );
};

export default VideoBackground;
