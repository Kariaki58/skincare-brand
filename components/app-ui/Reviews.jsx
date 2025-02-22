"use client";
import { useState } from "react";
import { SquareChevronLeft } from "lucide-react";
import { SquareChevronRight } from "lucide-react";


export default function Review() {
    const reviews = [
        {
            text: "Had a fantastic experience at Victoria Hair Braiding and Weaving Center! Skilled stylists, a welcoming atmosphere, and flawless braids. I’ve received tons of compliments and will definitely be back!",
            author: "— LAUREN B.",
        },
        {
            text: "This salon is amazing! Friendly staff, exceptional service, and flawless knotless braids—neat, lightweight, and perfect. Highly recommend!",
            author: "— EMILY R.",
        },
        {
            text: "Victoria Hair Braiding and Weaving Center is the best! Talented stylists, great attention to detail, and a relaxing atmosphere. My hair turned out stunning—I’ll be back!",
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
        <section className="max-w-screen-xl mx-auto my-20 p-5">
            <div className="flex flex-col items-center w-full max-w-5xl mx-auto">
                <p className="text-4xl italic text-center text-black">
                    "{reviews[currentIndex].text}"
                </p>
                <p className="mt-4 text-sm font-medium text-black">
                    {reviews[currentIndex].author}
                </p>
                <div className="flex mt-6 space-x-4">
                    <SquareChevronLeft
                        onClick={handlePrev}
                        size={54}
                        className="hover:cursor-pointer hover:text-[#291c17] text-black"
                    />
                    <SquareChevronRight
                        onClick={handleNext}
                        size={54}
                        className="hover:cursor-pointer hover:text-[#291c17] text-black"
                    />
                </div>
            </div>
        </section>
    )
}