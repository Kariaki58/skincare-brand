import Image from "next/image";
import Link from "next/link";
import clientFirst from "@/public/card-1.jpg";
import clientSecond from "@/public/card-2.jpg";
import { Playfair_Display, Outfit, Shippori_Antique } from "next/font/google";

const playfair_display = Playfair_Display({
    subsets: ["latin"],
    weight: "400"
});

const outfit = Outfit({
    subsets: ["latin"],
    weight: "300"
});

const shappori_antique = Shippori_Antique({
    subsets: ["latin"],
    weight: "400"
});

export default function ClientShowCase() {
    return (
        <section className="max-w-screen-xl mx-auto my-20 px-5 md:px-10 lg:px-0">
            <div className="flex flex-col lg:flex-row gap-10 mb-12 items-center">
                <div className="flex flex-col sm:flex-row gap-5">
                    <div className="h-80 w-64 sm:h-[30rem] sm:w-96 border-8 border-[#214207] p-5 sm:p-10 relative">
                        <Image src={clientFirst} alt="Client 1"
                            fill={true}
                            className="z-10 object-cover"
                            priority
                        />
                    </div>
                    <div className="h-80 w-64 sm:h-[30rem] sm:w-96 border-8 border-[#214207] p-5 sm:p-10 relative">
                        <Image src={clientSecond} alt="Client 2"
                            fill={true}
                            className="z-10 object-cover"
                            priority
                        />
                    </div>
                </div>
                
                <div className="max-w-sm text-center lg:text-left">
                    <h1 className={`text-[30px] sm:text-[45px] ${playfair_display.className} text-black mb-4 leading-[40px] sm:leading-[54px]`}>
                        EXPLORE OUR PAST CLIENTS
                    </h1>
                    <p className={`text-base ${outfit.className} leading-[25.2px] text-black mb-6`}>
                        The problem we solve is twofold: finding a salon that understands your unique hair 
                        needs and delivering consistent, quality results. We provide expert care for all hair types, 
                        from braids and weaves to natural hair treatments, ensuring every client leaves feeling confident, stylish, and satisfied.
                    </p>
                    <Link href="/gallery" className={`text-base leading-[14.4px] text-underline-offset-2 underline ${shappori_antique.className} text-black`}>
                        VIEW FULL GALLERY
                    </Link>
                </div>
            </div>
        </section>
    );
}