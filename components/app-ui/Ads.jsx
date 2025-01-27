import Link from "next/link";
import { MoveRight } from "lucide-react";


export default function Ads() {
    return (
        <div className="bg-[#214207] text-white p-3 border-b border-black flex justify-center font-mono font-light">
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