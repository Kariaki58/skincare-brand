import Image from "next/image";
import Link from "next/link";
import eyeLashes from "@/public/eye-lashes-fix.jpg";
import lasheSection from "@/public/eye-lashes-section.jpg";
import bussinessWoman from "@/public/bussiness-woman.jpeg";


export default function CategorySection() {
    return (
        <section className="max-w-screen-xl mx-auto mt-36">
            <h3 className="uppercase text-center text-sm">aesthetics clinic offering skin treatments, lashes & BEAUTY SERVICES</h3>
            <h1 className="uppercase text-center text-5xl text-[#a79c97] mt-5">EXPLORE BARE BEAUTY CLINIC</h1>
            <div className="grid grid-cols-3 gap-10 items-center my-20">
                <Link href="/gallery" className="h-[30rem] shadow-xl shadow-black relative hover:cursor-pointer hover:opacity-80 transition-opacity duration-700">
                    <Image
                        src={lasheSection}
                        alt="co founder image for the clinic"
                        fill={true}
                        className="z-10 object-cover"
                        priority
                    />
                    <div className="absolute bottom-5 left-0 w-full text-white p-4 text-center z-20">
                        <h3 className="text-sm uppercase">Explore</h3>
                        <h2 className="text-3xl font-bold uppercase">The Gallery</h2>
                    </div>
                </Link>
                <Link href="/services" className="h-[40rem] shadow-xl shadow-black relative hover:cursor-pointer hover:opacity-80 transition-opacity duration-700">
                    <Image
                        src={eyeLashes}
                        alt="co founder image for the clinic"
                        fill={true}
                        className="z-10 object-cover"
                        priority
                    />
                    <div className="absolute bottom-5 left-0 w-full text-white p-4 text-center z-20">
                        <h3>EXPORE</h3>
                        <h2 className="text-3xl">OUR SERVICES</h2>
                    </div>
                </Link>
                <Link href="/about" className="h-[30rem] shadow-xl shadow-black relative hover:cursor-pointer hover:opacity-80 transition-opacity duration-700">
                    <Image
                        src={bussinessWoman}
                        alt="co founder image for the clinic"
                        fill={true}
                        className="z-10 object-cover"
                        priority
                    />
                    <div className="absolute bottom-5 left-0 w-full text-white p-4 text-center z-20">
                        <h3 className="text-sm">LEARN MORE</h3>
                        <h2 className="text-3xl">ABOUT US</h2>
                    </div>
                </Link>
            </div>
        </section>
    )
}