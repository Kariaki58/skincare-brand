"use client";

import { Suspense, useState, useEffect } from "react";
import { CheckCircle, XCircle, Star } from "lucide-react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const reviewsData = [
    { id: 1, name: "John Doe", review: "Excellent service!", rating: 5, date: "2025-01-01" },
    { id: 2, name: "Jane Smith", review: "Look No Further, Bare Beauty is The Best Aesthetics Clinic I've Ever Visited in Toronto Area.", rating: 4, date: "2025-01-03" },
    { id: 3, name: "Alex Johnson", review: "Not satisfied.", rating: 2, date: "2025-01-05" },
    { id: 4, name: "Chris Evans", review: "Great work!", rating: 5, date: "2025-01-06" },
    { id: 5, name: "Emma Watson", review: "Could be better.", rating: 3, date: "2025-01-07" },
];

function ReviewDashboardContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const reviewsPerPage = 10;

    // Parse the current page from the URL or default to 1
    const currentPageFromUrl = parseInt(searchParams.get("page")) || 1;

    const totalPages = Math.ceil(reviewsData.length / reviewsPerPage);

    // Local state for current page
    const [currentPage, setCurrentPage] = useState(currentPageFromUrl);

    // Update state when the URL changes
    useEffect(() => {
        setCurrentPage(currentPageFromUrl);
    }, [currentPageFromUrl]);

    // Get paginated data
    const paginatedReviews = reviewsData.slice(
        (currentPage - 1) * reviewsPerPage,
        currentPage * reviewsPerPage
    );

    const handlePageChange = (page) => {
        router.push(`?page=${page}`);
        setCurrentPage(page); // Ensure UI updates instantly
    };

    return (
        <div className="flex flex-col gap-8 p-4">
            {/* Reviews Table */}
            <Table className="shadow-lg">
                <TableCaption>Customer Reviews Overview</TableCaption>
                <TableHeader className="bg-gray-50 shadow-md">
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Review</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead className="text-right">Date</TableHead>
                        <TableHead className="w-[100px] text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="text-gray-700">
                    {paginatedReviews.map((review) => (
                        <TableRow key={review.id}>
                            <TableCell className="font-medium">{review.id}</TableCell>
                            <TableCell>{review.name}</TableCell>
                            <TableCell>
                                <Tooltip>
                                    <TooltipTrigger>
                                        {review.review.length > 50
                                            ? `${review.review.substring(0, 50)}...`
                                            : review.review}
                                    </TooltipTrigger>
                                    {review.review.length > 50 && (
                                        <TooltipContent className="text-white p-4 bg-gray-500">
                                            {review.review}
                                        </TooltipContent>
                                    )}
                                </Tooltip>
                            </TableCell>
                            <TableCell className="flex">
                                {[...Array(review.rating)].map((_, index) => (
                                    <Star key={index} size={13} className="text-yellow-500" />
                                ))}
                            </TableCell>
                            <TableCell className="text-right">{review.date}</TableCell>
                            <TableCell className="flex justify-end">
                                <CheckCircle className="text-green-500 cursor-pointer" />
                                <XCircle className="text-red-500 cursor-pointer ms-2" />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

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
        </div>
    );
}

export default function ReviewDashboard() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ReviewDashboardContent />
        </Suspense>
    );
}
