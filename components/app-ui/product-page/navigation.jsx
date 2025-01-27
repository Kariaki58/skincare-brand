"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
    const pathname = usePathname();

    const isActive = (path) => pathname === path;

    return (
        <nav className="flex justify-center">
            <ul className="flex items-center gap-8">
                <li
                    className={`text-xl font-medium ${
                        isActive("/product/1")
                            ? "text-[#214207] font-semibold"
                            : "text-gray-600"
                    }`}
                >
                    <Link href="/product/1">Additional information</Link>
                </li>
                <li
                    className={`text-xl font-medium ${
                        isActive("/product/1/reviews")
                            ? "text-[#214207] font-semibold"
                            : "text-gray-600"
                    }`}
                >
                    <Link href="/product/1/reviews">Reviews (5)</Link>
                </li>
            </ul>
        </nav>
    );
}
