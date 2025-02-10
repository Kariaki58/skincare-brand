"use client";

import useSWRInfinite from "swr/infinite";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Spectral } from "next/font/google";
import { X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const spectral = Spectral({ subsets: ["latin"], weight: "300" });

const fetcher = (url) => fetch(url).then((res) => res.json());

function GalleryShow() {
    const [selectedImage, setSelectedImage] = useState(null);
    const { toast } = useToast();
    const observerRef = useRef(null);

    const imagesPerPage = 3;

    // SWR Infinite Hook
    const { data, error, size, setSize, isValidating } = useSWRInfinite(
        (index) => `/api/gallery?page=${index + 1}&limit=${imagesPerPage}`,
        fetcher
    );

    // Combine images from all pages
    const allImages = data ? data.flatMap((page) => page.gallery) : [];
    const totalPages = data?.[0]?.pagination?.totalPages || 1;

    // Handle error
    if (error) {
        toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
        });

        return (
            <main className="flex justify-center items-center max-h-96 my-20">
                <div className="flex flex-col items-center justify-center p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                    <p className="mb-2 font-semibold">Failed to fetch images</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    >
                        Reload Page
                    </button>
                </div>
            </main>
        );
    }

    // Infinite Scroll: Load next page when user reaches bottom
    useEffect(() => {
        observerRef.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && size < totalPages) {
                setSize((prev) => prev + 1);
            }
        });

        if (observerRef.current && !isValidating) {
            const observerTarget = document.querySelector("#load-more-trigger");
            if (observerTarget) observerRef.current.observe(observerTarget);
        }

        return () => {
            if (observerRef.current) observerRef.current.disconnect();
        };
    }, [size, totalPages, isValidating]);

    return (
        <>
            <div className="flex justify-center">
                <h1 className={`uppercase text-black text-center text-4xl ${spectral.className} antialiased md:text-left mb-6`}>
                    OUR WORK FROM PAST CLIENTS
                </h1>
            </div>

            {/* Gallery */}
            <section className="max-w-screen-xl mx-auto my-10 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {allImages.map((image, index) => (
                        <Image
                            key={index}
                            src={image.image}
                            width={300}
                            height={300}
                            className="w-full h-auto object-cover rounded-lg shadow-lg cursor-pointer transition-transform duration-300 hover:scale-105"
                            alt={`Gallery Image ${index + 1}`}
                            onClick={() => setSelectedImage(image.image)}
                        />
                    ))}
                </div>
            </section>

            {/* Infinite Scroll Load More Trigger */}
            <div id="load-more-trigger" className="h-10 flex justify-center items-center">
                {isValidating && <p className="text-gray-500">Loading more images...</p>}
            </div>

            {/* Image Modal */}
            {selectedImage && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-md p-4">
                    <div className="relative p-5 bg-white rounded-lg shadow-xl max-w-3xl w-full flex flex-col items-center">
                        <button
                            className="absolute top-3 right-3 text-gray-700 hover:text-gray-900 bg-gray-200 rounded-full p-2 transition-all hover:bg-gray-300"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X size={24} />
                        </button>
                        <Image
                            src={selectedImage}
                            width={600}
                            height={600}
                            className="rounded-lg w-full h-auto object-contain max-h-[80vh]"
                            alt="Selected Gallery Image"
                        />
                    </div>
                </div>
            )}
        </>
    );
}

export default function Page() {
    return <GalleryShow />;
}
