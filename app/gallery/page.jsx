"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import photo1 from "@/public/gallery/cute-photo-1.jpg";
import photo2 from "@/public/gallery/cute-photo-2.jpg";
import photo3 from "@/public/gallery/cute-photo-3.jpg";
import photo4 from "@/public/gallery/cute-photo-4.jpg";
import photo5 from "@/public/gallery/cute-photo-5.jpg";
import photo6 from "@/public/gallery/cute-photo-6.jpeg";
import photo7 from "@/public/gallery/cute-photo-7.jpg";
import photo8 from "@/public/gallery/cute-photo-8.jpeg";
import photo9 from "@/public/gallery/cute-photo-9.jpeg";
import photo10 from "@/public/gallery/cute-photo-10.jpg";
import headerImage from "@/public/header-image.jpg";


export default function Page() {
    const allImages = [photo1, photo2, photo3, photo4, photo5, photo6, photo7, photo8, photo9, photo10, photo4, photo5, photo6, photo7, photo8, photo9, photo10, photo4, photo5, photo6, photo7, photo8, photo9, photo10, photo4, photo5, photo6, photo7, photo8, photo9, photo10];
    const itemsPerPage = 6;
    const [visibleImage, setVisibleImage] = useState([]);
    const [page, setPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        loadMoreImage();
    }, []);

    const loadMoreImage = () => {
        if (isLoading) return;
        setIsLoading(true);

        setTimeout(() => { //mock delay
            const start = page * itemsPerPage;
            const end = start + itemsPerPage;
            const nextImages = allImages.slice(start, end);

            setVisibleImage((prev) => [...prev, ...nextImages]);
            setPage((prev) => prev + 1);
            setIsLoading(false);
        }, 1500)
    }
    const handleScroll = () => {
        const { offsetHeight, scrollTop } = document.documentElement;
        const scrollThreshold = 800;
        const bottomPosition = offsetHeight - window.innerHeight;

        if (scrollTop >= bottomPosition - scrollThreshold && page * itemsPerPage <= allImages.length && !isLoading) {
            loadMoreImage();
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [page, isLoading]);
    
    const columns = 3;

    const groupedImages = visibleImage.reduce((result, image, index) => {
        const columnIndex = index % columns;
        if (!result[columnIndex]) result[columnIndex] = [];
        result[columnIndex].push(image);
        return result;
    }, []);

    return (
        <>
            <header className="relative h-screen w-full bg-gradient-to-b from-[#f6f9ff] to-[#9ba3b1]">
                <Image
                    src={headerImage}
                    alt="background image for the hair salon banner"
                    fill={true}
                    className="z-10 object-cover"
                    priority
                />
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-20 text-white space-y-5">
                    <h3 className="font-bold tracking-widest">BROWSE THE CLIENT GALLERY</h3>
                    <h1 className="text-5xl font-light whitespace-nowrap">
                        BEFORE & AFTER TRANSFORMATIONS 
                    </h1>
                </div>
            </header>
            <Link href='/book' className="border border-black px-10 py-5 text-black text-sm hover:bg-gray-50 hover:text-gray-700 transition-all duration-300 ease-in-out block text-center">
                BOOK YOUR APPOINTMENT TODAY
            </Link>
            <section className="max-w-screen-xl mx-auto my-10">
                <div className="grid grid-cols-3 gap-2">
                    {groupedImages.map((columnImages, columnIndex) => (
                        <div key={columnIndex}>
                            <div className="space-y-2">
                                {columnImages.map((image, imageIndex) => (
                                    <Image
                                        key={imageIndex}
                                        src={image}
                                        width={300}
                                        height={300}
                                        className="w-full hover:cursor-pointer"
                                        alt={`Cute Photo ${imageIndex + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                {isLoading && (
                    <div className="text-center mt-4 text-gray-500">Loading more images...</div>
                )}
            </section>
        </>
    );
}
