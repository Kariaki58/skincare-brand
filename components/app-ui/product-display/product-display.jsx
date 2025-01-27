import { Button } from "@/components/ui/button";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoStar } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";



export default function ProductDisplay({ images }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {Array.from({ length: 4 }).map((_, index) => (
            <div
                key={index}
                className="p-1 rounded-lg hover:shadow-lg transition duration-300"
            >
                <div className="relative group">
                    <Image
                        src={images[index % images.length]}
                        alt={`Product ${index + 1}`}
                        width={300}
                        height={300}
                        className="object-cover shadow-md rounded-lg w-full h-[300px] md:h-[320px]"
                        priority
                    />
                    <div className="absolute top-2 left-2 bg-[rgba(46,119,46,0.8)] px-3 py-1 text-xs text-white font-bold rounded-md">
                        18% OFF
                    </div>
                    <div className="absolute bottom-0 left-0 flex items-center gap-2">
                        <Button
                            variant="default"
                            className="bg-[#214207] hover:bg-[#5CA02F] text-white flex items-center gap-2 rounded-none"
                            // onClick={() => handleAddToCart(product.id)}
                        >
                            <MdOutlineShoppingCart className="text-xl" />
                            <span>Add to Cart</span>
                        </Button>
                    </div>
                </div>
                <div className="space-y-3 mt-4">
                <Link href={`/product/${index}`} className="hover:underline text-black text-center text-sm md:text-lg font-medium flex justify-center">
                    Product {index + 1} - Premium Quality
                </Link>
                <p className="flex gap-3 justify-center">
                    <span className="font-bold text-base text-black">$96.00</span>
                    <span className="line-through text-sm text-gray-500">$121.54</span>
                </p>
                <div className="flex justify-center gap-1">
                    {[...Array(5)].map((_, starIndex) => (
                    <IoStar key={starIndex} className="text-[#214207] text-lg" />
                    ))}
                </div>
                </div>
            </div>
            ))}
        </div>
    )
}