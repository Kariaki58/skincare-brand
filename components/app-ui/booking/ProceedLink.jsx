import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function ProceedLink({ nextLink, disable = false }) {
    if (!nextLink) return null;

    const handleClick = (e) => {
        if (disable) {
        e.preventDefault();
        }
    };

    return (
        <div className="flex justify-center mt-10">
        <Link
            href={disable ? '#' : nextLink}
            onClick={handleClick}
            className={cn(
            'px-5 py-2 rounded-lg text-white',
            disable
                ? 'bg-[#f3c4af] cursor-not-allowed'
                : 'bg-[#7E5A4B] hover:bg-[#b17f6a]'
            )}
        >
            Proceed
        </Link>
        </div>
    );
}
