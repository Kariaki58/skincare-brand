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

const spectral = Spectral({
    subsets: ["latin"],
    weight: "300",
});


export function GalleryShow() {
    const [allImages, setAllImage] = useState([])
    
        useEffect(() => {
            fetch('/api/gallery')
                .then(res => res.json())
                .then(data => {
                    setAllImage(data)
                })
        }, [])
        const imagesPerPage = 9;
        const columns = 3;
    
        const searchParams = useSearchParams();
        const router = useRouter();
    
        // Get current page from URL or default to page 1
        const currentPageFromUrl = parseInt(searchParams.get("page")) || 1;
    
        const totalPages = Math.ceil(allImages.length / imagesPerPage);
    
        const [currentPage, setCurrentPage] = useState(currentPageFromUrl);
    
        useEffect(() => {
            setCurrentPage(currentPageFromUrl);
        }, [currentPageFromUrl]);
    
        const handlePageChange = (page) => {
            router.push(`?page=${page}`);
            setCurrentPage(page);
        };
    
        // Get paginated data
        const paginatedImages = allImages.slice(
            (currentPage - 1) * imagesPerPage,
            currentPage * imagesPerPage
        );
    
        const groupedImages = paginatedImages.reduce((result, image, index) => {
            const columnIndex = index % columns;
            if (!result[columnIndex]) result[columnIndex] = [];
            result[columnIndex].push(image);
            return result;
        }, []);

    return (
        <>
            <h1 className={`uppercase text-[#38271F] text-4xl ${spectral.className} antialiased flex justify-center md:text-left`}>OUR WORK FROM PASSED CLIENTS</h1>
            <section className="max-w-screen-xl mx-auto my-10">
                <div className="grid grid-cols-3 gap-2">
                    {groupedImages.map((columnImages, columnIndex) => (
                        <div key={columnIndex}>
                            <div className="space-y-2">
                                {columnImages.map((image, imageIndex) => (
                                    <Image
                                        key={imageIndex}
                                        src={image.image}
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
            </section>
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