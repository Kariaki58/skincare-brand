"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { CircleCheckBig, CirclePlus } from "lucide-react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import ProceedLink from "../ProceedLink";
import photo1 from "@/public/gallery/cute-photo-1.jpg";
import photo2 from "@/public/gallery/cute-photo-2.jpg";
import photo3 from "@/public/gallery/cute-photo-3.jpg";
import photo4 from "@/public/gallery/cute-photo-4.jpg";
import photo5 from "@/public/gallery/cute-photo-5.jpg";
import photo6 from "@/public/gallery/cute-photo-6.jpeg";
import photo7 from "@/public/gallery/cute-photo-7.jpg";
import photo8 from "@/public/gallery/cute-photo-8.jpeg";


export default function ServiceDisplay() {
    const serviceBooking = [
        { image: photo1, title: "Nail Fixing", duration: "1 hour", price: "$50", select: false },
        { image: photo2, title: "Hair Removal", duration: "2 hours", price: "$100", select: true },
        { image: photo3, title: "Skincare Consultation", duration: "30 mins", price: "free", select: false },
        { image: photo4, title: "Facials & Peels", duration: "30 mins", price: "$100", select: true },
        { image: photo5, title: "Hair Treatment", duration: "1 hour", price: "$50", select: false },
        { image: photo6, title: "Microdermabrasion", duration: "3 hours", price: "$50", select: true },
        { image: photo7, title: "Eyelash Extensions", duration: "1 hour", price: "$45", select: false },
        { image: photo8, title: "Makeup", duration: "1 hour", price: "$10", select: false },
        { image: photo4, title: "Facials & Peels", duration: "30 mins", price: "$100", select: true },
        { image: photo5, title: "Hair Treatment", duration: "1 hour", price: "$50", select: false },
        { image: photo6, title: "Microdermabrasion", duration: "3 hours", price: "$50", select: true },
        { image: photo7, title: "Eyelash Extensions", duration: "1 hour", price: "$45", select: false },
        { image: photo8, title: "Makeup", duration: "1 hour", price: "$10", select: false },
    ];

    const servicesPerPage = 8; // Number of services per page
    const totalPages = Math.ceil(serviceBooking.length / servicesPerPage); // Total number of pages
    const router = useRouter();
    const searchParams = useSearchParams();

    // Get the current page from the URL, default to 1
    const queryPage = parseInt(searchParams.get("page") || "1", 10);
    const [currentPage, setCurrentPage] = useState(queryPage);

    // Check if the page number is valid and update the page when the query page changes
    useEffect(() => {
        if (queryPage < 1 || queryPage > totalPages) {
            const validPage = queryPage < 1 ? 1 : totalPages;
            router.replace(`?page=${validPage}`);
            setCurrentPage(validPage);
        } else if (queryPage !== currentPage) {
            setCurrentPage(queryPage);
        }
    }, [queryPage, currentPage, totalPages, router]);

    // Handle page change
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            router.push(`?page=${page}`);
            setCurrentPage(page);
        }
    };

    // Get the services to display on the current page
    const currentServices = serviceBooking.slice(
        (currentPage - 1) * servicesPerPage,
        currentPage * servicesPerPage
    );

    // Render pagination items
    const renderPagination = () => {
        const pagination = [];
        const range = 3; // Number of visible pages around the current page

        // Previous button
        pagination.push(
            <PaginationItem key="prev">
                <PaginationPrevious
                    href={`?page=${currentPage - 1}`}
                    onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(currentPage - 1);
                    }}
                    disabled={currentPage === 1}
                />
            </PaginationItem>
        );

        // First page and ellipsis
        if (currentPage > range + 1) {
            pagination.push(
                <PaginationItem key="1">
                    <PaginationLink
                        href="?page=1"
                        onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(1);
                        }}
                    >
                        1
                    </PaginationLink>
                </PaginationItem>
            );
            pagination.push(<PaginationEllipsis key="start-ellipsis" />);
        }

        // Pages around the current page
        for (let i = Math.max(1, currentPage - range); i <= Math.min(totalPages, currentPage + range); i++) {
            pagination.push(
                <PaginationItem key={i}>
                    <PaginationLink
                        href={`?page=${i}`}
                        isActive={currentPage === i}
                        onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(i);
                        }}
                    >
                        {i}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        // Ellipsis and last page
        if (currentPage < totalPages - range) {
            pagination.push(<PaginationEllipsis key="end-ellipsis" />);
            pagination.push(
                <PaginationItem key={totalPages}>
                    <PaginationLink
                        href={`?page=${totalPages}`}
                        onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(totalPages);
                        }}
                    >
                        {totalPages}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        // Next button
        pagination.push(
            <PaginationItem key="next">
                <PaginationNext
                    href={`?page=${currentPage + 1}`}
                    onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(currentPage + 1);
                    }}
                    disabled={currentPage === totalPages}
                />
            </PaginationItem>
        );

        return pagination;
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-4 gap-5">
                {currentServices.map((service, index) => (
                    <div
                        key={index}
                        className="p-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div className="h-52 relative w-full">
                            <Image
                                src={service.image}
                                alt={service.title}
                                fill={true}
                                className="z-20 object-cover shadow-xl"
                                priority
                            />
                        </div>
                        
                        <div className="mt-5">
                            <h2 className="text-gray-800 font-medium text-lg">{service.title}</h2>
                            <p className="text-gray-600 text-base">{service.duration}</p>
                            <p className="text-gray-600 text-base font-semibold">{service.price}</p>
                        </div>
                        <div className="flex justify-center mt-3">
                            {
                                service.select ? (
                                    <div>
                                        <CircleCheckBig size={35} className="text-green-700 hover:cursor-pointer"/>
                                    </div>
                                ): (
                                    <div>
                                        <CirclePlus size={35} className="text-[#2D2D2D] hover:cursor-pointer"/>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                ))}
            </div>
            <ProceedLink nextLink="/book/slots" />
            <Pagination>
                <PaginationContent>{renderPagination()}</PaginationContent>
            </Pagination>
        </div>
    );
}
