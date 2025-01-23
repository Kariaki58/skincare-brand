import { Playfair_Display, Shippori_Antique } from "next/font/google";

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
        <section>
            <h3 className={`uppercase text-[#2D2D2D] text-center text-[11px] ${shipporiAntique.className}`}>we have a store filled with products you would love</h3>
            <h1 className={`uppercase text-center text-[54px] ${playfair_display.className} text-[#A7948B] mt-5`}>SHOP OUR WIDE RANGE OF PRODUCTS</h1>
            
        </section>
    )
}