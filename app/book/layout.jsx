import cutePhoto11 from "@/public/gallery/cute-photo-11.jpg";
import Image from "next/image";
import Link from "next/link";
import Sidebar from "@/components/app-ui/booking/sidebar/sidebar";


export default function layout({ children }) {
    return (
        <div>
            <header className="relative h-screen w-full bg-gradient-to-b from-[#f6f9ff] to-[#9ba3b1]">
                <Image
                    src={cutePhoto11}
                    alt="background image for the hair salon banner"
                    fill={true}
                    className="z-10 object-cover"
                    priority
                />
            </header>
            <Link href='/dashboard/user' className="border-t border-b border-black px-10 py-8 text-black text-sm hover:bg-gray-50 hover:text-gray-700 transition-all duration-300 ease-in-out block text-center">
                VIEW AND TRACK BOOKINGS
            </Link>
            <section className="flex max-w-screen-xl mx-auto gap-5 my-20">
                <Sidebar />
                <div className="flex-1 w-full">
                    {children}
                </div>
            </section>
            
        </div>
    )
}