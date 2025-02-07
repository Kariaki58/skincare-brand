"use client";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";
import { IoStar } from "react-icons/io5";
import Link from "next/link";
import { useParams } from "next/navigation";
import useCartStore from "@/store/cartStore";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ProductShow() {
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
        addToCart(product, 1);
    };

    return (
        <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 p-6 md:p-10">
            {/* Image Section */}
            <div className="relative flex justify-center items-center">
                {/* <div className="relative w-96 h-72"> */}
                    <Image 
                        src={product.image} 
                        alt="Product image" 
                        height={500} 
                        width={500} 
                        className="rounded-lg object-cover w-full h-[35rem]"
                    />
                {/* </div> */}
                {/* <div className="absolute top-4 left-4 bg-[#38271F] px-3 py-1 text-xs text-white font-semibold rounded-lg shadow-md">
                    {Math.round(((product.basePrice - product.price) / product.basePrice) * 100)}% OFF
                </div> */}
            </div>

            {/* Product Details */}
            <div className="flex flex-col space-y-8">
                <h1 className="text-4xl font-extrabold text-[#38271F] leading-tight">{product.name}</h1>
                <div className="flex items-center gap-3">
                    <div className="flex justify-center gap-1">
                        {[...Array(5)].map((_, index) => (
                            <IoStar key={index} className={`text-lg ${index < product.rating ? "text-[#214207]" : "text-gray-400"}`} />
                        ))}
                    </div>
                    <Link href={`/product/${id}/reviews`} className="text-sm text-[#38271F] underline">
                        ({product?.reviews?.length} customer reviews)
                    </Link>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">{product.description}</p>
                <div className="flex items-center gap-4">
                    <p className="text-3xl font-extrabold text-[#38271F]">Price: ${product.price}</p>
                    {/* <p className="line-through text-lg text-gray-400">${product.basePrice}</p> */}
                </div>
                <button className="bg-[#38271F] w-full hover:bg-[#291c17] text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-lg"
                    onClick={handleAddToCart}>
                    Add to Cart
                </button>
            </div>
        </section>
    );
}
