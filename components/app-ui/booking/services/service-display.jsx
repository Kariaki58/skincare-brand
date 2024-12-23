"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Switch } from "@/components/ui/switch";
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


export default function ServiceDisplay() {
    const serviceBooking = [
        { title: "Nail Fixing", duration: "1 hour", price: "$50", select: false },
        { title: "Hair Removal", duration: "2 hours", price: "$100", select: false },
        { title: "Skincare Consultation", duration: "30 mins", price: "free", select: false },
        { title: "Facials & Peels", duration: "30 mins", price: "$100", select: false },
        { title: "Hair Treatment", duration: "1 hour", price: "$50", select: false },
        { title: "Microdermabrasion", duration: "3 hours", price: "$50", select: false },
        { title: "Eyelash Extensions", duration: "1 hour", price: "$45", select: false },
        { title: "Makeup", duration: "1 hour", price: "$10", select: false },
    ];

    const router = useRouter();
    const searchParams = useSearchParams();

    const servicesPerPage = 5;
    const totalPages = Math.ceil(serviceBooking.length / servicesPerPage);

    const queryPage = parseInt(searchParams.get("page") || "1", 10);

    const [currentPage, setCurrentPage] = useState(
        queryPage >= 1 && queryPage <= totalPages ? queryPage : 1
    );

    useEffect(() => {
        if (queryPage < 1 || queryPage > totalPages) {
            const validPage = queryPage < 1 ? 1 : totalPages;
            router.replace(`?page=${validPage}`);
            setCurrentPage(validPage);
        } else if (queryPage !== currentPage) {
            setCurrentPage(queryPage);
        }
    }, [queryPage, currentPage, totalPages, router]);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            router.push(`?page=${page}`);
            setCurrentPage(page);
        }
    };

    const currentServices = serviceBooking.slice(
        (currentPage - 1) * servicesPerPage,
        currentPage * servicesPerPage
    );

    const renderPagination = () => {
        const pagination = [];
        const range = 3; // Number of visible pages around the current page

        // Add the previous button
        pagination.push(
            <PaginationItem key="prev">
                <PaginationPrevious
                    href={`?page=${currentPage - 1}`}
                    onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(currentPage - 1);
                    }}
                />
            </PaginationItem>
        );

        // Add the first page
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

            // Add ellipsis if there are skipped pages
            pagination.push(<PaginationEllipsis key="start-ellipsis" />);
        }

        // Add pages around the current page
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

        // Add ellipsis if there are skipped pages at the end
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

        // Add the next button
        pagination.push(
            <PaginationItem key="next">
                <PaginationNext
                    href={`?page=${currentPage + 1}`}
                    onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(currentPage + 1);
                    }}
                />
            </PaginationItem>
        );

        return pagination;
    };

    return (
        <div className="space-y-6">
            {currentServices.map((service, index) => (
                <div
                    key={index}
                    className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                    <div>
                        <h2 className="text-gray-800 font-medium text-lg">{service.title}</h2>
                        <p className="text-gray-600 text-sm">{service.duration}</p>
                        <p className="text-gray-600 text-sm font-semibold">{service.price}</p>
                    </div>
                    <Switch className="ml-4" />
                </div>
            ))}
            <ProceedLink nextLink="/book/slots" />
            <Pagination>
                <PaginationContent>{renderPagination()}</PaginationContent>
            </Pagination>
        </div>
    );
}
