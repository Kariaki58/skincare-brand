"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

export default function Filter({ categories, PriceRangeFilter }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const sortOptions = ["Low to High", "High to Low", "Best Rating"];

    // State for filters
    const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
    const [priceRange, setPriceRange] = useState(searchParams.get("price") || "240");

    // Function to update URL parameters
    const handleFilterChange = (key, value) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }

        router.push(`?${params.toString()}`);
    };

    // ⏳ Debounce search query updates in URL
    useEffect(() => {
        const timeout = setTimeout(() => {
            handleFilterChange("search", searchQuery);
        }, 500); // Update URL after 500ms delay

        return () => clearTimeout(timeout); // Cleanup timeout
    }, [searchQuery]);

    return (
        <aside className="w-full space-y-6">
            {/* 🔎 Search Input */}
            <div>
                <Input
                    placeholder="Search products..."
                    className="w-full text-white placeholder-gray-300 bg-[#173202] border-none focus:ring-2 focus:ring-[#76C043]"
                    aria-label="Search products"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* 💰 Price Range Filter */}
            <div className="space-y-2">
                <label htmlFor="price-range" className="block text-sm font-medium text-white">
                    Price Range
                </label>
                <div className="flex justify-between text-xs text-gray-300">
                    <span>${PriceRangeFilter.lowPrice}</span>
                    <span>${priceRange}</span>
                    <span>${PriceRangeFilter.highPrice}</span>
                </div>
                <div className="flex items-center gap-4">
                    <input
                        id="price-range"
                        type="range"
                        min={PriceRangeFilter.lowPrice}
                        max={PriceRangeFilter.highPrice}
                        value={priceRange}
                        onChange={(e) => setPriceRange(e.target.value)}
                        className="w-full h-2 rounded-lg bg-gray-300 accent-[#76C043]"
                        aria-label="Price range filter"
                    />
                    <Button
                        variant="default"
                        className="px-4 py-2 text-white bg-[#76C043] hover:bg-[#5CA02F]"
                        onClick={() => handleFilterChange("price", priceRange)}
                    >
                        Apply
                    </Button>
                </div>
            </div>

            {/* 🏷️ Category Filter */}
            <div className="space-y-2">
                <label htmlFor="category-filter" className="block text-sm font-medium text-white">
                    Category
                </label>
                <select
                    id="category-filter"
                    className="w-full p-2 text-white bg-[#173202] border-none rounded-md shadow-sm focus:ring-2 focus:ring-[#76C043]"
                    aria-label="Category filter"
                    onChange={(e) => handleFilterChange("category", e.target.value.replace(" ", "-"))}
                    value={searchParams.get("category")?.replace("-", " ") || ""}
                >
                    <option value="">All Categories</option>
                    {JSON.parse(categories).map((category, index) => (
                        <option key={index} value={category.name}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* 📌 Sorting Filter */}
            <div className="space-y-2">
                <label htmlFor="sort-by" className="block text-sm font-medium text-white">
                    Sort By
                </label>
                <select
                    id="sort-by"
                    className="w-full p-2 text-white bg-[#173202] border-none rounded-md shadow-sm focus:ring-2 focus:ring-[#76C043]"
                    aria-label="Sort by filter"
                    onChange={(e) => handleFilterChange("sort", e.target.value)}
                    value={searchParams.get("sort") || ""}
                >
                    <option value="">Default</option>
                    {sortOptions.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        </aside>
    );
}
