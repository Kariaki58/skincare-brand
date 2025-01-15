import Image from "next/image";
import photoAbout1 from "@/public/about-images/photo-about-1.jpg";
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
        <div className="max-w-screen-xl mx-auto flex gap-16 items-center justify-center py-10">
            <div className="relative shadow-xl w-[85rem] h-[35rem] rounded-full flex items-center justify-center max-w-md">
                <Image
                    src={photoAbout1}
                    alt="co founder image for the clinic"
                    fill={true}
                    className="z-10 rounded-full object-cover"
                    priority
                />
            </div>
            <div className="space-y-6 max-w-xl">
                <h1 className={`uppercase text-[50px] leading-[60px] text-[#A7948B] ${spectral.className} antialiased`}>toronto's best aesthetics clinic</h1>
                <p className={`text-[15px] ${outfit.className} leading-[30px] text-[#2D2D2D]`}>
                    Write a description about your business & why they should choose 
                    you over anyone else. Anything you want to do you can do here. 
                    Nature is so fantastic, enjoy it. Let it make you happy. Zip. That easy. 
                    We start with a vision in our heart, and we put it on canvas. 
                    For the lack of a better word I call them hangy downs. 
                </p>
                <p className={`text-[15px] ${outfit.className} leading-[30px] text-[#2D2D2D]`}>
                    In your world you can create anything you desire. 
                    Absolutely no pressure. Use what happens naturally, don't fight it. 
                    Everybody's different. Trees are different. Let them all be individuals. 
                </p>
            </div>
        </div>
    )
}