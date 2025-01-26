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
        <header className="relative h-screen w-full bg-gradient-to-br from-[rgb(2,248,1)] to-[rgb(248,248,0)] max-w-screen-xl mx-auto">
            <Image
                src={headerImage}
                alt="background image for the hair salon banner"
                fill={true}
                className="z-10 object-cover"
                priority
            />
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center z-20">
                <h1 className={`text-white text-4xl ${playfair_display.className} tracking-widest mb-10`}>
                    CHARLOTTE’S EXPERTS IN HAIR BRAIDING & WEAVING.
                </h1>
                <Link href="/services" className="border-2 border-[#333333] bg-[#333333] px-10 py-4 text-white hover:bg-[#4caf50] hover:text-white transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl ml-5 text-[12px] font-[300]">
                    VIEW OUR SERVICES
                </Link>
            </div>
        </header>

    )
}