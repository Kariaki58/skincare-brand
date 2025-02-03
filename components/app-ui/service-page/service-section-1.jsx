import Image from "next/image";
import clientFirst from "@/public/client-1.jpg";
import clientSecond from "@/public/client-2.jpg";
import { Spectral, Shippori_Antique, Outfit } from "next/font/google";

const spectral = Spectral({
    subsets: ["latin"],
    weight: "400",
});

const shipporiAntique = Shippori_Antique({
    subsets: ["latin"],
    weight: "400",
});

const outfit = Outfit({
    subsets: ["latin"],
    weight: "300",
});

export default function ServiceSection1() {
    return (
            <section>
            <div className="max-w-screen-xl mx-auto my-0 md:my-5 lg:my-16 px-4">
                <div className="flex flex-col lg:flex-row gap-12 items-center">
                {/* Image Section */}
                <div className="flex justify-center gap-8">
                    <div className="h-[20rem] lg:h-[30rem] w-[20rem] lg:w-[30rem] border-4 lg:border-8 border-[#214207] p-4 lg:p-10 relative hidden md:block">
                    <Image
                        src={clientSecond}
                        alt="Client 2"
                        fill={true}
                        className="z-10 object-cover rounded-xl shadow-lg"
                        priority
                    />
                    </div>
                </div>

                {/* Text Section */}
                <div className="max-w-xl space-y-6 lg:space-y-8 text-center lg:text-left">
                    <h1
                    className={`text-4xl ${spectral.className} text-black mb-4 font-semibold uppercase`}
                    >
                        Choose a perfect style for your hair
                    </h1>
                    <h3
                    className={`uppercase ${shipporiAntique.className} text-[14px] lg:text-[16px] text-black font-bold`}
                    >
                        Hair braiding & Weaving
                    </h3>
                    <p
                    className={`leading-[24px] lg:leading-[30px] text-black ${outfit.className} text-[14px] lg:text-[15px]`}
                    >
                        At Victoria Hair Braiding & Weaving Center, we specialize in high-quality braiding 
                        and weaving services. Whether you're looking for intricate braids, protective weaves, 
                        or a completely new look, our expert stylist ensures your hair reflects your unique style. 
                        We’re dedicated to enhancing your beauty with tailored styles that meet your needs. 
                        Trust us to provide a luxurious experience that leaves you feeling confident and beautiful.
                    </p>
                </div>
                </div>
            </div>
            </section>
    );
}
