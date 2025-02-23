"use client";
import { IoStar } from "react-icons/io5";
import { Minus } from "lucide-react";
import ReviewForm from "./review-form";
import useProductStore from "@/store/productStore";
import { useEffect } from "react";
import { useParams } from "next/navigation";


export default function Review() {
    const params = useParams();
    const { products, fetchProducts } = useProductStore();
    useEffect(() => {
        if (params.id) {
            fetchProducts(params.id);
        }
    }, [params.id]);

    if (!products || products.length === 0) {
        return <p>Loading...</p>;
    }

    return (
        <div className="space-y-4 p-10 my-20" id="reviews">
            {
                products.reviews.map((review, index) => (
                    <div key={review._id} className="space-y-4">
                        <div className="flex justify-between items-center">
                            <div className="flex justify-center gap-1">
                                {[...Array(review.rating)].map((_, starIndex) => (
                                    <IoStar key={starIndex} className="text-[#e9ff23] text-lg" />
                                ))}
                            </div>
                            <p>{new Date(review.createdAt).toLocaleDateString("en-GB", {
                                day: "numeric",
                                month: "long",
                                year: "numeric"
                            })}</p>

                        </div>
                        <p className="text-black">
                            {review.content}
                        </p>
                        <div className="flex items-center font-bold">
                            <Minus />
                            <p>{review.name}</p>
                        </div>
                    </div>
                ))
            }
            <div className="mt-20 pt-20">
                <ReviewForm />
            </div>
        </div>
    )
}