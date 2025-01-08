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
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-20 text-white space-y-5">
                    <h1 className="text-5xl font-light whitespace-nowrap">
                        BOOK YOUR APPOINTMENT
                    </h1>
                    <p className="text-sm text-center leading-relaxed tracking-widder">
                        Write your policies for them to be aware of them before booking. 
                        Do you have a cancellation policy? You are only limited by your imagination. 
                        Making all those little that live in the clouds. By now you should 
                        be quite happy about what's happening here. Now then, let's play. Automatically, 
                        all of these beautiful, beautiful things will happen. Exercising the imagination.
                    </p>
                </div>

            </header>
            <Link href='/dashboard/admin' className="border-t border-b border-black px-10 py-8 text-black text-sm hover:bg-gray-50 hover:text-gray-700 transition-all duration-300 ease-in-out block text-center">
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