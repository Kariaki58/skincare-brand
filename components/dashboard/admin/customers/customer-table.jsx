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
import useSWR from "swr";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function CustomerTable() {
    const searchParams = useSearchParams();
    const { toast } = useToast();
    const router = useRouter();
    const currentPage = parseInt(searchParams.get("page")) || 1;

    const { data, error, mutate } = useSWR(`/api/customer?page=${currentPage}`, fetcher);

    if (error) return <p className="text-red-600">Failed to load customers.</p>;
    if (!data) return <p>Loading...</p>;

    const { customers, totalPages } = data;

    const handlePageChange = (page) => {
        router.push(`?page=${page}`);
    };

    const handleDelete = async (customerId) => {
        try {
            const res = await fetch(`/api/customer/${customerId}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "There was a problem with your request.",
                });
            }

            // Mutate the cache and remove the deleted customer
            mutate((currentData) => ({
                ...currentData,
                customers: currentData.customers.filter((c) => c._id !== customerId),
            }), false);
            toast({
                variant: "success",
                title: "Customer deleted successfully",
                description: "The customer has been removed from the system.",
            });
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "Failed to delete the customer. Please try again.",
            });
        }
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
                                    onClick={() => handleDelete(customer._id)}
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
