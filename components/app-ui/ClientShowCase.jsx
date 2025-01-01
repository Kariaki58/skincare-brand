import Image from "next/image";
import Link from "next/link";
import clientFirst from "@/public/client-1.jpg";
import clientSecond from "@/public/client-2.jpg";
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
        <section className="max-w-screen-xl mx-auto my-20">
            <div className="flex gap-10 mb-12 items-center">
                <div className="flex">
                    <div className="h-[30rem] w-96 border-8 border-white p-10 relative -left-36">
                        <Image src={clientFirst} alt="Client 1"
                            fill={true}
                            className="z-10 object-cover"
                            priority
                        />
                    </div>
                    <div className="h-[30rem] w-96 border-8 border-white relative p-10 -left-28">
                        <Image src={clientSecond} alt="Client 2"
                            fill={true}
                            className="z-10 object-cover"
                            priority
                        />
                    </div>
                </div>
                
                <div className="max-w-sm">
                    <h1 className={`text-[45px] ${playfair_display.className} text-[#38271F] mb-4 leading-[54px]`}>EXPLORE OUR PAST CLIENTS</h1>
                    <p className={`text-[14px] ${outfit.className} leading-[25.2px] text-[#2D2D2D] mb-6`}>
                        Write about your ideal target audience & what problem you solve. 
                        You are only limited by your imagination. By now you should be quite happy about 
                        what's happening here, things will happen.
                    </p>
                    <Link href="/gallery" className={`text-base leading-[14.4px] text-underline-offset-2 underline ${shappori_antique.className} text-[#A7948B]`}>
                        VIEW FULL GALLERY
                    </Link>
                </div>
            </div>
            
        </section>
    );
}
