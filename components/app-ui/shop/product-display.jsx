"use client";
import Image from "next/image";
import Link from "next/link";
import { IoStar } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { MdOutlineShoppingCart } from "react-icons/md";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";



export default function ProductDisplay() {
        const pathname = usePathname();
        const searchParams = useSearchParams();
        const [productQueryContent, setProductQueryContent] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);


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
            console.log("Product added to cart:", productId);
        }

        if (loading) return <div className="text-center p-4">Loading...</div>;
        if (error) return <div className="text-center p-4 text-red-500">Error: {error}</div>;

        console.log(productQueryContent.products)
    return (
        <div className="md:col-span-3 px-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                {productQueryContent.products.map((product) => (
                    <div
                        key={product._id}
                        className="hover:bg-[#DFFFCC] p-1 rounded-lg hover:shadow-lg transition duration-300"
                    >
                        <div className="relative group">
                            <Link href={`/product/${product._id}`}>
                                <Image
                                    src={product.image}
                                    alt={`Product 1`}
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
                                <Button
                                    variant="default"
                                    className="bg-[#214207] hover:bg-[#5CA02F] text-white flex items-center gap-2 rounded-none"
                                    onClick={() => handleAddToCart(product._id)}
                                >
                                    <MdOutlineShoppingCart className="text-xl" />
                                    <span>Add to Cart</span>
                                </Button>
                            </div>
                        </div>
                        <div className="space-y-3 mt-4">
                            <Link href={`/product/${product._id}`} className="flex justify-center hover:underline text-center text-sm md:text-lg font-medium">
                                {product.name}
                            </Link>
                            <p className="flex gap-3 justify-center">
                                <span className="font-bold text-base text-[#2D2D2D]">{product.price}</span>
                                <span className="line-through text-sm text-gray-500">{product.basePrice}</span>
                            </p>
                            <div className="flex justify-center gap-1">
                                {[...Array(5)].map((_, starIndex) => (
                                    <IoStar key={starIndex} className="text-[#214207] text-lg" />
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}