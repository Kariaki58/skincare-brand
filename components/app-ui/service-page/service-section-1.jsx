import Image from "next/image";
import Link from "next/link";
import clientFirst from "@/public/client-1.jpg";
import clientSecond from "@/public/client-2.jpg";


export default function ServiceSection1() {
    return (
        <section>
            <div className="max-w-screen-xl mx-auto my-10">
                <div className="flex gap-0 mb-12 items-center">
                    <div className="flex">
                        <div className="h-[30rem] w-[30rem] border-8 border-white p-10 relative -left-36">
                            <Image src={clientFirst} alt="Client 1"
                                fill={true}
                                className="z-10 object-cover"
                                priority
                            />
                        </div>
                        <div className="h-[30rem] w-[30rem] border-8 border-white relative p-10 -left-28">
                            <Image src={clientSecond} alt="Client 2"
                                fill={true}
                                className="z-10 object-cover"
                                priority
                            />
                        </div>
                    </div>
                    
                    <div className="max-w-xl space-y-8 relative -left-10">
                        <h1 className="text-5xl font-light text-gray-800 mb-4 capitalize">
                            our Beauty & Skin Services
                        </h1>
                        <h3 className="uppercase text-[#A7948B] font-bold">skin treatments, lashes & makeup</h3>
                        <p className="text-sm leading-loose text-gray-600 mb-6">
                        Write a summary of your services. You are only limited by your imagination. 
                        Making all those little fluffies that live in the clouds. 
                        By now you should be quite happy about what's happening here. Now then, 
                        let's play. Automatically, all of these beautiful, beautiful things will happen. 
                        Exercising the imagination.
                        </p>
                        <Link href="/book-online" className="uppercase bg-transparent border bg-white border-black outline-black rounded-none text-gray-900 px-10 py-4 hover:bg-gray-200 inline-block text-sm">BOOK APPOINTMENT TODAY</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}