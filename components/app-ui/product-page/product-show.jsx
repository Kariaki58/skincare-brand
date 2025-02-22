"use client";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";
import { IoStar } from "react-icons/io5";
import Link from "next/link";
import { useState } from "react";
import { useParams } from "next/navigation";
import useCartStore from "@/store/cartStore";
import useSWR from "swr";


function calculateAverageRating(reviews) {
    if (!reviews) return 0;
    if (!reviews.length) return 0;

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviews.length;
}


const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ProductShow() {
    const [quantity, setQuantity] = useState(1);
    const params = useParams();
    const { id } = params;
    const { addToCart } = useCartStore();

    // Cache data and revalidate every 30 minutes
    const { data: product, error } = useSWR(`/api/products/${id}`, fetcher, {
        refreshInterval: 1800 * 1000, // 30 minutes
    });

    if (error) return <p>Error loading product.</p>;
    if (!product) return <p>Loading...</p>;


    const handleAddToCart = () => {
        addToCart(product, quantity);
    };

    return (
        <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 p-6 md:p-10">
            {/* Carousel Section */}
            <div className="relative flex justify-center items-center">
                <div>
                    <Image 
                        src={product.image} 
                        alt="Product image 3" 
                        height={500} 
                        width={500} 
                        className="rounded-lg object-cover w-full h-auto"
                    />
                </div>
            </div>

            {/* Product Details Section */}
            <div className="flex flex-col space-y-8">
                <h1 className="text-4xl font-extrabold text-black leading-tight">{product.name}</h1>
                <div className="flex items-center gap-3">
                    <div className="flex justify-center gap-1">
                        {[...Array(5)].map((_, starIndex) => (
                            <div key={starIndex}>
                                <input 
                                    type="radio" 
                                    id={`star-${starIndex + 1}`} 
                                    name="rating" 
                                    value={starIndex + 1} 
                                    className="hidden" 
                                />
                                <label 
                                    htmlFor={`star-${starIndex + 1}`} 
                                    className={`text-lg ${starIndex < calculateAverageRating(product?.reviews) ? 'text-[#214207]' : 'text-gray-400'}`} // Color change based on rating
                                >
                                    <IoStar />
                                </label>
                            </div>
                        ))}
                    </div>
                    <Link 
                        href={`#reviews`} 
                        className="text-sm text-black underline"
                        onClick={(e) => {
                            e.preventDefault();
                            const reviewsSection = document.getElementById("reviews");
                            if (reviewsSection) {
                            reviewsSection.scrollIntoView({ behavior: "smooth" });
                            }
                        }}
                        >
                        ({product?.reviews?.length} customer reviews)
                    </Link>

                </div>
                <p className="text-base text-black leading-relaxed">
                    {product.description}
                </p>
                <div className="flex items-center gap-4">
                    <p className="text-3xl font-extrabold text-black">Price: ${product.basePrice}</p>
                </div>
                <div className="flex items-center gap-4">
                    <select className="border w-full bg-black text-white px-4 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-gray-800 transition-all duration-200"
                        onChange={(e) => setQuantity(e.target.value)}
                        value={quantity}
                    >
                        {[1, 2, 3, 4].map((quantity) => (
                            <option key={quantity} value={quantity}>{quantity}</option>
                        ))}
                    </select>
                    {product.stock > 0 ? (
                        <button className="bg-black w-full hover:bg-[#291c17] text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-lg"
                            onClick={handleAddToCart}
                        >
                            Add to Cart
                        </button>
                    ) : (
                        <button
                            className="bg-gray-400 text-white flex items-center gap-2 rounded-none cursor-not-allowed"
                            disabled
                        >
                            <span>Out of Stock</span>
                        </button>
                    )}
                    
                </div>
                <div className="border-t border-[#af9e96] pt-4 space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                        <span className="text-black font-bold">Category:</span>
                        <Link href={`/shop?category=${product?.category?.name}`} className="text-black underline">{product?.category?.name}</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
