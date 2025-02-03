"use client";
import Image from "next/image";
import Link from "next/link";
import { IoStar } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { MdOutlineShoppingCart } from "react-icons/md";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useCartStore from "@/store/cartStore";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

function calculateAverageRating(reviews) {
    if (!reviews?.length) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviews.length;
}

export default function ProductDisplay() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [productQueryContent, setProductQueryContent] = useState({ products: [], currentPage: 1, totalPages: 1 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart } = useCartStore();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const params = Object.fromEntries(searchParams.entries());
                const queryString = new URLSearchParams(params).toString();
                const response = await fetch(`/api/products?${queryString}`);
                if (!response.ok) throw new Error('Failed to fetch products');
                const data = await response.json();
                setProductQueryContent(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [pathname, searchParams]);

    const handleAddToCart = (productId) => {
        const product = productQueryContent.products.find(p => p._id === productId);
        if (product) addToCart(product, 1);
    };

    const getPageHref = (page) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', page);
        return `?${params.toString()}`;
    };

    if (loading) return <div className="text-center p-4">Loading...</div>;
    if (error) return <div className="text-center p-4 text-red-500">Error: {error}</div>;

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
                            <div className="absolute top-2 left-2 bg-[rgba(46,119,46,0.8)] px-3 py-1 text-xs text-white font-bold rounded-md">
                                {Math.round(((product.basePrice - product.price) / product.basePrice) * 100)}% OFF
                            </div>
                            <div className="absolute bottom-0 left-0 flex items-center gap-2">
                                <Button variant="default" className="bg-[#214207] hover:bg-[#5CA02F] text-white flex items-center gap-2 rounded-none" onClick={() => handleAddToCart(product._id)}>
                                    <MdOutlineShoppingCart className="text-xl" />
                                    <span>Add to Cart</span>
                                </Button>
                            </div>
                        </div>
                        <div className="space-y-3 mt-4">
                            <Link href={`/product/${product._id}`} className="flex justify-center hover:underline text-center text-sm md:text-lg font-medium">
                                {product.name.length > 20 ? `${product.name.substring(0, 20)}...` : product.name}
                            </Link>
                            <p className="flex gap-3 justify-center">
                                <span className="font-bold text-base text-[#2D2D2D]">{product.price}</span>
                                <span className="line-through text-sm text-gray-500">{product.basePrice}</span>
                            </p>
                            <div className="flex justify-center gap-1">
                                {[...Array(5)].map((_, starIndex) => (
                                    <IoStar key={starIndex} className={`text-lg ${starIndex < calculateAverageRating(product.reviews) ? 'text-[#214207]' : 'text-gray-400'}`} />
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
                            <PaginationPrevious
                                href={productQueryContent.hasPrevPage ? getPageHref(productQueryContent.currentPage - 1) : '#'}
                                aria-disabled={!productQueryContent.hasPrevPage}
                                className={!productQueryContent.hasPrevPage ? 'opacity-50 cursor-not-allowed' : ''}
                            />
                        </PaginationItem>

                        {/* First Page */}
                        <PaginationItem>
                            <PaginationLink
                                href={getPageHref(1)}
                                isActive={1 === productQueryContent.currentPage}
                            >
                                1
                            </PaginationLink>
                        </PaginationItem>

                        {/* Ellipsis before current page if needed */}
                        {productQueryContent.currentPage > 3 && (
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )}

                        {/* Previous page if not adjacent to first */}
                        {productQueryContent.currentPage > 2 && (
                            <PaginationItem>
                                <PaginationLink href={getPageHref(productQueryContent.currentPage - 1)}>
                                    {productQueryContent.currentPage - 1}
                                </PaginationLink>
                            </PaginationItem>
                        )}

                        {/* Current page if not first/last */}
                        {(productQueryContent.currentPage !== 1 && productQueryContent.currentPage !== productQueryContent.totalPages) && (
                            <PaginationItem>
                                <PaginationLink href={getPageHref(productQueryContent.currentPage)} isActive>
                                    {productQueryContent.currentPage}
                                </PaginationLink>
                            </PaginationItem>
                        )}

                        {/* Next page if not adjacent to last */}
                        {productQueryContent.currentPage < productQueryContent.totalPages - 1 && (
                            <PaginationItem>
                                <PaginationLink href={getPageHref(productQueryContent.currentPage + 1)}>
                                    {productQueryContent.currentPage + 1}
                                </PaginationLink>
                            </PaginationItem>
                        )}

                        {/* Ellipsis after current page if needed */}
                        {productQueryContent.currentPage < productQueryContent.totalPages - 2 && (
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )}

                        {/* Last Page */}
                        {productQueryContent.totalPages > 1 && (
                            <PaginationItem>
                                <PaginationLink
                                    href={getPageHref(productQueryContent.totalPages)}
                                    isActive={productQueryContent.totalPages === productQueryContent.currentPage}
                                >
                                    {productQueryContent.totalPages}
                                </PaginationLink>
                            </PaginationItem>
                        )}

                        <PaginationItem>
                            <PaginationNext
                                href={productQueryContent.hasNextPage ? getPageHref(productQueryContent.currentPage + 1) : '#'}
                                aria-disabled={!productQueryContent.hasNextPage}
                                className={!productQueryContent.hasNextPage ? 'opacity-50 cursor-not-allowed' : ''}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    )
}