import Image from "next/image";
import photoAbout1 from "@/public/about-images/photo-about-1.jpg";
import Link from "next/link";


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
                <h1 className="uppercase text-5xl leading-snug text-[#A7948B]">toronto's best aesthetics clinic</h1>
                <p className="text-base leading-relaxed text-gray-800">
                    Write a description about your business & why they should choose 
                    you over anyone else. Anything you want to do you can do here. 
                    Nature is so fantastic, enjoy it. Let it make you happy. Zip. That easy. 
                    We start with a vision in our heart, and we put it on canvas. 
                    For the lack of a better word I call them hangy downs. 
                </p>
                <p className="text-base leading-relaxed text-gray-800">
                    In your world you can create anything you desire. 
                    Absolutely no pressure. Use what happens naturally, don't fight it. 
                    Everybody's different. Trees are different. Let them all be individuals. 
                </p>
                <Link href="/book-online" className="uppercase bg-transparent border border-black outline-black rounded-none text-gray-900 px-10 py-4 hover:bg-gray-200 inline-block">BOOK APPOINTMENT</Link>
            </div>
        </div>
    )
}