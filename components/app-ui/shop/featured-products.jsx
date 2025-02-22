import { Playfair_Display, Shippori_Antique } from "next/font/google";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import ProductImage from "@/public/product-images/product-image-1.jpeg"
import storeImage from "@/public/product-images/store-image-2.jpeg";

const playfair_display = Playfair_Display({
    subsets: ["latin"],
    weight: "400",
});

const shipporiAntique = Shippori_Antique({
    subsets: ["latin"],
    weight: "400",
});


export default function FeaturedProducts() {
    return (
        <section className="max-w-screen-xl mx-auto px-5 md:px-10 py-10">
            <h3
                className={`uppercase text-black text-center text-base ${shipporiAntique.className}`}
            >
                we have a store filled with products you would love
            </h3>
            <h1
                className={`uppercase text-center text-[30px] md:text-[54px] ${playfair_display.className} text-black mt-5`}
            >
                SHOP OUR WIDE RANGE OF PRODUCTS
            </h1>
            <div className="flex justify-center items-center mt-4">
                <div className="flex flex-col md:flex-row gap-5 w-full max-w-4xl px-4">
                    {/* Image Card 1 */}
                    <div className="relative w-full md:w-1/2 aspect-[4/5] rounded-lg overflow-hidden">
                    <Image
                        src={ProductImage}
                        alt="Contact page image"
                        fill
                        className="object-cover rounded-lg"
                    />
                    </div>

                    {/* Image Card 2 */}
                    <div className="relative w-full md:w-1/2 aspect-[4/5] rounded-lg overflow-hidden">
                    <Image
                        src={storeImage}
                        alt="Contact page image"
                        fill
                        className="object-cover rounded-lg"
                    />
                    </div>
                </div>
            </div>

            <Link
                href="/shop"
                className="flex items-center justify-center gap-2 mt-10 hover:underline"
            >
                <p className="text-center text-black text-lg md:text-xl">
                VIEW ALL PRODUCTS
                </p>
                <MoveRight className="text-black w-5 h-5" />
            </Link>
        </section>
    );
}
