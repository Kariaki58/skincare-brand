"use client";

import { useSearchParams, useRouter } from "next/navigation";


export default function InventoryPagination({ totalPages }) { 
    const searchParams = useSearchParams();
    const router = useRouter();
    const currentPage = Number(searchParams.get('page')) || 1;

    const handlePreviousPage = () => {
        const prevPage = currentPage - 1;
        const params = new URLSearchParams(searchParams);
        params.set('page', prevPage.toString());
        router.push(`?${params.toString()}`);
    };

    const handleNextPage = () => {
        const nextPage = currentPage + 1;
        const params = new URLSearchParams(searchParams);
        params.set('page', nextPage.toString());
        router.push(`?${params.toString()}`);
    };

    return (
        <div className="flex justify-between mt-4">
            <button 
                onClick={handlePreviousPage} 
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={currentPage === 1}
            >
                Previous
            </button>
            <span className="self-center text-gray-700">
                Page {Math.min(currentPage, totalPages)} of {totalPages}
            </span>
            <button 
                onClick={handleNextPage} 
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={currentPage >= totalPages}
            >
                Next
            </button>
        </div>
    );
}