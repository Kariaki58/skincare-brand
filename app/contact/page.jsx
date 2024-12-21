import Image from "next/image";
import headerImage from "@/public/header-image.jpg";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";


export default function page() {
    return (
        <section className="flex max-w-screen-lg mx-auto gap-10 mt-10 mb-20">
            <div>
                <div className="w-[500px] h-[600px] relative bg-green-300">
                    <Image
                        src={headerImage}
                        alt="Contact page image"
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
                <div className="">
                    <h1 className="text-4xl uppercase text-[#A7948B] my-4">visit us in person</h1>
                    <address className="text-lg text-gray-700 mb-2">W456 Yorkville Ave, Toronto ON, L01 233</address>
                    <h3 className="text-lg text-gray-700">MONDAY TO FRIDAY - 9AM TO 8PM</h3>
                </div>
            </div>
            <div className="space-y-5">
                <h1 className="uppercase text-4xl text-center text-gray-800">CONTACT THE CLINIC</h1>
                <h3 className="uppercase text-center text-[#A7948B]">located 456 yorkville ave, toronto</h3>
                <p className="text-center text-sm text-gray-800 tracking-wider leading-relaxed">
                    Please fill out the form below & we'll be in touch as soon as possible!
                    You can also email us directly at <span>info@barebeautyclinic.com</span>
                </p>
                <form className="space-y-5">
                    <div>
                        <Input className="py-7 bg-white" type="text" id="name" placeholder="FIRST AND LAST NAME*" />
                    </div>
                    <div>
                        <Input className="py-7 bg-white" type="email" id="email" placeholder="EMAIL ADDRESS*" />
                    </div>
                    <div>
                        <Input className="py-7 bg-white" type="tel" id="phone" placeholder="PHONE NUMBER*" />
                    </div>
                    <div>
                        <Textarea className="bg-white resize-none h-60" id="message" placeholder="WRITE YOUR MESSAGE*" />
                    </div>
                    <div className="flex justify-center">
                        <Button className="p-7 bg-[#A88676] hover:bg-[#c29b8a]">SEND AN INQUIRY</Button>
                    </div>
                </form>
            </div>
        </section>
    )
}