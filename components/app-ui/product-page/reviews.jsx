import { IoStar } from "react-icons/io5";
import { Minus } from "lucide-react";
import ReviewForm from "./review-form";

export default function Review() {
    return (
        <div className="space-y-4 p-10">
            <div className="flex justify-between items-center">
                <div className="flex justify-center gap-1">
                    {[...Array(5)].map((_, starIndex) => (
                        <IoStar key={starIndex} className="text-[#214207] text-lg" />
                    ))}
                </div>
                <p>April 3, 2021</p>
            </div>
            <p className="text-[#38271F]">
                I am 6 feet tall and 220 lbs. This shirt fit me perfectly in the chest and shoulders. My only complaint is that it is so long! I like to wear polo shirts untucked. This shirt goes completely past my rear end. If I wore it with ordinary shorts, you probably wouldnt be able to see the shorts at all – completely hidden by the shirt. It needs to be 4 to 5 inches shorter in terms of length to suit me. I have many RL polo shirts, and this one is by far the longest. I dont understand why.
            </p>
            <div className="flex items-center font-bold">
                <Minus />
                <p>Chung Pham</p>
            </div>
            <ReviewForm />
        </div>
    )
}