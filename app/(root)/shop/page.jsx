"use client";
import { Playfair_Display, Shippori_Antique } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { IoStar } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import image1 from "@/public/product-images/image2.jpg";
import image2 from "@/public/product-images/image3.jpg";
import image3 from "@/public/product-images/image4.jpg";
import image4 from "@/public/product-images/image5.jpg";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const playfair_display = Playfair_Display({
    subsets: ["latin"],
    weight: "400",
});

const shipporiAntique = Shippori_Antique({
    subsets: ["latin"],
    weight: "400",
});

const images = [image1, image2, image3, image4];

const categories = ["All", "Category 1", "Category 2", "Category 3"];
const sortOptions = ["Price: Low to High", "Price: High to Low", "Best Rating"];

export default function Page() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortOption, setSortOption] = useState(sortOptions[0]);

    const handleCategoryChange = (e) => setSelectedCategory(e.target.value);
    const handleSortChange = (e) => setSortOption(e.target.value);

    const filteredProducts = Array.from({ length: 8 }) // Simulating products
        .filter((_, index) => {
            if (selectedCategory === "All") return true;
            return index % 2 === 0; // Example filter logic
        })
        .sort((a, b) => {
            if (sortOption === "Price: Low to High") return a - b;
            if (sortOption === "Price: High to Low") return b - a;
            return 0; // Default sorting
        });

    return (
        <section className="mb-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5 px-10 md:px-0">
                {/* Filter Section */}
                <aside className="h-[30rem] bg-[#214207] p-6 space-y-6 shadow-md">
                    <h2 className="font-bold text-xl text-white">Filters</h2>

                    {/* Search Input */}
                    <div className="space-y-4">
                        <Input
                            placeholder="Search products..."
                            className="text-white placeholder-gray-300 bg-[#173202] border-none focus:ring-2 focus:ring-[#76C043]"
                        />
                    </div>

                    {/* Price Range Filter */}
                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-white">Price Range</label>
                        <div className="flex items-center justify-between text-xs text-gray-300">
                            <span>$180</span>
                            <span>$300</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <input
                                type="range"
                                min="180"
                                max="300"
                                defaultValue="240"
                                className="w-full h-2 rounded-lg bg-gray-300 accent-[#76C043]"
                            />
                            <Button variant="default" className="text-white bg-[#76C043] hover:bg-[#5CA02F]">
                                Apply
                            </Button>
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-white">Category</label>
                        <select
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                            className="w-full p-2 text-white bg-[#173202] border-none rounded-md shadow-sm focus:ring-2 focus:ring-[#76C043]"
                        >
                            {categories.map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Sort By Filter */}
                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-white">Sort By</label>
                        <select
                            value={sortOption}
                            onChange={handleSortChange}
                            className="w-full p-2 text-white bg-[#173202] border-none rounded-md shadow-sm focus:ring-2 focus:ring-[#76C043]"
                        >
                            {sortOptions.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                </aside>


                {/* Products Section */}
                <div className="md:col-span-3 px-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                        {filteredProducts.map((_, index) => (
                            <div
                                key={index}
                                className="hover:bg-[#DFFFCC] p-1 rounded-lg hover:shadow-lg transition duration-300"
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
                                    <Link href={`/product/${index}`} className="flex justify-center hover:underline text-center text-sm md:text-lg font-medium">
                                        Product {index + 1} - Premium Quality
                                    </Link>
                                    <p className="flex gap-3 justify-center">
                                        <span className="font-bold text-base text-[#2D2D2D]">$96.00</span>
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
                </div>
            </div>
        </section>
    );
}
