import CategoryDb from "@/models/category";
import Product from "@/models/product";
import { connectToDatabase } from "@/lib/mongoose";
import Filter from "./filter";
import { Suspense } from "react";

export default async function SortedDisplay() {
    let categories = [];
    let priceRange = { lowPrice: 0, highPrice: 0 };
    const errorOccurred = false;

    try {
        await connectToDatabase();

        categories = await CategoryDb.find({}).exec();

        const priceData = await Product.aggregate([
            {
                $group: {
                    _id: null,
                    lowPrice: { $min: "$basePrice" },
                    highPrice: { $max: "$basePrice" },
                }
            }
        ]);

        if (priceData.length > 0) {
            priceRange.lowPrice = priceData[0].lowPrice;
            priceRange.highPrice = priceData[0].highPrice;
        }

    } catch (error) {
        errorOccurred = true;
    }
    if (errorOccurred) {
        return <div>Error occurred while fetching data</div>;
    }

    return (
        <aside className="h-[30rem] bg-[#214207] p-6 space-y-6 shadow-md">
            <h2 className="font-bold text-xl text-white">Filters</h2>
            <Suspense fallback={<div>Loading...</div>}>
                <Filter categories={JSON.stringify(categories)} PriceRangeFilter={priceRange} />
            </Suspense>
        </aside>
    );
}
