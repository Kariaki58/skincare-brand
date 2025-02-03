"use client";

import { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { Outfit } from "next/font/google";
import { Spectral } from "next/font/google";
import { Button } from "../ui/button";
import { ShoppingBag, AlignJustify, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/public/image-logo.png";
import useCartStore from "@/store/cartStore";


const outfit = Outfit({
    subsets: ["latin"],
    weight: "400",
});

const spectral = Spectral({
    subsets: ["latin"],
    weight: "400",
});


export default function Navigation() {
    const { data: session } = useSession();
    const [menuOpen, setMenuOpen] = useState(false);
    const { cart } = useCartStore();
    

    const menuVariants = {
        hidden: { opacity: 0, y: "-100%" },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: "-100%" },
    };

    return (
        <nav className="flex justify-between items-center p-4 max-w-screen-xl mx-auto">
        <div className="flex items-center">
            <Link href="/" className={`flex items-center text-5xl text-[#7e5a4b] ${spectral.className} italic`}>
                <Image
                    src={logo}
                    alt="Logo for the clinic"
                    className="h-auto w-auto max-h-20 max-w-20 object-contain"
                    priority
                    width={80}
                    height={80}
                />
            </Link>
        </div>
        <ul
            className={`hidden lg:flex gap-5 text-[12px] text-white font-bold tracking-widest ${outfit.className} antialiased`}
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
        <ul className={`flex items-center gap-5 text-[12px] text-white font-bold ${outfit.className} tracking-widest`}>
            <li className="hover:underline">
                {session ? (
                    <Link href={session?.user?.role === "user" ? "/" : "/dashboard/admin"}>
                    <p className="ml-2 text-[12px]">PROFILE</p>
                    </Link>
                ) : (
                    <div className="flex gap-2">
                        <Button className="text-white hidden lg:block" onClick={() => signIn({ callbackUrl: "/" })}>
                            Sign Up
                        </Button>
                        <Button className="text-white" onClick={() => signIn({ callbackUrl: "/" })}>
                            Login
                        </Button>
                    </div>
                )}
            </li>
            <li className="relative">
                <Link href="/cart">
                    <ShoppingBag className="cursor-pointer" />
                </Link>
                <span className="text-sm absolute -top-5 -right-3 bg-green-950 text-white p-1 rounded-lg">{cart.length}</span>
            </li>
            <li className="lg:hidden">
                {menuOpen ? (
                    <X
                    className="cursor-pointer text-white font-bold"
                    size={24}
                    onClick={() => setMenuOpen(false)}
                    />
                ) : (
                    <AlignJustify
                    className="cursor-pointer text-white font-bold"
                    size={24}
                    onClick={() => setMenuOpen(true)}
                    />
                )}
            </li>
        </ul>

        <AnimatePresence>
            {menuOpen && (
            <motion.div
                className="fixed inset-0 bg-[#f5f5f5] z-50 flex flex-col items-center justify-center text-white font-bold"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={menuVariants}
                transition={{ duration: 0.4, ease: "easeInOut" }}
            >
                <button
                className="absolute top-4 right-4 text-[#214207] text-3xl"
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
                        <Link href="/shop" onClick={() => setMenuOpen(false)}>
                        SHOP
                        </Link>
                    </li>
                    <li>
                        <Link href="/about" onClick={() => setMenuOpen(false)}>
                        ABOUT
                        </Link>
                    </li>
                    <li>
                        <Link href="/gallery" onClick={() => setMenuOpen(false)}>
                        GALLERY
                        </Link>
                    </li>
                    <li>
                        <Link href="/services" onClick={() => setMenuOpen(false)}>
                        SERVICES
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
