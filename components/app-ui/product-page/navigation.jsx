"use client";
import Link from "next/link";
import { useEffect } from "react";
import { usePathname, useParams } from "next/navigation";
import useProductStore from "@/store/productStore";


export default function Navigation() {
    const pathname = usePathname();
    const params = useParams();
    const productId = params.id;

    const isActive = (path) => pathname.startsWith(path);

    const { products, fetchProducts } = useProductStore();
    
    useEffect(() => {
        if (productId) {
            fetchProducts(productId);
        }
    }, [productId]);
    
    if (!products || products.length === 0) {
        return <p>Loading...</p>;
    }

    return (
        <nav className="flex justify-center">
            <ul className="flex items-center gap-8">
                <li
                    className={`text-xl font-medium ${
                        isActive("/product/") && !pathname.includes("/reviews")
                            ? "text-[#214207] font-semibold"
                            : "text-gray-600"
                    }`}
                >
                    <Link href={`/product/${productId}`}>Additional information</Link>
                </li>
                <li
                    className={`text-xl font-medium ${
                        isActive("/product/") && pathname.includes("/reviews")
                            ? "text-[#214207] font-semibold"
                            : "text-gray-600"
                    }`}
                >
                <Link href={`/product/${productId}/reviews`}>
                    {products?.reviews?.length === 1 ? `Review (${products?.reviews?.length})` : `Reviews (${products?.reviews?.length})`}
                </Link>
                </li>
            </ul>
        </nav>
    );
}
