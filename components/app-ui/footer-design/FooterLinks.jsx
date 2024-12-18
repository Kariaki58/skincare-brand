import Link from "next/link";

export default function FooterLinks() {
    return (
        <section className="border border-t-4 border-b-2 border-gray-300 p-5 mb-10 flex justify-center bg-white text-gray-600">
            <nav className="flex gap-20">
                <Link href="/" className="text-sm">HOME</Link>
                <Link href="/about" className="text-sm">ABOUT</Link>
                <Link href="/services" className="text-sm">SERVICES</Link>
                <Link href="/blog" className="text-sm">BLOG</Link>
                <Link href="/gallery" className="text-sm">GALLERY</Link>
                <Link href="/contact" className="text-sm">CONTACT</Link>
                <Link href="/book-online" className="text-sm">BOOK ONLINE</Link>
            </nav>
        </section>
    )
}