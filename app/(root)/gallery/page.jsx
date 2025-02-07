"use client";

import { useState, useEffect, Suspense } from "react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Spectral } from "next/font/google";
import { X } from "lucide-react";

const spectral = Spectral({ subsets: ["latin"], weight: "300" });

export function GalleryShow() {
    const [allImages, setAllImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const imagesPerPage = 20;
    const searchParams = useSearchParams();
    const router = useRouter();
    const currentPageFromUrl = parseInt(searchParams.get("page")) || 1;
    const [currentPage, setCurrentPage] = useState(currentPageFromUrl);

    useEffect(() => {
        setCurrentPage(currentPageFromUrl);
    }, [currentPageFromUrl]);

    useEffect(() => {
        try {
            setLoading(true);
            fetch(`/api/gallery?page=${currentPage}&limit=${imagesPerPage}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                console.log(data.pagination.totalPages)
                setAllImages(data.gallery);
                setTotalPages(data.pagination.totalPages);
            });
        } catch (error) {
            setError("error: something went wrong, please reload the page.");
        } finally {
            setLoading(false);
        }
        
    }, [currentPage]);

    const handlePageChange = (page) => {
        router.push(`?page=${page}`);
        setCurrentPage(page);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <>
            <div className="flex justify-center">
                <h1 className={`uppercase text-black text-center text-4xl ${spectral.className} antialiased md:text-left mb-6`}>
                    OUR WORK FROM PASSED CLIENTS
                </h1>
            </div>
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

            {/* Pagination */}
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href={`?page=${Math.max(currentPage - 1, 1)}`}
                            onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                        />
                    </PaginationItem>
                    {[...Array(totalPages).keys()].map((page) => (
                        <PaginationItem key={page}>
                            <PaginationLink
                                href={`?page=${page + 1}`}
                                isActive={currentPage === page + 1}
                                onClick={() => handlePageChange(page + 1)}
                            >
                                {page + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationItem>
                        <PaginationNext
                            href={`?page=${Math.min(currentPage + 1, totalPages)}`}
                            onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>

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
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <GalleryShow />
        </Suspense>
    );
}