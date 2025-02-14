"use client";
import React, { Suspense, useState } from "react";
import { useToast } from '@/hooks/use-toast';
import useSWR from "swr";
import GalleryUploadButton from "@/components/dashboard/admin/gallery-upload-button/gallery-upload-button";
import { SidebarInsetComponent } from "@/components/dashboard/admin/side-bar-inset-component";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { SidebarInset } from "@/components/ui/sidebar";
import { useRouter, useSearchParams } from "next/navigation";

const fetcher = (url) => fetch(url).then((res) => res.json());

function GalleryComponent() {
    const imagesPerPage = 9;
    const columns = 3;
    
    const searchParams = useSearchParams();
    const router = useRouter();

    const { toast } = useToast();
    
    const currentPage = parseInt(searchParams.get("page")) || 1;

    // Fetch images with SWR
    const { data, error, mutate } = useSWR(`/api/gallery?page=${currentPage}&limit=${imagesPerPage}`, fetcher);

    if (error) return <div>Error loading images</div>;
    if (!data) return <div>Loading...</div>;

    const allImages = data.gallery || [];
    const totalPages = data.pagination?.totalPages || 1;

    // Get paginated data
    const paginatedImages = allImages.slice(0, imagesPerPage);

    const groupedImages = paginatedImages.reduce((result, image, index) => {
        const columnIndex = index % columns;
        if (!result[columnIndex]) result[columnIndex] = [];
        result[columnIndex].push(image);
        return result;
    }, []);

    const handlePageChange = (page) => {
        router.push(`?page=${page}`);
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/api/gallery/${id}`, { method: "DELETE" });

            if (!response.ok) {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "There was a problem with your request.",
                });
                return;
            }
            toast({
                variant: "success",
                title: "Image deleted successfully",
                description: "The image has been removed from the gallery.",
            });
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            });
            return;
        }
        
        // Mutate the cache by removing the deleted image
        mutate(
            (prevData) => ({
                ...prevData,
                gallery: prevData.gallery.filter((image) => image._id !== id),
            }),
            false
        );

    };

    return (
        <SidebarInset>
            <SidebarInsetComponent />
            <GalleryUploadButton />
            <section className="px-4 my-5">
                <div className="grid grid-cols-3 gap-2">
                    {groupedImages.map((columnImages, index) => (
                        <div key={index}>
                            <div className="space-y-2">
                                {columnImages.map((image, imageIndex) => (
                                    <div key={image._id} className="relative">
                                        <Trash2
                                            onClick={() => handleDelete(image._id)}
                                            className="absolute top-3 right-2 text-red-800 cursor-pointer"
                                        />
                                        <Image
                                            src={image.image}
                                            width={300}
                                            height={300}
                                            className="w-full"
                                            alt={`Image ${imageIndex + 1}`}
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

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <GalleryComponent />
        </Suspense>
    );
}
