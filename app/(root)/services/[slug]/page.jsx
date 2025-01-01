import Image from "next/image";
import Link from "next/link";
import headerImage from "@/public/header-image.jpg";
import image1 from "@/public/country-size-girl.jpg";
import image2 from "@/public/eye-lashes-fix.jpg";
import { MoveLeft } from "lucide-react";

// export async function generateStaticParams() {}

export default async function page({ params }) {
    const slug = (await params).slug.replace(/-/g, ' ');

    return (
        <section>
            <header className="relative h-screen w-full bg-gradient-to-b from-[#f6f9ff] to-[#9ba3b1]">
                <Image
                    src={headerImage}
                    alt="background image for the hair salon banner"
                    fill={true}
                    className="z-10 object-cover opacity-70"
                    priority
                />
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-20 text-white space-y-5">
                    <h3 className="font-bold tracking-widest">PLACE YOUR SUBHEADING RIGHT HERE</h3>
                    <h1 className="text-6xl font-light whitespace-nowrap">
                        {slug} 
                    </h1>
                    <p className="text-sm">
                    Write a summary of your services & duplicate this page for as many service 
                    pages you need! You are only limited by your imagination. 
                    Making all those little fluffies that live in the clouds. 
                    By now you should be quite happy about what's happening here. 
                    Now then, let's play. Automatically, all of these beautiful, 
                    beautiful things will happen. Exercising the imagination.
                    </p>
                </div>
            </header>
            <Link href='/book' className="border border-black px-10 py-5 text-black text-sm hover:bg-gray-50 hover:text-gray-700 transition-all duration-300 ease-in-out block text-center">
                BOOK YOUR APPOINTMENT TODAY
            </Link>
            <div className="flex max-w-screen-lg mx-auto items-center space-x-14 my-20">
                <Link href={`/book?set=${slug.replace(/ /g, '-').toLowerCase()}`} className="h-[23rem] max-w-xl w-[30rem] bg-red-600 relative block hover:opacity-90">
                    <Image
                        src={image1}
                        alt="A country size girl looking at her eyes"
                        fill={true}
                        className="z-20 object-cover shadow-xl"
                        priority
                    />
                </Link>
                <div className="flex-1">
                    <h2 className="text-4xl font-light mb-4 text-[#A7948B]">{slug}</h2>
                    <p className="mb-4 leading-relaxed tracking-widest text-sm text-gray-800">
                        Write a summary about the service right here! Keep in mind that most 
                        people who are new to your types of services, might have no idea what it is. 
                        You are only limited by your imagination. Making all those little fluffies 
                        that live in the clouds. By now you should be quite happy about what's happening here. 
                        Now then, let's play. Automatically, all of these beautiful, beautiful things will happen. 
                        Exercising the imagination, experimenting with talents, being creative; 
                        these things, to me, are truly the windows to your soul.
                    </p>
                    <Link href={`/book?set=${slug.replace(/ /g, '-').toLowerCase()}`} className="border border-black px-10 py-4 text-black text-sm bg-white hover:bg-gray-50 hover:text-gray-700 transition-all duration-300 ease-in-out inline-block text-center mt-5">
                        BOOK YOUR SET
                    </Link>
                </div>
            </div>
            <div className="flex max-w-screen-lg mx-auto items-center space-x-14 my-20">
                <div className="flex-1">
                    <h2 className="text-4xl font-light mb-4 text-[#A7948B]">Pricing Guide</h2>
                    <p className="mb-4 leading-relaxed tracking-widest text-sm text-gray-800">
                    Write a summary about the service right here! Keep in mind that 
                    most people who are new to your types of services, might have no idea what it is. 
                    You are only limited by your imagination.
                    </p>
                    <ul className="list-disc pl-10 space-y-5 text-gray-800">
                        <li>CLASSIC LASHES <span>(1h30)</span> - <span>$100</span></li>
                        <li>HYBRID LASHES <span>(2h00)</span> - <span>$150</span></li>
                        <li>VOLUME LASHES <span>(2h30)</span> - <span>$200</span></li>
                    </ul>
                    <Link href={`/book?set=${slug}`} className="border border-black px-10 py-4 mt-5 bg-white text-black text-sm hover:bg-gray-50 hover:text-gray-700 transition-all duration-300 ease-in-out inline-block text-center">
                        BOOK YOUR SET
                    </Link>
                </div>
                <Link href={`/book?set=${slug}`}  className="relative h-[23rem] max-w-xl w-[30rem] bg-red-600 block hover:opacity-90">
                    <Image
                        src={image2}
                        alt="A country size girl looking at her eyes"
                        fill={true}
                        className="z-20 object-cover shadow-xl"
                        priority
                    />
                </Link>
            </div>
            <Link href='/services' className="uppercase py-7 text-3xl bg-[#e2d8d3] text-gray-800 flex justify-center items-center">
                <MoveLeft size={32} className="mr-5" />
                BACK TO ALL SERVICES
            </Link>
        </section>
    )
}
