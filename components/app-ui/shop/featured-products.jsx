import { Playfair_Display, Shippori_Antique } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { IoStar } from "react-icons/io5";
import { MoveRight } from "lucide-react";
import { MdOutlineShoppingCart } from "react-icons/md";
import image1 from "@/public/product-images/image2.jpg";
import image2 from "@/public/product-images/image3.jpg";
import image3 from "@/public/product-images/image4.jpg";
import image4 from "@/public/product-images/image5.jpg";
import { Button } from "@/components/ui/button";

const playfair_display = Playfair_Display({
    subsets: ["latin"],
    weight: "400",
});

const shipporiAntique = Shippori_Antique({
    subsets: ["latin"],
    weight: "400",
});

const images = [image1, image2, image3, image4];

export default function FeaturedProducts() {
    return (
        <section className="max-w-screen-xl mx-auto px-5 md:px-10 py-10">
            <h3
                className={`uppercase text-[#2D2D2D] text-center text-[11px] ${shipporiAntique.className}`}
            >
                we have a store filled with products you would love
            </h3>
            <h1
                className={`uppercase text-center text-[30px] md:text-[54px] ${playfair_display.className} text-[#38271F] mt-5`}
            >
                SHOP OUR WIDE RANGE OF PRODUCTS
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
                {Array.from({ length: 8 }).map((_, index) => (
                <Link
                    href={`/product/${index}`}
                    key={index}
                    className="hover:bg-[#DFFFCC] p-1 rounded-lg hover:shadow-lg transition duration-300"
                >
                    <div className="relative group">
                        <Image
                            src={images[index % images.length]}
                            alt={`Product ${index + 1}`}
                            width={300}
                            height={300}
                            className="object-cover shadow-md rounded-lg w-full h-[300px] md:h-[320px]"
                            priority
                        />
                        <div className="absolute top-2 left-2 bg-[rgba(46,119,46,0.8)] px-3 py-1 text-xs text-white font-bold rounded-md">
                            18% OFF
                        </div>
                        <div className="absolute bottom-0 left-0 flex items-center gap-2">
                            <Button
                                variant="default"
                                className="bg-[#214207] hover:bg-[#5CA02F] text-white flex items-center gap-2 rounded-none"
                                // onClick={() => handleAddToCart(product.id)}
                            >
                                <MdOutlineShoppingCart className="text-xl" />
                                <span>Add to Cart</span>
                            </Button>
                        </div>
                    </div>
                    <div className="space-y-3 mt-4">
                    <p className="hover:underline text-center text-sm md:text-lg font-medium flex justify-center">
                        Product {index + 1} - Premium Quality
                    </p>
                    <p className="flex gap-3 justify-center">
                        <span className="font-bold text-base text-[#2D2D2D]">$96.00</span>
                        <span className="line-through text-sm text-gray-500">$121.54</span>
                    </p>
                    <div className="flex justify-center gap-1">
                        {[...Array(5)].map((_, starIndex) => (
                        <IoStar key={starIndex} className="text-[#214207] text-lg" />
                        ))}
                    </div>
                    </div>
                </Link>
                ))}
            </div>
            <Link
                href="/shop"
                className="flex items-center justify-center gap-2 mt-10 hover:underline"
            >
                <p className="text-center text-[#A7948B] text-lg md:text-xl">
                VIEW ALL PRODUCTS
                </p>
                <MoveRight className="text-[#A7948B] w-5 h-5" />
            </Link>
        </section>
    );
}
