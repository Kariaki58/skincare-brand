"use client";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";

export default function Navigation() {
    const pathname = usePathname();
    const params = useParams();
    const productId = params.id;

    const isActive = (path) => pathname.startsWith(path);

    return (
        <nav className="flex justify-center">
            <ul className="flex items-center gap-8">
                <li
                    className={`text-xl font-medium ${
                        isActive("/product/") && !pathname.includes("/reviews")
                            ? "text-[#214207] font-semibold"
                            : "text-gray-600"
                    }`}
                >
                    <Link href={`/product/${productId}`}>Additional information</Link>
                </li>
                <li
                    className={`text-xl font-medium ${
                        isActive("/product/") && pathname.includes("/reviews")
                            ? "text-[#214207] font-semibold"
                            : "text-gray-600"
                    }`}
                >
                    <Link href={`/product/${productId}/reviews`}>Reviews (5)</Link>
                </li>
            </ul>
        </nav>
    );
}
