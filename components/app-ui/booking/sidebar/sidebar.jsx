"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";


export default function Sidebar({ stage }) {
    const pathname = usePathname();
    const links = [
        {
            path: "/book",
            text: "1. Service"
        },
        {
            path: "/book/slots",
            text: "2. Date & Time"
        },
        {
            path: "/book/confirm",
            text: "3. Confirm Booking"
        }
    ];

    console.log(pathname)

    return (
        <div className="bg-white p-6 shadow rounded-lg h-56 w-60">
            <h1 className="text-lg font-semibold mb-6 capitalize">Booking process</h1>
            <div className="space-y-4">
                {
                    links.map((link, index) => (
                        <Link href={link.path} key={index} className={
                            cn("block rounded-lg font-medium",
                                pathname === link.path ? "bg-[#7E5A4B] px-4 py-3 text-white": ""
                            )
                        }>
                            {link.text}
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}