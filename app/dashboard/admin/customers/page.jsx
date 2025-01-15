"use client";

import { SidebarInsetComponent } from "@/components/dashboard/admin/side-bar-inset-component";
import { SidebarInset } from "@/components/ui/sidebar";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import Image from "next/image";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";

import profile1 from "@/public/gallery/cute-photo-1.jpg";
import profile2 from "@/public/gallery/cute-photo-2.jpg";
import profile3 from "@/public/gallery/cute-photo-3.jpg";
import profile4 from "@/public/gallery/cute-photo-4.jpg";
import profile5 from "@/public/gallery/cute-photo-5.jpg";
import profile6 from "@/public/gallery/cute-photo-6.jpeg";
import profile7 from "@/public/gallery/cute-photo-7.jpg";

const allCustomers = [
    { id: 1, profile: profile1, name: "Anabel", numberOfBookings: 5, email: "anabel@gmail.com", phone: "1234567890" },
    { id: 2, profile: profile2, name: "Sharon", numberOfBookings: 15, email: "sharon@gmail.com", phone: "1234567890" },
    { id: 3, profile: profile3, name: "Sandra", numberOfBookings: 8, email: "sandra@gmail.com", phone: "1234567890" },
    { id: 4, profile: profile4, name: "Sandra", numberOfBookings: 8, email: "sandra@gmail.com", phone: "1234567890" },
    { id: 5, profile: profile5, name: "Favour", numberOfBookings: 13, email: "favour@gmail.com", phone: "1234567890" },
    { id: 6, profile: profile6, name: "Angle", numberOfBookings: 3, email: "angle@gmail.com", phone: "1234567890" },
    { id: 7, profile: profile7, name: "Pricilia", numberOfBookings: 21, email: "pricilia@gmail.com", phone: "1234567890" },
    { id: 8, profile: profile5, name: "Favour", numberOfBookings: 13, email: "favour@gmail.com", phone: "1234567890" },
    { id: 9, profile: profile6, name: "Angle", numberOfBookings: 3, email: "angle@gmail.com", phone: "1234567890" },
    { id: 10, profile: profile7, name: "Pricilia", numberOfBookings: 21, email: "pricilia@gmail.com", phone: "1234567890" },
    { id: 11, profile: profile5, name: "Favour", numberOfBookings: 13, email: "favour@gmail.com", phone: "1234567890" },
    { id: 12, profile: profile6, name: "Angle", numberOfBookings: 3, email: "angle@gmail.com", phone: "1234567890" },
    { id: 13, profile: profile7, name: "Pricilia", numberOfBookings: 21, email: "pricilia@gmail.com", phone: "1234567890" },
];

function PaginatedCustomers({ customersPerPage }) {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(allCustomers.length / customersPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        router.push(`?page=${page}`, undefined, { shallow: true });
    };

    const paginatedCustomers = allCustomers.slice(
        (currentPage - 1) * customersPerPage,
        currentPage * customersPerPage
    );

    return (
        <>
            <Table>
                <TableCaption>A list of your customers</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>NAME</TableHead>
                        <TableHead>BOOKINGS</TableHead>
                        <TableHead>EMAIL</TableHead>
                        <TableHead>PHONE</TableHead>
                        <TableHead>ACTIONS</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paginatedCustomers.map((customer) => (
                        <TableRow key={customer.id}>
                            <TableCell className="font-medium">{customer.id}</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 rounded-full relative">
                                        <Image
                                            src={customer.profile}
                                            alt={customer.name}
                                            fill="true"
                                            priority
                                            className="object-cover z-10 rounded-full"
                                        />
                                    </div>
                                    {customer.name}
                                </div>
                            </TableCell>
                            <TableCell>{customer.numberOfBookings}</TableCell>
                            <TableCell>{customer.email}</TableCell>
                            <TableCell>{customer.phone}</TableCell>
                            <TableCell>
                                <Trash2
                                    size={24}
                                    className="text-red-700 hover:text-red-900 hover:cursor-pointer"
                                />
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
        </>
    );
}

export default function Customers() {
    return (
        <SidebarInset>
            <SidebarInsetComponent />
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <Suspense fallback={<div>Loading customers...</div>}>
                    <PaginatedCustomers customersPerPage={10} />
                </Suspense>
            </div>
        </SidebarInset>
    );
}
