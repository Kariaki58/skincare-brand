"use client"

import { useSession, signIn } from "next-auth/react"

import Link from "next/link";
import { Outfit } from "next/font/google";
import { Spectral } from "next/font/google";
import { Shippori_Antique } from "next/font/google";
import { Button } from "../ui/button";
import Image from "next/image";


const outfit = Outfit({
    subsets: ["latin"],
    weight: "400",
});

const spectral = Spectral({
    subsets: ["latin"],
    weight: "400",
});

const shipporiAntique = Shippori_Antique({
    subsets: ["latin"],
    weight: "400",
});


export default function Navigation() {
    const { data: session } = useSession()
    console.log(session)
    return (
        <nav className="flex justify-between items-center p-4 max-w-screen-xl mx-auto">
            <ul className={`flex gap-10 text-[12px] text-[#38271F] font-outfit tracking-widest ${outfit.className} antialiased`}>
                <li className="hover:underline">
                    <Link href="/">HOME</Link>
                </li>
                <li className="hover:underline">
                    <Link href="/about">ABOUT</Link>
                </li>
                <li className="hover:underline">
                    <Link href="/services">SERVICES</Link>
                </li>
            </ul>
            <div className="text-center">
                <Link href="/" className={`text-5xl text-[#7e5a4b] ${spectral.className} italic mb-0 pb-0`}>LOGO</Link>
                <p className={`text-[12px] mt-0 ${shipporiAntique.className} text-[#38271F] pt-0`}>AESTHETICS CLINIC</p>
            </div>
            <ul className={`flex items-center gap-10 text-[12px] text-[#38271F] ${outfit.className} tracking-widest antialiased`}>
                <li className="hover:underline">
                    <Link href="/gallery">GALLERY</Link>
                </li>
                <li className="hover:underline">
                    <Link href="/contact">CONTACT</Link>
                </li>
                <li className="hover:underline">
                    {
                        session? (
                            <Link href={session?.user?.role === "user" ? "/dashboard/user" : "/dashboard/admin"}>
                                {/* <Image src="/user.png" alt="User" width={30} height={30} /> */}
                                <span className="ml-2">Profile</span>
                            </Link>
                        ) : (
                            <Button variant="link" className="text-[#38271F]" onClick={() => signIn({ callbackUrl: "/" })}>Login</Button>
                        )
                    }
                </li>
            </ul>
        </nav>
    )
}