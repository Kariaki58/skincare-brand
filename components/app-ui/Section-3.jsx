import Image from "next/image";
import cofounderImage from "@/public/cofounder-girl.jpg";
import Link from "next/link";
import { Playfair_Display, Shippori_Antique, Outfit } from "next/font/google";

const playfair_display = Playfair_Display({
    subsets: ["latin"],
    weight: "400",
});

const outfit = Outfit({
    subsets: ["latin"],
    weight: "300",
});

export default function ServiceSection() {
    return (
        <section className="max-w-screen-xl mx-auto my-20 px-4 sm:px-8 md:px-12">
            <div className="flex flex-col md:flex-row gap-14 items-center">
                {/* Image Container */}
                <div className="relative w-full h-[30rem] sm:h-[25rem] md:h-[40rem] md:w-[50%] border border-black p-2 rounded-full flex items-center justify-center">
                    <Image
                        src={cofounderImage}
                        alt="co founder image for the clinic"
                        fill={true}
                        className="z-10 p-1 rounded-full object-cover"
                        priority
                    />
                </div>

                {/* Text Content */}
                <div className="w-full md:w-[50%] text-center md:text-left">
                    <h2
                        className={`uppercase text-[32px] sm:text-[40px] text-[#38271F] ${playfair_display.className} antialiased`}
                    >
                        Professional Braid feel
                    </h2>
                    <h3 className="text-sm sm:text-base uppercase my-5 tracking-widest font-medium font-serif">
                        LOCATED IN 5811 Freedom Drive, Charlotte, NC 28214
                    </h3>
                <p
                    className={`mb-10 ${outfit.className} text-[12px] sm:text-[14px] tracking-widest text-sm font-light text-[#2D2D2D]`}
                >
                    At Victoria Hair Braiding and Weaving Center, we specialize in creating beautiful, 
                    custom braids and weaves that express your unique style. From box braids to knotless, cornrows, 
                    and extensions, we offer styles that last and make you feel confident. 
                    Let us bring your hair vision to life with expert care and creativity.
                </p>
                <ul
                    className={`flex flex-col sm:flex-row justify-between gap-8 sm:gap-10 mb-10 ${playfair_display.className} text-[#38271F] text-[24px] sm:text-[30px]`}
                >
                    <ul className="space-y-3 sm:space-y-5">
                        <li className="capitalize text-xl sm:text-2xl">Micro braids</li>
                        <li className="capitalize text-xl sm:text-2xl">Knotless Braids</li>
                        <li className="capitalize text-xl sm:text-2xl">Senegalese Twist</li>
                    </ul>
                    <ul className="space-y-3 sm:space-y-5">
                        <li className="capitalize text-xl sm:text-2xl">Box braids</li>
                        <li className="capitalize text-xl sm:text-2xl">Kinky twist</li>
                        <li className="capitalize text-xl sm:text-2xl">Soft Loc</li>
                    </ul>
                </ul>
                <Link
                    href="/services"
                    className={`inline-block border border-black px-8 sm:px-10 py-3 sm:py-4 text-black text-[10px] sm:text-[12px] bg-white hover:bg-gray-50 hover:text-gray-400 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl`}
                >
                    VIEW ALL SERVICES
                </Link>
                </div>
            </div>
        </section>
    );
}
