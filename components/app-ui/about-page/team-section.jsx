import Image from "next/image";
import photoAbout3 from "@/public/about-images/photo-about-3.jpg";
import photoAbout4 from "@/public/about-images/photo-about-4.jpeg";
import photoAbout5 from "@/public/about-images/photo-about-5.webp";
import Review from "../Reviews";

export default function TeamSection() {
    return (
        <section className="my-20 px-6 lg:px-20">
            <div className="text-center mb-12 max-w-4xl mx-auto">
                <h1 className="uppercase text-[#A7948B] text-4xl font-bold mb-4">meet our team</h1>
                <p className="text-[#2D2D2D] text-base leading-loose">
                    Does your team have years of experience or something great to promote? 
                    Everybody's different. Trees are different. Let them all be individuals. 
                    Anything you want to do you can do here. Nature is so fantastic, enjoy it.
                </p>
            </div>
            <div className="flex flex-wrap gap-10 justify-center">
                {[{
                    image: photoAbout3,
                    name: "Tiffany",
                    role: "SALON OWNER",
                }, {
                    image: photoAbout4,
                    name: "Jamie",
                    role: "LASH ARTIST",
                }, {
                    image: photoAbout5,
                    name: "SAMMY",
                    role: "Skin Expert",
                }].map((member, index) => (
                    <div
                        key={index}
                        className="relative group h-[30rem] w-80 shadow-xl overflow-hidden"
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
