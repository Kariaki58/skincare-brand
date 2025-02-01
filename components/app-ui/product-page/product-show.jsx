"use client";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";
import { useEffect } from "react";
import useProductStore from "@/store/productStore";
import image3 from "@/public/product-images/image4.jpg";
import { IoStar } from "react-icons/io5";
import Link from "next/link";
import { TiSocialFacebook } from "react-icons/ti";
import { RiTwitterXLine } from "react-icons/ri";
import { TiSocialLinkedin } from "react-icons/ti";
import { FaWhatsapp } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { useParams } from "next/navigation";


export default function ProductShow() {
    const params = useParams();
    const { products, fetchProducts } = useProductStore();
    const { id } = params

    useEffect(() => {
        if (id) {
            fetchProducts(id);
        }
    }, [id]);
    
    if (!products || products.length === 0) {
        return <p>Loading...</p>;
    }
    
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
                            src={products.image} 
                            alt="Product image 3" 
                            height={500} 
                            width={500} 
                            className="rounded-lg object-cover w-full h-auto"
                        />
                    </div>
                {/* </Carousel> */}
                <div className="absolute top-4 left-4 bg-[#38271F] px-3 py-1 text-xs text-white font-semibold rounded-lg shadow-md">
                    {Math.round(((products.basePrice - products.price) / products.basePrice) * 100)} OFF
                </div>
            </div>

            {/* Product Details Section */}
            <div className="flex flex-col space-y-8">
                <h1 className="text-4xl font-extrabold text-[#38271F] leading-tight">{products.name}</h1>
                <div className="flex items-center gap-3">
                    <div className="flex justify-center gap-1">
                        {[...Array(5)].map((_, starIndex) => (
                            <IoStar key={starIndex} className="text-[#214207] text-xl" />
                        ))}
                    </div>
                    <Link href="#" className="text-sm text-[#38271F] underline">(5 customer reviews)</Link>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                    {products.description}
                </p>
                <div className="flex items-center gap-4">
                    <p className="text-3xl font-extrabold text-[#38271F]">${products.basePrice}</p>
                    <p className="line-through text-lg text-gray-400">${products.price}</p>
                </div>
                <div className="flex items-center gap-4">
                    <select className="border w-full bg-[#38271F] text-white px-4 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-gray-800 transition-all duration-200">
                        {[1, 2, 3, 4].map((quantity) => (
                            <option key={quantity} value={quantity}>{quantity}</option>
                        ))}
                    </select>
                    <button className="bg-[#38271F] w-full hover:bg-[#291c17] text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-lg">
                        Add to Cart
                    </button>
                </div>
                <div className="border-t border-[#af9e96] pt-4 space-y-2 text-sm">
                    {/* <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">SKU:</span>
                        <span className="text-gray-800">SKU-123456</span>
                    </div> */}
                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">Category:</span>
                        <Link href={`/shop?category=${products.category.name}`} className="text-[#38271F] hover:underline">{products.category.name}</Link>
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
