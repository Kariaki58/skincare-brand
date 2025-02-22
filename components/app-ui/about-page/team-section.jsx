import Image from "next/image";
import photoAbout3 from "@/public/about-images/about-picture-1.jpeg";
import Review from "../Reviews";
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

export default function TeamSection() {
    return (
        <section className="my-20 px-6 lg:px-20">
            <div className="text-center mb-12 max-w-4xl mx-auto">
                <h1 className={`uppercase text-black text-[60px] font-bold mb-4 ${spectral.className} antialiased`}>meet the Salon Owner</h1>
                <p className={`leading-[30px] text-white ${outfit.className} text-base`}>
                    Victoria Oladejo is dedicated to providing personalized braiding and weaving services 
                    that cater to your unique style and preferences. Whether you're looking for something 
                    classic or trendy, we make sure every braid is perfectly styled and secured.
                </p>
            </div>
            <div className="flex flex-wrap gap-10 justify-center">
                {[{
                    image: photoAbout3,
                    name: "Victoria oladejo",
                    role: "SALON OWNER",
                }
                ].map((member, index) => (
                    <div
                        key={index}
                        className="relative group h-[30rem] w-96 shadow-xl overflow-hidden"
                    >
                        <Image
                            src={member.image}
                            alt={`${member.name}`}
                            fill={true}
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                            priority
                        />                        
                        <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                            <h2 className="text-xl font-bold uppercase mb-3">{member.name}</h2>
                            <p className="text-sm uppercase">{member.role}</p>
                        </div>
                    </div>
                ))}
            </div>
            <Review />
        </section>
    );
}
