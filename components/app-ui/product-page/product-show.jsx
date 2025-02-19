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
                {/* <Carousel
                    showThumbs={false}
                    autoPlay
                    infiniteLoop
                    interval={3000}
                    showArrows={true}
                    showStatus={false}
                    className="rounded-lg overflow-hidden shadow-xl border border-gray-200"
                > */}
                    <div>
                        <Image 
                            src={product.image} 
                            alt="Product image 3" 
                            height={500} 
                            width={500} 
                            className="rounded-lg object-cover w-full h-auto"
                        />
                    </div>
                {/* </Carousel> */}
                {/* <div className="absolute top-4 left-4 bg-[#38271F] px-3 py-1 text-xs text-white font-semibold rounded-lg shadow-md">
                    {Math.round(((product.basePrice - product.price) / product.basePrice) * 100)} OFF
                </div> */}
            </div>

            {/* Product Details Section */}
            <div className="flex flex-col space-y-8">
                <h1 className="text-4xl font-extrabold text-[#38271F] leading-tight">{product.name}</h1>
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
                    <Link href={`/product/${id}/reviews`} className="text-sm text-[#38271F] underline">({product?.reviews?.length} customer reviews)</Link>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                    {product.description}
                </p>
                <div className="flex items-center gap-4">
                    <p className="text-3xl font-extrabold text-[#38271F]">Price: ${product.basePrice}</p>
                    {/* <p className="line-through text-lg text-gray-400">${product.price}</p> */}
                </div>
                <div className="flex items-center gap-4">
                    <select className="border w-full bg-[#38271F] text-white px-4 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-gray-800 transition-all duration-200"
                        onChange={(e) => setQuantity(e.target.value)}
                        value={quantity}
                    >
                        {[1, 2, 3, 4].map((quantity) => (
                            <option key={quantity} value={quantity}>{quantity}</option>
                        ))}
                    </select>
                    {product.stock > 0 ? (
                        <button className="bg-[#38271F] w-full hover:bg-[#291c17] text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-lg"
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
                    {/* <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">SKU:</span>
                        <span className="text-gray-800">SKU-123456</span>
                    </div> */}
                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">Category:</span>
                        <Link href={`/shop?category=${product?.category?.name}`} className="text-[#38271F] hover:underline">{product?.category?.name}</Link>
                        {/* <Link href="#" className="text-[#38271F] hover:underline">Primers</Link> */}
                    </div>
                    {/* <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">Tags:</span>
                        <Link href="#" className="text-[#38271F] hover:underline">Beauty</Link>, 
                        <Link href="#" className="text-[#38271F] hover:underline">Skin Care</Link>
                    </div> */}
                    {/* <div className="flex items-center gap-4 mt-4">
                        <span className="font-semibold text-gray-900">Share:</span>
                        <div className="flex items-center gap-3 text-xl text-gray-500">
                            <TiSocialFacebook className="hover:text-[#3b5998] cursor-pointer" />
                            <RiTwitterXLine className="hover:text-[#1DA1F2] cursor-pointer" />
                            <TiSocialLinkedin className="hover:text-[#0077b5] cursor-pointer" />
                            <FaWhatsapp className="hover:text-[#25D366] cursor-pointer" />
                            <FaInstagram className="hover:text-[#E4405F] cursor-pointer" />
                        </div>
                    </div> */}
                </div>
            </div>
        </section>
    );
}
