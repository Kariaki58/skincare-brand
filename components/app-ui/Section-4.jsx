import Image from "next/image";
import Link from "next/link";
import eyeLashes from "@/public/eye-lashes-fix.jpg";
import lasheSection from "@/public/eye-lashes-section.jpg";
import bussinessWoman from "@/public/bussiness-woman.jpeg";
import { Playfair_Display, Shippori_Antique } from "next/font/google";


const playfair_display = Playfair_Display({
    subsets: ["latin"],
    weight: "400"
});


const shipporiAntique = Shippori_Antique({
    subsets: ["latin"],
    weight: "400",
});


export default function CategorySection() {
    return (
        <section className="max-w-screen-xl mx-auto mt-36">
            <h3 className={`uppercase text-[#2D2D2D] text-center text-[11px] ${shipporiAntique.className}`}>aesthetics clinic offering skin treatments, lashes & BEAUTY SERVICES</h3>
            <h1 className={`uppercase text-center text-[54px] ${playfair_display.className} text-[#A7948B] mt-5`}>EXPLORE BARE BEAUTY CLINIC</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-center my-20">
                <Link href="/gallery" className="h-[30rem] shadow-xl shadow-black relative hover:cursor-pointer hover:opacity-80 transition-opacity duration-700">
                    <Image
                        src={lasheSection}
                        alt="co founder image for the clinic"
                        fill={true}
                        className="z-10 object-cover"
                        priority
                    />
                    <div className="absolute bottom-5 left-0 w-full text-white p-4 text-center z-20">
                        <h3 className="text-sm uppercase">Explore</h3>
                        <h2 className="text-3xl font-bold uppercase">The Gallery</h2>
                    </div>
                </Link>
                <Link href="/services" className="h-[40rem] shadow-xl shadow-black relative hover:cursor-pointer hover:opacity-80 transition-opacity duration-700">
                    <Image
                        src={eyeLashes}
                        alt="co founder image for the clinic"
                        fill={true}
                        className="z-10 object-cover"
                        priority
                    />
                    <div className="absolute bottom-5 left-0 w-full text-white p-4 text-center z-20">
                        <h3>EXPORE</h3>
                        <h2 className="text-3xl">OUR SERVICES</h2>
                    </div>
                </Link>
                <Link href="/about" className="h-[30rem] shadow-xl shadow-black relative hover:cursor-pointer hover:opacity-80 transition-opacity duration-700">
                    <Image
                        src={bussinessWoman}
                        alt="co founder image for the clinic"
                        fill={true}
                        className="z-10 object-cover"
                        priority
                    />
                    <div className="absolute bottom-5 left-0 w-full text-white p-4 text-center z-20">
                        <h3 className="text-sm">LEARN MORE</h3>
                        <h2 className="text-3xl">ABOUT US</h2>
                    </div>
                </Link>
            </div>
        </section>
    )
}