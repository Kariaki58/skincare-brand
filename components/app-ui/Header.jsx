import Image from "next/image";
import Link from "next/link";
import headerImage from "@/public/header-image.jpg";
import { Playfair_Display } from "next/font/google";


const playfair_display = Playfair_Display({
    subsets: ["latin"],
    weight: "400"
});


export default function Header() {
    return (
        <header className="relative h-screen w-full bg-gradient-to-b from-[#f6f9ff] to-[#9ba3b1] max-w-screen-xl mx-auto">
            <Image
                src={headerImage}
                alt="background image for the hair salon banner"
                fill={true}
                className="z-10 object-cover"
                priority
            />
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center z-20">
                <h1 className={`text-white text-4xl ${playfair_display.className} tracking-widest whitespace-nowrap mb-10`}>
                    TORONTO'S TOP AESTHETICS & BEAUTY CLINIC 
                </h1>
                <Link href="/book"     className="border-2 border-white px-10 py-4 text-white text-[12px] font-[300] hover:bg-gray-50 hover:text-gray-400 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl">
                    BOOK APPOINTMENT
                </Link>
                <Link href="/services" className="border-2 border-white px-10 py-4 text-white hover:bg-gray-50 hover:text-gray-400 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl ml-5 text-[12px] font-[300]">
                    VIEW OUR SERVICES
                </Link>
            </div>
        </header>
    )
}