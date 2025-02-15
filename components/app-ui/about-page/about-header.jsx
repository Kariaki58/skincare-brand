import Image from "next/image";
import photoAbout1 from "@/public/about-images/about-picture-2.jpeg";
import { Spectral, Outfit } from "next/font/google";

const spectral = Spectral({
    subsets: ["latin"],
    weight: "400",
});

const outfit = Outfit({
    subsets: ["latin"],
    weight: "300",
});

export default function AboutHeader() {
    return (
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row gap-10 md:gap-16 items-center justify-center py-10 px-5">
            <div className="relative shadow-xl w-[18rem] h-[18rem] md:w-[35rem] md:h-[35rem] rounded-full flex items-center justify-center overflow-hidden">
                <Image
                    src={photoAbout1}
                    alt="Co-founder image for the salon"
                    fill={true}
                    className="z-10 rounded-full object-cover"
                    priority
                />
            </div>
            <div className="space-y-6 max-w-2xl text-center md:text-left">
                <h1 className={`uppercase text-[30px] md:text-[50px] leading-[40px] md:leading-[60px] text-[#38271F] ${spectral.className} antialiased`}>Charlotte's Premier Hair Salon</h1>
                <p className={`text-[14px] md:text-[15px] ${outfit.className} leading-[24px] md:leading-[30px] text-[#2D2D2D]`}>
                    At Victoria Hair Braiding and Weaving Center, we pride ourselves on delivering top-notch hair care services in a welcoming and professional environment. From intricate braiding to seamless weaving, our experienced stylists are dedicated to enhancing your beauty and confidence.
                </p>
                <p className={`text-[14px] md:text-[15px] ${outfit.className} leading-[24px] md:leading-[30px] text-[#2D2D2D]`}>
                    Why choose us? Because we understand that your hair is your crown. With a commitment to excellence and personalized care, we ensure every client leaves our salon looking and feeling their best. Your satisfaction is our passion.
                </p>
            </div>
        </div>
    );
}
