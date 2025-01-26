import Image from "next/image";
import headerImage from "@/public/header-image.jpg"; // Change this if needed
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function page() {
    return (
        <section className="flex flex-col md:flex-row max-w-screen-lg mx-auto gap-10 mt-10 mb-20 px-5 sm:px-10">
            <div className="flex flex-col items-center md:w-1/2">
                <div className="w-full h-[300px] md:h-[600px] relative bg-green-300">
                    <Image
                        src={headerImage}
                        alt="Contact page image"
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
                <div className="text-center md:text-left mt-4 md:mt-0">
                    <h1 className="text-2xl md:text-4xl uppercase text-gray-700 my-4">Visit Us in Person</h1>
                    <address className="text-lg text-gray-700 mb-2">5811 Freedom Drive, Charlotte, NC 28214</address>
                    <h3 className="text-lg text-gray-700 uppercase">MONDAY TO SATURDAY - 8 AM TO 6 PM</h3>
                </div>
            </div>
            <div className="space-y-5 md:w-1/2">
                <h1 className="uppercase text-xl md:text-2xl text-center text-gray-800">Contact Victoria Hair Braiding and Weaving Center</h1>
                <h3 className="uppercase text-center text-gray-700">Located at 5811 Freedom Drive, Charlotte, NC</h3>
                <p className="text-center text-sm text-gray-800 tracking-wider leading-relaxed">
                    Please fill out the form below & we’ll get in touch with you shortly! 
                    You can also email us directly at <span>info@victoriahairbraiding.com</span>
                </p>
                <form className="space-y-5">
                    <div>
                        <Input className="py-4 md:py-7 bg-white shadow-none" type="text" id="name" placeholder="FIRST AND LAST NAME*" />
                    </div>
                    <div>
                        <Input className="py-4 md:py-7 bg-white shadow-none" type="email" id="email" placeholder="EMAIL ADDRESS*" />
                    </div>
                    <div>
                        <Input className="py-4 md:py-7 bg-white shadow-none" type="tel" id="phone" placeholder="PHONE NUMBER*" />
                    </div>
                    <div>
                        <Textarea className="bg-white resize-none h-40 md:h-52 shadow-none" id="message" placeholder="WRITE YOUR MESSAGE*" />
                    </div>
                    <div className="flex justify-center">
                        <Button className="p-4 md:p-7 bg-[#1f1d1daa] hover:bg-gray-700">SEND AN INQUIRY</Button>
                    </div>
                </form>
            </div>
        </section>
    );
}
