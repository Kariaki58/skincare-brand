import Image from "next/image";
import photoAbout2 from "@/public/about-images/photo-about-2.jpg";
import { Spectral, Shippori_Antique, Outfit } from "next/font/google";


const spectral = Spectral({
    subsets: ["latin"],
    weight: "300",
});

const outfit = Outfit({
    subsets: ["latin"],
    weight: "300",
});


export default function WhyChooseUs() {
    return (
        <section className="my-20 h-custom flex items-center bg-[#214207] text-white px-4 xl:px-0">
            <div className="max-w-md mx-auto space-y-8 md:mr-10">
                <h1 className={`uppercase text-4xl ${spectral.className} antialiased text-center md:text-left`}>WHY CHOOSE US</h1>
                <p className={`leading-[30px] text-white ${outfit.className} text-[15px]`}>
                    At Victoria Hair Braiding and Weaving Center, we believe every client deserves 
                    exceptional service and unparalleled results. Our salon is designed with a modern 
                    and welcoming ambiance to ensure your experience is both relaxing and enjoyable. 
                    Whether you are looking for intricate braiding, seamless weaving, or custom hair care, 
                    our skilled stylists are here to bring your vision to life with precision and artistry.
                </p>
                <p className={`leading-[30px] text-white ${outfit.className} text-[15px]`}>
                    Why choose us? We prioritize your satisfaction and confidence above all else. With years of 
                    experience and a passion for excellence, our team takes pride in delivering personalized 
                    services tailored to your unique needs. From protective styles that nurture your natural 
                    hair to stunning designs that turn heads, we are committed to helping you shine.
                </p>
            </div>
            <div className="h-full w-full max-w-2xl relative hidden md:block">
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