import { Playfair_Display, Shippori_Antique } from "next/font/google";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import image1 from "@/public/product-images/image2.jpg";
import image2 from "@/public/product-images/image3.jpg";
import image3 from "@/public/product-images/image4.jpg";
import image4 from "@/public/product-images/image5.jpg";
import ProductDisplay from "../product-display/product-display";
import { Suspense } from "react";

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
            <Suspense fallback={<p>Loading...</p>}>
                <ProductDisplay images={images}/>
            </Suspense>
            <Link
                href="/shop"
                className="flex items-center justify-center gap-2 mt-10 hover:underline"
            >
                <p className="text-center text-[#38271F] text-lg md:text-xl">
                VIEW ALL PRODUCTS
                </p>
                <MoveRight className="text-[#38271F] w-5 h-5" />
            </Link>
        </section>
    );
}
