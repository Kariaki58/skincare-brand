import Image from "next/image";
import photoAbout2 from "@/public/about-images/photo-about-2.jpg";
import { Spectral, Shippori_Antique, Outfit } from "next/font/google";


const spectral = Spectral({
    subsets: ["latin"],
    weight: "300",
});

const shipporiAntique = Shippori_Antique({
    subsets: ["latin"],
    weight: "400",
});

const outfit = Outfit({
    subsets: ["latin"],
    weight: "300",
});


export default function WhyChooseUs() {
    return (
        <section className="my-20 h-custom flex items-center bg-[#DCD4CB]">
            <div className="max-w-md mx-auto space-y-8">
                <h1 className={`uppercase text-[#38271F] text-4xl ${spectral.className} antialiased`}>WHY CHOOSE US</h1>
                <p className={`leading-[30px] text-[#2D2D2D] ${outfit.className} text-[15px]`}>
                What makes your business so unique and special? Let your visitors know! 
                Anything you want to do you can do here. Nature is so fantastic, enjoy it. 
                Let it make you happy. Zip. That easy. We start with a vision in our heart, 
                and we put it on canvas. For the lack of a better word I call them hangy downs. 
                </p>
                <p className={`leading-[30px] text-[#2D2D2D] ${outfit.className} text-[15px]`}>
                In your world you can create anything you desire. 
                Absolutely no pressure. Use what happens naturally, don't fight it. 
                Everybody's different. Trees are different. Let them all be individuals. 
                Anything you want to do you can do here. Nature is so fantastic, enjoy it.
                </p>
            </div>
            <div className="h-full w-full max-w-2xl relative">
                <Image
                    src={photoAbout2}
                    alt="about section image"
                    className="z-20 object-cover"
                    fill={true}
                    priority
                />
            </div>

        </section>
    )
}