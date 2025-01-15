"use client";
import React, { Suspense } from "react";
import GalleryUploadButton from "@/components/dashboard/admin/gallery-upload-button/gallery-upload-button";
import { SidebarInsetComponent } from "@/components/dashboard/admin/side-bar-inset-component";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { SidebarInset } from "@/components/ui/sidebar";
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
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function GalleryComponent() {
    const allImages = [photo1, photo2, photo3, photo4, photo5, photo6, photo7, photo8, photo9, photo10];
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
        <SidebarInset>
            <SidebarInsetComponent />
            <GalleryUploadButton />
            <section className="px-4 my-5">
                <div className="grid grid-cols-3 gap-2">
                    {groupedImages.map((columnImages, columnIndex) => (
                        <div key={columnIndex}>
                            <div className="space-y-2">
                                {columnImages.map((image, imageIndex) => (
                                    <div key={imageIndex} className="relative">
                                        <Trash2 className="absolute top-3 right-2 text-red-800 cursor-pointer" />
                                        <Image
                                            src={image}
                                            width={300}
                                            height={300}
                                            className="w-full"
                                            alt={`Cute Photo ${imageIndex + 1}`}
                                        />
                                    </div>
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
        </SidebarInset>
    );
}

export default function Gallery() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <GalleryComponent />
        </Suspense>
    );
}
