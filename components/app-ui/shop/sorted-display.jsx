import CategoryDb from "@/models/category";
import Product from "@/models/product";
import { connectToDatabase } from "@/lib/mongoose";
import Filter from "./filter";

export default async function SortedDisplay() {
    let categories = [];
    let priceRange = { lowPrice: 0, highPrice: 0 };

    try {
        await connectToDatabase();

        categories = await CategoryDb.find({}).exec();

        const priceData = await Product.aggregate([
            {
                $group: {
                    _id: null,
                    lowPrice: { $min: "$price" },
                    highPrice: { $max: "$price" },
                }
            }
        ]);

        if (priceData.length > 0) {
            priceRange.lowPrice = priceData[0].lowPrice;
            priceRange.highPrice = priceData[0].highPrice;
        }

    } catch (error) {
        console.error("Failed to fetch categories or price range:", error);
    }

    return (
        <aside className="h-[30rem] bg-[#214207] p-6 space-y-6 shadow-md">
            <h2 className="font-bold text-xl text-white">Filters</h2>
            <Filter categories={JSON.stringify(categories)} PriceRangeFilter={priceRange} />
        </aside>
    );
}
