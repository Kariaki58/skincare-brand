"use client";

import AppNavBar from "@/components/dashboard/admin/app-nav-bar";
import { SidebarInsetComponent } from "@/components/dashboard/admin/side-bar-inset-component";
import { SidebarInset } from "@/components/ui/sidebar";
import { CalendarCheck, CalendarX, Clock, CircleCheckBig, X } from "lucide-react";
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
import { useState, useEffect, Suspense } from "react";
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
import profile1 from "@/public/gallery/cute-photo-1.jpg";
import profile2 from "@/public/gallery/cute-photo-2.jpg";
import profile3 from "@/public/gallery/cute-photo-3.jpg";
import profile4 from "@/public/gallery/cute-photo-4.jpg";
import profile5 from "@/public/gallery/cute-photo-5.jpg";
import profile6 from "@/public/gallery/cute-photo-6.jpeg";
import profile7 from "@/public/gallery/cute-photo-7.jpg";


export default function Page() {
    const bookings = [
        {
            id: 1,
            profile: profile1,
            name: "Anabel",
            bookingServices: ["nail fixes", "hair placement", "makeup"],
            email: "anabel@gmail.com",
            phone: "1234567890",
            date: "2015-03-25",
            timeFrame: "10AM - 12PM",
            totalDuration: "2 hours",
            totalPrice: "$100",
        },
        {
            id: 2,
            profile: profile2,
            name: "Sharon",
            bookingServices: ["nail fixes", "hair placement", "makeup"],
            email: "sharon@gmail.com",
            phone: "1234567890",
            date: "2015-03-26",
            timeFrame: "12.15AM - 2.15PM",
            totalDuration: "2 hours",
            totalPrice: "$300",
        },
        {
            id: 3,
            profile: profile3,
            name: "Sandra",
            bookingServices: ["nail fixes", "hair placement", "makeup"],
            email: "sandra@gmail.com",
            phone: "1234567890",
            date: "2015-03-25",
            timeFrame: "2.30AM - 5.30PM",
            totalDuration: "3 hours",
            totalPrice: "$800",
        },
        {
            id: 4,
            profile: profile4,
            name: "Sandra",
            bookingServices: ["nail fixes", "hair placement", "makeup"],
            email: "sandra@gmail.com",
            phone: "1234567890",
            date: "2015-03-25",
            timeFrame: "8AM - 9.45PM",
            totalDuration: "1.45 mins",
            totalPrice: "$50",
        },
        {
            id: 5,
            profile: profile5,
            name: "Favour",
            bookingServices: ["nail fixes", "hair placement", "makeup"],
            email: "favour@gmail.com",
            phone: "1234567890",
            date: "2015-03-26",
            timeFrame: "10AM - 12PM",
            totalDuration: "2 hours",
            totalPrice: "$100",
        },
        {
            id: 6,
            profile: profile6,
            name: "Angle",
            bookingServices: ["nail fixes", "hair placement", "makeup"],
            email: "angle@gmail.com",
            phone: "1234567890",
            date: "2015-03-25",
            timeFrame: "2.30AM - 5.30PM",
            totalDuration: "3 hours",
            totalPrice: "$800",
        },
        {
            id: 7,
            profile: profile7,
            name: "Pricilia",
            bookingServices: ["nail fixes", "hair placement", "makeup"],
            email: "pricilia@gmail.com",
            phone: "1234567890",
            date: "2015-03-25",
            timeFrame: "10AM - 12PM",
            totalDuration: "2 hours",
            totalPrice: "$100",
        },
        {
            id: 8,
            profile: profile5,
            name: "Favour",
            bookingServices: ["nail fixes", "hair placement", "makeup"],
            email: "favour@gmail.com",
            phone: "1234567890",
            date: "2015-03-26",
            timeFrame: "10AM - 12PM",
            totalDuration: "2 hours",
            totalPrice: "$100",
        },
        {
            id: 9,
            profile: profile6,
            name: "Angle",
            bookingServices: ["nail fixes", "hair placement", "makeup"],
            email: "angle@gmail.com",
            phone: "1234567890",
            date: "2015-03-25",
            timeFrame: "2.30AM - 5.30PM",
            totalDuration: "3 hours",
            totalPrice: "$800",
        },
        {
            id: 10,
            profile: profile7,
            name: "Pricilia",
            bookingServices: ["nail fixes", "hair placement", "makeup"],
            email: "pricilia@gmail.com",
            phone: "1234567890",
            date: "2015-03-25",
            timeFrame: "10AM - 12PM",
            totalDuration: "2 hours",
            totalPrice: "$100",
        },
        {
            id: 11,
            profile: profile5,
            name: "Favour",
            bookingServices: ["nail fixes", "hair placement", "makeup"],
            email: "favour@gmail.com",
            phone: "1234567890",
            date: "2015-03-26",
            timeFrame: "10AM - 12PM",
            totalDuration: "2 hours",
            totalPrice: "$100",
        },
        {
            id: 12,
            profile: profile6,
            name: "Angle",
            bookingServices: ["nail fixes", "hair placement", "makeup"],
            email: "angle@gmail.com",
            phone: "1234567890",
            date: "2015-03-25",
            timeFrame: "2.30AM - 5.30PM",
            totalDuration: "3 hours",
            totalPrice: "$800",
        },
        {
            id: 13,
            profile: profile7,
            name: "Pricilia",
            bookingServices: ["nail fixes", "hair placement", "makeup"],
            email: "pricilia@gmail.com",
            phone: "1234567890",
            date: "2015-03-25",
            timeFrame: "10AM - 12PM",
            totalDuration: "2 hours",
            totalPrice: "$100",
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
        <SidebarInset>
            <SidebarInsetComponent />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4 pt-0">
                {/* Total Bookings */}
                <div className="flex items-center border-2 rounded-md border-gray-200 shadow-lg p-4 bg-white">
                    <div className="mr-4 text-blue-600">
                        <CalendarCheck size={32} />
                    </div>
                    <div>
                        <p className="text-lg font-semibold">203</p>
                        <p className="text-sm text-gray-500">Total Bookings</p>
                    </div>
                </div>

                {/* Confirmed Bookings */}
                <div className="flex items-center border-2 rounded-md border-gray-200 shadow-lg p-4 bg-white">
                    <div className="mr-4 text-green-600">
                        <CircleCheckBig size={32} />
                    </div>
                    <div>
                        <p className="text-lg font-semibold">54</p>
                        <p className="text-sm text-gray-500">Confirmed Bookings</p>
                    </div>
                </div>

                {/* Pending Bookings */}
                <div className="flex items-center border-2 rounded-md border-gray-200 shadow-lg p-4 bg-white">
                    <div className="mr-4 text-yellow-500">
                        <Clock size={32} />
                    </div>
                    <div>
                        <p className="text-lg font-semibold">12</p>
                        <p className="text-sm text-gray-500">Pending Bookings</p>
                    </div>
                </div>

                {/* Cancelled Bookings */}
                <div className="flex items-center border-2 rounded-md border-gray-200 shadow-lg p-4 bg-white">
                    <div className="mr-4 text-red-600">
                        <CalendarX size={32} />
                    </div>
                    <div>
                        <p className="text-lg font-semibold">2</p>
                        <p className="text-sm text-gray-500">Cancelled Bookings</p>
                    </div>
                </div>
            </div>
            <div className="rounded-md  p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                    <div className="bg-white border-2 rounded-md border-gray-200 shadow-md p-4 space-y-4">
                        <p className="text-lg font-semibold">Top Booking Category</p>
                        <p className="text-gray-500">Deluxe Spa Package</p>
                    </div>
                    <div className="bg-white border-2 rounded-md border-gray-200 shadow-md p-4 space-y-4">
                        <p className="text-lg font-semibold">Most Active Day</p>
                        <p className="text-gray-500">Saturday</p>
                    </div>
                    <div className="bg-white border-2 rounded-md border-gray-200 shadow-md p-4 space-y-4">
                        <p className="text-lg font-semibold">Estimated Revenue</p>
                        <p className="text-gray-500">$10,500</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0 max-w-screen-lg overflow-x-auto">
                <Suspense fallback={<div>Loading...</div>}>
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
                                <TableHead className="whitespace-nowrap">TOTAL DURATION</TableHead>
                                <TableHead className="whitespace-nowrap">TOTAL PRICE</TableHead>
                                <TableHead className="whitespace-nowrap">TIME FRAME</TableHead>
                                <TableHead>ACTIONS</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedBookings.map((booking) => (
                                <TableRow key={booking.id}>
                                    <TableCell className="font-medium">{booking.id}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <div className="w-10 h-10 rounded-full relative">
                                                <Image
                                                    src={booking.profile}
                                                    alt={booking.name}
                                                    fill="true"
                                                    priority
                                                    className="object-cover z-10 rounded-full"
                                                />
                                            </div>
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
                                    <TableCell className="whitespace-nowrap">{booking.totalDuration}</TableCell>
                                    <TableCell className="whitespace-nowrap">{booking.totalPrice}</TableCell>
                                    <TableCell className="whitespace-nowrap">{booking.timeFrame}</TableCell>
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
                </Suspense>
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
        </SidebarInset>
    );
}
