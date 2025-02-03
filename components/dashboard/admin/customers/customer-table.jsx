"use client";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
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
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function CustomerTable() {
    const [customers, setCustomers] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const searchParams = useSearchParams();
    const router = useRouter();

    const currentPage = parseInt(searchParams.get("page")) || 1;

    useEffect(() => {
        async function fetchCustomers() {
            try {
                const res = await fetch(`/api/customer?page=${currentPage}`);
                if (!res.ok) throw new Error("Failed to fetch customers");
                const data = await res.json();
                setCustomers(data.customers);
                setTotalPages(data.totalPages);
            } catch (error) {
                console.error(error);
            }
        }
        fetchCustomers();
    }, [currentPage]);

    const handlePageChange = (page) => {
        router.push(`?page=${page}`);
    };

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
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
                    {customers.map((customer) => (
                        <TableRow key={customer._id}>
                            <TableCell className="font-medium">{customer._id}</TableCell>
                            <TableCell>{customer.name}</TableCell>
                            <TableCell>{customer.numberOfBookings || 0}</TableCell>
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
        </div>
    );
}
