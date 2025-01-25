import { Playfair_Display, Shippori_Antique } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import eyeLash from "@/public/eye-lashes-fix.jpg";
import lashes from "@/public/lashes.jpg";
import { IoStar } from "react-icons/io5";
import { MoveRight } from "lucide-react";
import { MdOutlineShoppingCart } from "react-icons/md";


const playfair_display = Playfair_Display({
    subsets: ["latin"],
    weight: "400"
});


const shipporiAntique = Shippori_Antique({
    subsets: ["latin"],
    weight: "400",
});


export default function FeaturedProducts() {
    return (
        <section className="max-w-screen-xl mx-auto px-10">
            <h3 className={`uppercase text-[#2D2D2D] text-center text-[11px] ${shipporiAntique.className}`}>we have a store filled with products you would love</h3>
            <h1 className={`uppercase text-center text-[54px] ${playfair_display.className} text-[#A7948B] mt-5`}>SHOP OUR WIDE RANGE OF PRODUCTS</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mt-10">
                {Array.from({ length: 8 }).map((_, index) => (
                <Link href={`/product/${index}`} key={index} className="hover:bg-[#F8F8F8] px-1 pt-1 pb-5 rounded-lg hover:shadow-lg">
                    <div className="relative group">
                        <Image
                            src={lashes}
                            alt={`Product ${index + 1}`}
                            width={200}
                            height={200}
                            className="object-cover shadow-xl rounded-lg w-full h-[520px] md:h-[320px]"
                            priority
                        />
                        <div className="flex absolute bottom-2 left-2 items-center gap-2 font-bold cursor-pointer text-[#fce7de]">
                            <MdOutlineShoppingCart className="text-2xl" />
                            <p className="text-sm uppercase">Add to Cart</p>
                        </div>
                    </div>
                    <div className="space-y-2 mt-4">
                        <p className="hover:underline text-center text-sm md:text-lg font-thin">
                            Eye Lashes Extension Home Page
                        </p>
                        <p className="flex gap-3 justify-center">
                            <span className="font-bold text-base">$96.00</span>
                            <span className="line-through text-sm text-gray-500">$121.54</span>
                        </p>
                        <div className="flex justify-center gap-1">
                            {[...Array(5)].map((_, starIndex) => (
                            <IoStar key={starIndex} className="text-[#8A6251]" />
                            ))}
                        </div>
                    </div>
                </Link>
                ))}
            </div>
            <Link href="/shop" className="flex items-center justify-center gap-2 mt-10">
                <p className="text-center text-[#A7948B] text-xl hover:underline">VIEW ALL PRODUCTS</p>
                <MoveRight className="text-[#A7948B] w-5 h-5" />
            </Link>

        </section>
    )
}