"use client";

import { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { Outfit } from "next/font/google";
import { Spectral } from "next/font/google";
import { Shippori_Antique } from "next/font/google";
import { Button } from "../ui/button";
import { ShoppingBag, AlignJustify, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/public/image-logo.png";


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
    const { data: session } = useSession();
    const [menuOpen, setMenuOpen] = useState(false);

    // Framer Motion animation variants
    const menuVariants = {
        hidden: { opacity: 0, y: "-100%" },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: "-100%" },
    };

    return (
        <nav className="flex justify-between items-center p-4 max-w-screen-xl mx-auto">
        {/* Logo */}
        <div className="flex items-center">
            <Link href="/" className={`flex items-center text-5xl text-[#7e5a4b] ${spectral.className} italic`}>
                <Image
                    src={logo}
                    alt="Logo for the clinic"
                    className="h-auto w-auto max-h-20 max-w-20 object-contain" // Ensures responsiveness
                    priority
                    width={80} // Set explicit width
                    height={80} // Set explicit height
                />
            </Link>
        </div>

        {/* Middle navigation for larger screens */}
        <ul
            className={`hidden lg:flex gap-5 text-[12px] text-[#38271F] tracking-widest ${outfit.className} antialiased`}
        >
            <li className="hover:underline">
                <Link href="/">HOME</Link>
            </li>
            <li className="hover:underline">
                <Link href="/about">ABOUT</Link>
            </li>
            <li className="hover:underline">
                <Link href="/services">SERVICES</Link>
            </li>
            <li className="hover:underline">
                <Link href="/gallery">GALLERY</Link>
            </li>
            <li className="hover:underline">
                <Link href="/shop">SHOP</Link>
            </li>
            <li className="hover:underline">
                <Link href="/contact">CONTACT</Link>
            </li>
        </ul>

        {/* Right section */}
        <ul className={`flex items-center gap-5 text-[12px] text-[#38271F] ${outfit.className} tracking-widest`}>
            <li className="hover:underline">
            {session ? (
                <Link href={session?.user?.role === "user" ? "/dashboard/user" : "/dashboard/admin"}>
                <p className="ml-2 text-[12px]">PROFILE</p>
                </Link>
            ) : (
                <Button variant="link" className="text-[#38271F]" onClick={() => signIn({ callbackUrl: "/" })}>
                Login
                </Button>
            )}
            </li>
            <li>
            <ShoppingBag className="cursor-pointer" />
            </li>
            <li className="lg:hidden">
            {menuOpen ? (
                <X
                className="cursor-pointer text-[#38271F]"
                size={24}
                onClick={() => setMenuOpen(false)}
                />
            ) : (
                <AlignJustify
                className="cursor-pointer text-[#38271F]"
                size={24}
                onClick={() => setMenuOpen(true)}
                />
            )}
            </li>
        </ul>

        {/* Full-screen navigation for small screens */}
        <AnimatePresence>
            {menuOpen && (
            <motion.div
                className="fixed inset-0 bg-[#f5f5f5] z-50 flex flex-col items-center justify-center text-[#38271F]"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={menuVariants}
                transition={{ duration: 0.4, ease: "easeInOut" }}
            >
                <button
                className="absolute top-4 right-4 text-[#7e5a4b] text-3xl"
                onClick={() => setMenuOpen(false)}
                >
                <X size={32} />
                </button>
                <ul
                className={`flex flex-col gap-8 text-lg text-center ${outfit.className} antialiased`}
                >
                <li>
                    <Link href="/" onClick={() => setMenuOpen(false)}>
                    HOME
                    </Link>
                </li>
                <li>
                    <Link href="/about" onClick={() => setMenuOpen(false)}>
                    ABOUT
                    </Link>
                </li>
                <li>
                    <Link href="/services" onClick={() => setMenuOpen(false)}>
                    SERVICES
                    </Link>
                </li>
                <li>
                    <Link href="/gallery" onClick={() => setMenuOpen(false)}>
                    GALLERY
                    </Link>
                </li>
                <li>
                    <Link href="/contact" onClick={() => setMenuOpen(false)}>
                    CONTACT
                    </Link>
                </li>
                </ul>
            </motion.div>
            )}
        </AnimatePresence>
        </nav>
    );
}
