import Link from "next/link";
import { MoveRight } from "lucide-react";


export default function Ads() {
    return (
        <div className="bg-[#f3eae6] p-3 border-b border-black flex justify-center font-mono font-light text-gray-500">
            <div className="flex gap-4 items-center">
                <p>Write Any Ads you have - </p>
                <Link href="/book" className="flex items-center underline gap-1">
                    BOOK NOW
                    <MoveRight className="text-3xl" />
                </Link>
            </div>
        </div>
    )
}