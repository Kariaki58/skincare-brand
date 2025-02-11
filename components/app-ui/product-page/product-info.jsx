"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table"
import { useEffect } from "react";
import useProductStore from "@/store/productStore";

export default function ProductInfo({ id }) {
    const { products, fetchProducts } = useProductStore();
    
    useEffect(() => {
        if (id) {
            fetchProducts(id); // Fetch product data when the id changes
        }
    }, [id]);
    
    if (!products || products.length === 0) {
        return <p>Loading...</p>;
    }
    return (
        <div className="max-w-7xl mx-auto p-6 md:p-10">
            <Table className="border border-black">
                <TableBody>
                    {products.additionalInfo.map((info, index) => (
                        <TableRow key={index} className="border border-black">
                            <TableCell className="p-4 border-r border-black">{info.key}</TableCell>
                            <TableCell className="p-4 border-r border-black">{info.value}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </div>
    )
}