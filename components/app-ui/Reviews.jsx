"use client";
import { useState } from "react";
import { SquareChevronLeft } from "lucide-react";
import { SquareChevronRight } from "lucide-react";


export default function Review() {
    const reviews = [
        {
            text: "Look No Further, Bare Beauty is The Best Aesthetics Clinic I've Ever Visited in Toronto Area",
            author: "— LAUREN B.",
        },
        {
            text: "Exceptional service and amazing results! I always feel so confident after visiting Bare Beauty.",
            author: "— EMILY R.",
        },
        {
            text: "Bare Beauty is my go-to clinic for all things skincare. Their attention to detail is unmatched!",
            author: "— SARAH T.",
        },
    ];
    
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    };

    const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
    };
    
    return (
        <section className="max-w-screen-xl mx-auto my-28 p-5">
            <div className="flex flex-col items-center w-full max-w-5xl mx-auto">
                <p className="text-4xl italic text-center text-[#8a6251]">
                    "{reviews[currentIndex].text}"
                </p>
                <p className="mt-4 text-sm font-medium text-gray-800">
                    {reviews[currentIndex].author}
                </p>
                <div className="flex mt-6 space-x-4">
                    <SquareChevronLeft
                        onClick={handlePrev}
                        size={54}
                        className="hover:cursor-pointer hover:text-[#97847c] text-[#8a6251]"
                    />
                    <SquareChevronRight
                        onClick={handleNext}
                        size={54}
                        className="hover:cursor-pointer hover:text-[#97847c] text-[#8a6251]"
                    />
                </div>
            </div>
        </section>
    )
}