import Link from "next/link";

export default function Navigation() {
    return (
        <nav className="flex justify-between items-center p-4 max-w-screen-xl mx-auto">
            <ul className="flex gap-10 text-sm font-light font-mono text-gray-500">
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
                <Link href="/" className="text-5xl font-mono font-bold text-[#7e5a4b]">LOGO</Link>
                <p className="text-lg font-thin font-mono">AESTHETICS CLINIC</p>
            </div>
            <ul className="flex gap-10 text-sm font-light font-mono text-gray-500">
                <li className="hover:underline">
                    <Link href="/gallery">GALLERY</Link>
                </li>
                <li className="hover:underline">
                    <Link href="/contact">CONTACT</Link>
                </li>
                <li className="hover:underline">
                    <Link href="/user">ACCOUNT</Link>
                </li>
            </ul>
        </nav>
    )
}