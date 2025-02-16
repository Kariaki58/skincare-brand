"use client";

import { CircleCheckBig, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";


export default function TablePagination({ bookings, totalPages, currentPage, totalCount }) {
    const searchParams = useSearchParams();
    const router = useRouter();

    const currentPageFromUrl = parseInt(searchParams.get("page") || "1", 10);
    const [page, setPage] = useState(currentPageFromUrl);

    useEffect(() => {
        setPage(currentPageFromUrl);
    }, [currentPageFromUrl]);

    const handlePageChange = (newPage) => {
        router.push(`?page=${newPage}`);
    };

    const acceptBooking = async (id) => {
        if (!window.confirm("Are you sure you want to accept this booking?")) return;

        try {
            const response = await fetch(`/api/appointment/${id}/accept`, { method: "PUT" });
            if (response.ok) {
                alert("Booking accepted successfully!");
                router.refresh();
            } else {
                alert("Failed to accept booking. Please try again.");
            }
        } catch (error) {
            console.error("Error accepting booking:", error);
            alert("Something went wrong!");
        }
    };

    const declineBooking = async (id) => {
        const reason = prompt("Please provide a reason for declining:");
        if (!reason) return alert("Decline reason is required.");

        if (!window.confirm("Are you sure you want to decline this booking?")) return;

        try {
            const response = await fetch(`/api/appointment/${id}/decline`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ reason }),
            });

            if (response.ok) {
                alert("Booking declined successfully!");
                router.refresh();
            } else {
                alert("Failed to decline booking. Please try again.");
            }
        } catch (error) {
            console.error("Error declining booking:", error);
            alert("Something went wrong!");
        }
    };

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 max-w-screen-lg overflow-x-auto">
            <Table>
                <TableCaption>List of all bookings</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Services</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Arrival</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {bookings.map((booking) => (
                        <TableRow key={booking._id}>
                            <TableCell>{booking._id}</TableCell>
                            <TableCell>{booking.name}</TableCell>
                            <TableCell className="whitespace-nowrap">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <p className="underline text-blue-700 hover:cursor-pointer">
                                                {booking.services.length}
                                            </p>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p className="text-lg">
                                                {booking.services.map(service => service.name).join(" | ")}
                                            </p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </TableCell>
                            <TableCell>{booking.email}</TableCell>
                            <TableCell>{booking.phone}</TableCell>
                            <TableCell>
                                {new Date(booking.selectedDate).toLocaleDateString("en-US", {
                                    month: "short", day: "numeric", year: "numeric"
                                })}
                            </TableCell>
                            <TableCell>{booking.selectedSlot}</TableCell>
                            <TableCell>
                                <div className="flex gap-2">
                                    <CircleCheckBig
                                        size={24}
                                        className={`text-green-700 hover:cursor-pointer ${
                                            booking.isConfirmed ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                        onClick={() => !booking.isConfirmed && acceptBooking(booking._id)}
                                    />
                                    <X
                                        size={24}
                                        className={`text-red-700 hover:cursor-pointer ${
                                            booking.isCancelled ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                        onClick={() => !booking.isCancelled && declineBooking(booking._id)}
                                    />

                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Pagination>
                <PaginationContent>
                    <PaginationPrevious className="cursor-pointer" onClick={() => handlePageChange(Math.max(page - 1, 1))} />
                    {[...Array(totalPages).keys()].map((i) => (
                        <PaginationItem key={i}>
                            <PaginationLink onClick={() => handlePageChange(i + 1)} isActive={page === i + 1}>
                                {i + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationNext className="cursor-pointer" onClick={() => handlePageChange(Math.min(page + 1, totalPages))} />
                </PaginationContent>
            </Pagination>
        </div>
    );
}
