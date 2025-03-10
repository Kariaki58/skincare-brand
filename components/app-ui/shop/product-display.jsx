"use client";
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";
import { IoStar } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { MdOutlineShoppingCart } from "react-icons/md";
import { usePathname, useSearchParams } from "next/navigation";
import useCartStore from "@/store/cartStore";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

const fetcher = (url) => fetch(url).then((res) => res.json());

function calculateAverageRating(reviews) {
    if (!reviews?.length) return 0;
    return reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
}

export default function ProductDisplay() {
    const searchParams = useSearchParams();
    const { addToCart } = useCartStore();
    
    const queryString = searchParams.toString();
    const { data: productQueryContent, error } = useSWR(`/api/products?${queryString}`, fetcher, { revalidateOnFocus: false, refreshInterval: 1800000 });

    if (error) return <div className="text-center p-4 text-red-500">Error: {error.message}</div>;
    if (!productQueryContent) return <div className="text-center p-4">Loading...</div>;

    const handleAddToCart = (productId) => {
        const product = productQueryContent.products.find((p) => p._id === productId);
        if (product) addToCart(product, 1);
    };

    const getPageHref = (page) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", page);
        return `?${params.toString()}`;
    };

    return (
        <div className="md:col-span-3 px-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                {productQueryContent.products.map((product) => (
                    <div key={product._id} className="hover:bg-[#DFFFCC] p-1 rounded-lg hover:shadow-lg transition duration-300">
                        <div className="relative group">
                            <Link href={`/product/${product._id}`}>
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    width={300}
                                    height={300}
                                    className="object-cover shadow-md rounded-lg w-full h-[300px] md:h-[320px]"
                                    priority
                                />
                            </Link>
                            <div className="absolute bottom-0 left-0 flex items-center gap-2">
                                {product.stock > 0 ? (
                                    <Button
                                        variant="default"
                                        className="bg-[#214207] hover:bg-[#5CA02F] text-white flex items-center gap-2 rounded-none"
                                        onClick={() => handleAddToCart(product._id)}
                                    >
                                        <MdOutlineShoppingCart className="text-xl" />
                                        <span>Add to Cart</span>
                                    </Button>
                                ) : (
                                    <Button
                                        variant="default"
                                        className="bg-gray-400 text-white flex items-center gap-2 rounded-none cursor-not-allowed"
                                        disabled
                                    >
                                        <MdOutlineShoppingCart className="text-xl" />
                                        <span>Out of Stock</span>
                                    </Button>
                                )}
                            </div>
                        </div>
                        <div className="space-y-3 mt-4">
                            <Link href={`/product/${product._id}`} className="flex justify-center hover:underline text-center text-sm md:text-lg font-medium">
                                {product.name.length > 20 ? `${product.name.substring(0, 20)}...` : product.name}
                            </Link>
                            <p className="flex gap-3 justify-center">
                                <span className="font-bold text-base text-[#2D2D2D]">${product.basePrice}</span>
                            </p>
                            <div className="flex justify-center gap-1">
                                {[...Array(5)].map((_, starIndex) => (
                                    <IoStar key={starIndex} className={`text-lg ${starIndex < calculateAverageRating(product.reviews) ? "text-[#214207]" : "text-gray-400"}`} />
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            {productQueryContent.totalPages > 1 && (
                <Pagination className="mt-8">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href={productQueryContent.currentPage > 1 ? getPageHref(productQueryContent.currentPage - 1) : "#"} />
                        </PaginationItem>

                        {[...Array(productQueryContent.totalPages)].map((_, index) => (
                            <PaginationItem key={index}>
                                <PaginationLink href={getPageHref(index + 1)} isActive={index + 1 === productQueryContent.currentPage}>
                                    {index + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}

                        <PaginationItem>
                            <PaginationNext href={productQueryContent.currentPage < productQueryContent.totalPages ? getPageHref(productQueryContent.currentPage + 1) : "#"} />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    );
}
