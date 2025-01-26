"use client";
import { useState } from "react";
import { SquareChevronLeft } from "lucide-react";
import { SquareChevronRight } from "lucide-react";


export default function Review() {
    const reviews = [
        {
            text: "I had an amazing experience at Victoria Hair Braiding and Weaving Center! The stylists were incredibly skilled and professional, and they took the time to ensure my braids were flawless. The atmosphere was warm and welcoming, making me feel comfortable throughout my visit. I’ve received so many compliments on my new style, and I’ll definitely be coming back for my next appointment!",
            author: "— LAUREN B.",
        },
        {
            text: "This salon is a gem! From the moment I walked in, I felt taken care of. The staff is friendly and attentive, and the quality of their work is exceptional. I got knotless braids, and they turned out better than I imagined—neat, lightweight, and perfectly done. It’s clear they value both their craft and their customers. Highly recommend!",
            author: "— EMILY R.",
        },
        {
            text: "Victoria Hair Braiding and Weaving Center is hands down the best hair salon I’ve been to. The team is incredibly talented and pays great attention to detail. They helped me choose the perfect style for my hair type, and the results were stunning. The salon is clean, organized, and provides a relaxing experience. I can’t wait to book my next appointment!",
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
                <p className="text-4xl italic text-center text-[#38271F]">
                    "{reviews[currentIndex].text}"
                </p>
                <p className="mt-4 text-sm font-medium text-gray-800">
                    {reviews[currentIndex].author}
                </p>
                <div className="flex mt-6 space-x-4">
                    <SquareChevronLeft
                        onClick={handlePrev}
                        size={54}
                        className="hover:cursor-pointer hover:text-[#291c17] text-[#38271F]"
                    />
                    <SquareChevronRight
                        onClick={handleNext}
                        size={54}
                        className="hover:cursor-pointer hover:text-[#291c17] text-[#38271F]"
                    />
                </div>
            </div>
        </section>
    )
}