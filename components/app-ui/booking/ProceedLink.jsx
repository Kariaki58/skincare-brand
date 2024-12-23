import Link from "next/link";


export default function ProceedLink({ nextLink }) {
        if (!nextLink) return;
    return (
        <div className="flex justify-center">
            <Link className="bg-[#7E5A4B] hover:bg-[#b17f6a] text-white px-5 py-2 rounded-lg" href={nextLink}>Proceed</Link>
        </div>
    )
}