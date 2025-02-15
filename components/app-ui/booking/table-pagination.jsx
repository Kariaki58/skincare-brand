"use client";

import { CircleCheckBig, X } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";



export default function TablePagination() {
    const bookings = [
        {
            id: 1,
            name: "Anabel",
            bookingServices: ["nail fixes"],
            email: "anabel@gmail.com",
            phone: "1234567890",
            date: "2015-03-25",
            arrival: "10AM",
            totalPrice: "$100",
            guest: 1
        },
        {
            id: 2,
            name: "Sharon",
            bookingServices: ["nail fixes", "hair placement", "makeup"],
            email: "sharon@gmail.com",
            phone: "1234567890",
            date: "2015-03-26",
            arrival: "12.15AM",
            totalPrice: "$300",
            guest: 3
        },
        {
            id: 3,
            name: "Sandra",
            bookingServices: ["nail fixes"],
            email: "sandra@gmail.com",
            phone: "1234567890",
            date: "2015-03-25",
            arrival: "2.30AM",
            totalPrice: "$800",
            guest: 1
        },
        {
            id: 4,
            name: "Sandra",
            bookingServices: ["nail fixes", "hair placement"],
            email: "sandra@gmail.com",
            phone: "1234567890",
            date: "2015-03-25",
            arrival: "8AM",
            totalPrice: "$50",
            guest: 2
        },
        {
            id: 5,
            name: "Favour",
            bookingServices: ["nail fixes"],
            email: "favour@gmail.com",
            phone: "1234567890",
            date: "2015-03-26",
            arrival: "10AM",
            totalPrice: "$100",
            guest: 1
        },
        {
            id: 6,
            name: "Angle",
            bookingServices: ["nail fixes", "hair placement"],
            email: "angle@gmail.com",
            phone: "1234567890",
            date: "2015-03-25",
            arrival: "2.30AM - 5.30PM",
            totalPrice: "$800",
            guest: 2
        },
        {
            id: 7,
            name: "Pricilia",
            bookingServices: ["nail fixes", "hair placement"],
            email: "pricilia@gmail.com",
            phone: "1234567890",
            date: "2015-03-25",
            arrival: "10AM",
            totalPrice: "$100",
            guest: 2
        },
        {
            id: 8,
            name: "Favour",
            bookingServices: ["nail fixes", "hair placement", "makeup"],
            email: "favour@gmail.com",
            phone: "1234567890",
            date: "2015-03-26",
            arrival: "10AM",
            totalPrice: "$100",
            guest: 3
        },
        {
            id: 9,
            name: "Angle",
            bookingServices: ["nail fixes"],
            email: "angle@gmail.com",
            phone: "1234567890",
            date: "2015-03-25",
            arrival: "2.30AM",
            totalPrice: "$800",
            guest: 1
        },
        {
            id: 10,
            name: "Pricilia",
            bookingServices: ["nail fixes", "hair placement", "makeup"],
            email: "pricilia@gmail.com",
            phone: "1234567890",
            date: "2015-03-25",
            arrival: "10AM",
            totalPrice: "$100",
            guest: 3
        },
        {
            id: 11,
            name: "Favour",
            bookingServices: ["nail fixes", "hair placement", "makeup"],
            email: "favour@gmail.com",
            phone: "1234567890",
            date: "2015-03-26",
            arrival: "10AM",
            totalPrice: "$100",
            guest: 3
        },
        {
            id: 12,
            name: "Angle",
            bookingServices: ["nail fixes", "hair placement", "makeup"],
            email: "angle@gmail.com",
            phone: "1234567890",
            date: "2015-03-25",
            arrival: "2.30AM",
            totalPrice: "$800",
            guest: 3
        },
        {
            id: 13,
            name: "Pricilia",
            bookingServices: ["nail fixes", "hair placement", "makeup"],
            email: "pricilia@gmail.com",
            phone: "1234567890",
            date: "2015-03-25",
            arrival: "10AM",
            totalPrice: "$100",
            guest: 3
        },
    ];

    const customersPerPage = 10;
    const searchParams = useSearchParams();
    const router = useRouter();

    const currentPageFromUrl = parseInt(searchParams.get("page")) || 1;
    const totalPages = Math.ceil(bookings.length / customersPerPage);

    const [currentPage, setCurrentPage] = useState(currentPageFromUrl);

    useEffect(() => {
        setCurrentPage(currentPageFromUrl);
    }, [currentPageFromUrl]);

    const handlePageChange = (page) => {
        router.push(`?page=${page}`);
        setCurrentPage(page);
    };

    const paginatedBookings = bookings.slice(
        (currentPage - 1) * customersPerPage,
        currentPage * customersPerPage
    );
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 max-w-screen-lg overflow-x-auto">
            <Table>
                <TableCaption>A list of your customers</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead className="whitespace-nowrap">NAME</TableHead>
                        <TableHead className="whitespace-nowrap">SERVICES</TableHead>
                        <TableHead className="whitespace-nowrap">EMAIL</TableHead>
                        <TableHead className="whitespace-nowrap">PHONE</TableHead>
                        <TableHead className="whitespace-nowrap">DATE</TableHead>
                        <TableHead className="whitespace-nowrap">GUEST</TableHead>
                        <TableHead className="whitespace-nowrap">TOTAL PRICE</TableHead>
                        <TableHead className="whitespace-nowrap">ARRIVAL</TableHead>
                        <TableHead>ACTIONS</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paginatedBookings.map((booking) => (
                        <TableRow key={booking.id}>
                            <TableCell className="font-medium">{booking.id}</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    {booking.name}
                                </div>
                            </TableCell>
                            <TableCell className="whitespace-nowrap">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <p className="underline text-blue-700 hover:cursor-pointer">{booking.bookingServices.length}</p>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p className="text-lg">{booking.bookingServices.join(" | ")}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </TableCell>
                            <TableCell className="whitespace-nowrap">{booking.email}</TableCell>
                            <TableCell className="whitespace-nowrap">{booking.phone}</TableCell>
                            <TableCell className="whitespace-nowrap">{booking.date}</TableCell>
                            <TableCell className="whitespace-nowrap">{booking.guest}</TableCell>
                            <TableCell className="whitespace-nowrap">{booking.totalPrice}</TableCell>
                            <TableCell className="whitespace-nowrap">{booking.arrival}</TableCell>
                            <TableCell>
                                <div className="flex gap-2 justify-center">
                                    <CircleCheckBig
                                        size={24}
                                        className="text-green-700 hover:text-green-900 hover:cursor-pointer"
                                        title="Confirm Booking"
                                    />
                                    <X
                                        size={24}
                                        className="text-red-700 hover:text-red-900 hover:cursor-pointer"
                                        title="Cancel Booking"
                                    />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
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
    )
}