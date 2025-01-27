import { IoStar } from "react-icons/io5";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";


export default function ReviewForm() {
    return (
        <form className="space-y-5">
            <div className="flex justify-between items-center gap-4">
                <label htmlFor="rating" className="text-xl font-bold">Your Rating:</label>
                <div className="flex gap-2">
                    {[...Array(5)].map((_, starIndex) => (
                        <div key={starIndex}>
                            <label htmlFor={`star-${starIndex + 1}`} className="text-[#214207] text-lg">
                                <IoStar className="text-yellow-500" />
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            <textarea rows="4" placeholder="Write a review..." className="w-full p-4 bg-[#214207] text-white rounded-2xl"/>
            <div className="grid gap-4 grid-cols-2">
                <Input type="text" placeholder="Name" className="bg-[#214207] text-white py-6 rounded-2xl" />
                <Input type="email" placeholder="Email" className="bg-[#214207] text-white py-6 rounded-2xl" />
            </div>
            <button type="submit" className="bg-[#214207] hover:bg-[#2b4d12] text-white font-medium py-4 px-4 rounded-md shadow-md transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Submit Review
            </button>
        </form>
    )
}