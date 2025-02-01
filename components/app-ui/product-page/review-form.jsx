"use client";
import { IoStar } from "react-icons/io5";
import { Input } from "@/components/ui/input";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function ReviewForm() {
    const { id } = useParams(); // Extract id from the URL parameters
    const [rating, setRating] = useState(0); // State to track the selected rating

    const handleStarClick = (starIndex) => {
        setRating(starIndex + 1); // Update rating when a star is clicked
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const reviewContent = formData.get("review");
        const name = formData.get("name");
        const email = formData.get("email");
        
        console.log("Form Submitted");
        console.log("Product ID:", id);
        console.log("Rating:", rating);
        console.log("Review Content:", reviewContent);
        console.log("Name:", name);
        console.log("Email:", email);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex justify-between items-center gap-4">
                <label htmlFor="rating" className="text-xl font-bold">Your Rating:</label>
                <div className="flex gap-2">
                    {[...Array(5)].map((_, starIndex) => (
                        <div key={starIndex}>
                            <input 
                                type="radio" 
                                id={`star-${starIndex + 1}`} 
                                name="rating" 
                                value={starIndex + 1} 
                                className="hidden" 
                                onClick={() => handleStarClick(starIndex)} // Set rating on click
                            />
                            <label 
                                htmlFor={`star-${starIndex + 1}`} 
                                className={`text-lg cursor-pointer ${starIndex < rating ? 'text-yellow-500' : 'text-gray-400'}`} // Color change based on rating
                            >
                                <IoStar />
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            <textarea name="review" rows="4" placeholder="Write a review..." className="w-full p-4 bg-[#214207] text-white rounded-2xl"/>
            <div className="grid gap-4 grid-cols-2">
                <Input name="name" type="text" placeholder="Name" className="bg-[#214207] text-white py-6 rounded-2xl" />
                <Input name="email" type="email" placeholder="Email" className="bg-[#214207] text-white py-6 rounded-2xl" />
            </div>
            <button type="submit" className="bg-[#214207] hover:bg-[#2b4d12] text-white font-medium py-4 px-4 rounded-md shadow-md transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Submit Review
            </button>
        </form>
    );
}
