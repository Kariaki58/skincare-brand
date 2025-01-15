import Link from "next/link";
import { Outfit } from "next/font/google";

const outfit = Outfit({
    subsets: ["latin"],
    weight: "400",
});


export default function FooterLinks() {
    const isAdmin = true
    return (
        <section className={`${outfit.className} text-[12px] border border-t-4 border-b-2 border-gray-300 p-5 mb-10 flex justify-center bg-white text-gray-600`}>
            <nav className="flex gap-20">
                <Link href="/">HOME</Link>
                <Link href="/about">ABOUT</Link>
                <Link href="/services">SERVICES</Link>
                <Link href="/gallery">GALLERY</Link>
                <Link href="/contact">CONTACT</Link>
                <Link href={isAdmin ? '/dashboard/admin' : '/dashboard/user'}>PROFILE</Link>
            </nav>
        </section>
    )
}