"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import FooterImage from "./FooterImages";
import FooterLinks from "./FooterLinks";
import FooterWorkingHours from "./FooterWorkingHours";
import instagramIcon from "@/public/social-icons/icons8-instagram-logo.svg";
import facebookIcon from "@/public/social-icons/icons8-facebook-logo.svg";
import twitterIcon from "@/public/social-icons/icons8-x-logo.svg";
import pinterestIcon from "@/public/social-icons/icons8-pinterest-logo.svg";
import linkedinIcon from "@/public/social-icons/icons8-linkedin-logo.svg";
import tiktokIcon from "@/public/social-icons/icons8-tiktok.svg";
import whatsappIcons from "@/public/social-icons/icons8-whatsapp.svg";
import { Spectral, Shippori_Antique, Outfit } from "next/font/google";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";


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

export default function Footer() {
    const [email, setEmail] = useState("")
    const {toast} = useToast();
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const response = await fetch('/api/customer', {
            method: 'POST',
            body: JSON.stringify({ email }),
        })
        if (!response.ok) {
            toast({
                variant: "destructive",
                title: "Failed to add your email please try again"
            });                
        } else {
            toast({
                variant: "success",
                title: "Email added successfully",
                description: "Thank you for subscribing to our newsletter"
            });
            setEmail("");
        }
    }

    return (
        <footer>
            <FooterWorkingHours />
            <FooterImage />
            <FooterLinks />
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center max-w-screen-xl mx-auto  space-y-10 md:space-y-0 py-5 px-5">
                <div className="max-w-lg">
                    <h1 className={`${spectral.className} text-[35px] font-bold text-black uppercase`}>Victoria Hair</h1>
                    <h2 className={`text-sm tracking-widest uppercase leading-[14.4px] ${shipporiAntique.className} text-black mt-2`}>Braiding and Weaving Center</h2>
                    <p className={`text-black mt-4 ${outfit.className} leading-relaxed`}>
                        Victoria Hair Braiding and Weaving Center is a premier hair salon located in Charlotte, NC, specializing 
                        in a wide range of hair braiding, weaving, and styling services designed to celebrate your unique beauty.
                    </p>
                    <div className="flex mt-6 space-x-2">
                        <Link href="https://www.instagram.com/braidingvictoriahair/?igsh=ZTR5OGoyMzd0eXA2#" target="_blank">
                            <Image
                                src={instagramIcon}
                                alt="Instagram icon"
                                className="h-8 w-8 hover:opacity-75 transition-opacity"
                            />
                        </Link>
                        <Link href="https://web.facebook.com/people/Victoria-hair-braiding/100027305571369/?rdid=Psg8CCXL6pOwBveC&share_url=https%253A%252F%252Fweb.facebook.com%252Fshare%252F157RBoWz7s%252F%253F_rdc%253D1%2526_rdr" target="_blank">
                            <Image
                                src={facebookIcon}
                                alt="Facebook icon"
                                className="h-8 w-8 hover:opacity-75 transition-opacity"
                            />
                        </Link>
                        {/* <Link href="https://www.x.com">
                            <Image
                                src={twitterIcon}
                                alt="Twitter icon"
                                className="h-8 w-8 hover:opacity-75 transition-opacity"
                            />
                        </Link> */}
                        {/* <Link href="https://www.pinterest.com">
                            <Image
                                src={pinterestIcon}
                                alt="Pinterest icon"
                                className="h-8 w-8 hover:opacity-75 transition-opacity"
                            />
                        </Link>
                        <Link href="https://www.linkedin.com">
                            <Image
                                src={linkedinIcon}
                                alt="LinkedIn icon"
                                className="h-8 w-8 hover:opacity-75 transition-opacity"
                            />
                        </Link> */}
                        {/* <Link href="https://tiktok.com">
                            <Image
                                src={tiktokIcon}
                                alt="TikTok icon"
                                className="h-8 w-8 hover:opacity-75 transition-opacity"
                            />
                        </Link>
                        <Link href="https://wa.me/+234-9138314501">
                            <Image
                                src={whatsappIcons}
                                alt="WhatsApp icon"
                                className="h-8 w-8 hover:opacity-75 transition-opacity"
                            />
                        </Link> */}
                    </div>
                </div>
                <div className="max-w-sm">
                    <h1 className={`text-[40px] font-bold text-black uppercase ${spectral.className}`}>Join the List</h1>
                    <p className="text-black mt-2 mb-4">Subscribe to our newsletter for updates and exclusive offers.</p>
                    <form onSubmit={handleSubmit} className="items-start space-y-4">
                        <input 
                            type="email" 
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-[#214207] text-white flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-gray-400 focus:outline-none block"
                        />
                        <Button type="submit" className="uppercase bg-[#214207] text-white  font-bold py-5 px-10 text-sm rounded-lg transition-colors w-full">
                            Join Newsletter
                        </Button>
                    </form>
                </div>
            </div>
            {/* <div className={`flex justify-center pt-10 pb-5 ${shipporiAntique.className} text-[10px]`}>
                <p className="text-black">© 2024 <span>BUSSINESS NAME</span> | AWESOME DESIGN AGENCY</p>
            </div> */}
        </footer>
    )
}