"use client";
import { IoStar } from "react-icons/io5";
import { Input } from "@/components/ui/input";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const reviewSchema = z.object({
    name: z.string().min(3, "Name is required"),
    email: z.string().email("Invalid email address").min(3, "Email is required"),
    review: z.string().min(10, "Review content is required"),
    rating: z.number().min(1, "Rating is required").max(5, "Rating must be between 1 and 5"),
});

export default function ReviewForm() {
    const { id } = useParams();
    const { toast } = useToast();

    const [rating, setRating] = useState(0);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    
    const handleStarClick = (starIndex) => {
        setRating(starIndex + 1);
    };

    const handleInputChange = (field) => {
        setErrors((prevErrors) => {
            const updatedErrors = { ...prevErrors };
            delete updatedErrors[field];
            return updatedErrors;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        const formData = new FormData(e.target);
        const reviewContent = formData.get("review");
        const name = formData.get("name");
        const email = formData.get("email");

        const formValues = {
            name,
            email,
            review: reviewContent,
            rating,
        };

        try {
            reviewSchema.parse(formValues);
            setErrors({});

            const response = await fetch('/api/review', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formValues,
                    productId: id,
                }),
            })
            if (!response.ok) {
                const data = await response.json();

                console.log("line 70")
                console.log({ data: data.message })

                toast({
                    variant: "destructive",
                    title: "Failed to submit review",
                    description: data.message || "seomthing went wrong.",
                });
                return;
            }
            toast({
                variant: "success",
                title: "Review submitted successfully",
                description: "Thank you for your feedback!",
            });
            e.target.reset();
        } catch (err) {
            if (err instanceof z.ZodError) {
                const errorMessages = err.errors.reduce((acc, error) => {
                    acc[error.path[0]] = error.message;
                    return acc;
                }, {});
                setErrors(errorMessages);
                return;
            }
            toast({
                variant: "destructive",
                title: "Failed to submit review",
                description: "something went wrong.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex justify-between items-center gap-4">
                <label htmlFor="rating" className="text-xl font-bold">Your Rating:</label>
                <div className="flex gap-2">
                    {[...Array(5)].map((_, starIndex) => (
                        <label 
                            key={starIndex} 
                            htmlFor={`star-${starIndex + 1}`} 
                            className={`text-2xl cursor-pointer ${starIndex + 1 <= rating ? 'text-[#214207]' : 'text-gray-400'}`} 
                            onClick={() => handleStarClick(starIndex)}
                        >
                            <IoStar />
                        </label>
                    ))}
                </div>
            </div>
            {errors.rating && <p className="text-red-500 text-sm">{errors.rating}</p>}
            
            <textarea
                name="review"
                rows="4"
                placeholder="Write a review..."
                className="w-full p-4 bg-[#214207] text-white rounded-2xl"
                onChange={() => handleInputChange("review")}
            />
            {errors.review && <p className="text-red-500 text-sm">{errors.review}</p>}

            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                <div>
                    <Input
                        name="name"
                        type="text"
                        placeholder="Name"
                        className="bg-[#214207] text-white py-6 rounded-2xl"
                        onChange={() => handleInputChange("name")}
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>
                <div>
                    <Input
                        name="email"
                        type="email"
                        placeholder="Email"
                        className="bg-[#214207] text-white py-6 rounded-2xl"
                        onChange={() => handleInputChange("email")}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>
            </div>
            <div className="flex justify-center sm:justify-start">
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#214207] hover:bg-[#2b4d12] text-white font-medium py-4 px-4 rounded-md shadow-md transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    {loading ? "Submitting..." : "Submit Review"}
                </button>
            </div>
        </form>
    );
}
