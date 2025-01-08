"use client";

import { useState, useEffect } from "react";
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

export default function ReviewDashboard() {
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

    // Calculate star rating summary
    const totalReviews = reviewsData.length;
    const starSummary = Array.from({ length: 5 }, (_, index) => {
        const starCount = reviewsData.filter((review) => review.rating === 5 - index).length;
        return { stars: 5 - index, count: starCount, percentage: (starCount / totalReviews) * 100 };
    });

    return (
        <div className="flex flex-col gap-8 p-4">
        {/* Star Rating Summary */}
        <div className="bg-white shadow-md rounded-lg p-4">
            <h1 className="text-xl font-bold mb-4 text-gray-600">Star Ratings Summary</h1>
            <div>
                <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, index) => (
                        <svg
                            key={index}
                            className={`w-4 h-4 ${
                                index < 4.95 ? "text-yellow-300" : "text-gray-300"
                            } me-1`}
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                        >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                    ))}
                    <p className="ms-1 text-sm font-medium text-gray-500">4.95</p>
                    <p className="ms-1 text-sm font-medium text-gray-500">out of</p>
                    <p className="ms-1 text-sm font-medium text-gray-500">5</p>
                </div>
                <p className="text-sm font-medium text-gray-500">1,745 global ratings</p>
                {[5, 4, 3, 2, 1].map((star, index) => (
                    <div key={index} className="flex items-center mt-4">
                        <a
                            href={`?star=${star}`}
                            className="text-sm font-medium text-blue-600 hover:underline"
                        >
                            {star} star
                        </a>
                        <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded">
                            <div
                                className="h-5 bg-yellow-300 rounded"
                                style={{
                                    width: `${star * 14}%`,
                                }}
                            ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-500">
                            {star * 14}%
                        </span>
                    </div>
                ))}
            </div>
        </div>

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
                    <Star fill="bg-yellow-500" key={index} size={13} className="text-yellow-500" />
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
