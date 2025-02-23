import { connectToDatabase } from "@/lib/mongoose";
import User from "@/models/user";
import Product from "@/models/product";
import Category from "@/models/category";
import Review from "@/models/review";
import mongoose from "mongoose";
import { uploadImage } from "@/lib/cloudinary-upload";

export async function GET(request) {
    try {
        await connectToDatabase();
        const searchParams = request.nextUrl.searchParams;
        const queryParams = Object.fromEntries(searchParams.entries());
        const {
            search = "",
            price = "",
            category = "",
            sort = "",
            page = 1
        } = queryParams;

        const filters = {};

        // Search by product name
        if (search) {
            filters.name = { $regex: search, $options: "i" };
        }

        // Filter by price range (1 to max price provided)
        if (price) {
            const maxPrice = Number(price);
            if (!isNaN(maxPrice)) {
                filters.price = { $gte: 1, $lte: maxPrice };
            }
        }

        // Filter by category name
        if (category) {
            const categoryData = await Category.findOne({ name: category.replace("-", " ") });
            if (categoryData) {
                filters.category = categoryData._id;
            }
        }



        // Sorting logic
        const sortOptions = {};
        if (sort === "High to Low") {
            sortOptions.price = -1;
        } else if (sort === "Low to High") {
            sortOptions.price = 1;
        } else if (sort === "Rating") {
            sortOptions["reviews.rating"] = -1; // Sort by review rating
        }

        // Pagination settings
        const limit = 20;
        const skip = (Number(page) - 1) * limit;

        // Query the database with filters, sorting, and pagination
        const products = await Product.find(filters)
            .populate("category")
            .populate("reviews")
            .sort(sortOptions)
            .skip(skip)
            .limit(limit)
            .exec();


        // Get total product count for pagination
        const totalProducts = await Product.countDocuments(filters);

        return new Response(
            JSON.stringify({
                products,
                totalPages: Math.ceil(totalProducts / limit),
                currentPage: Number(page),
            }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" },
            }
        );
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}


export async function POST(request) {
    try {
        await connectToDatabase();
        const content = await request.formData();
        const userId = content.get("userId");


        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return new Response(JSON.stringify({ error: "Invalid user Id" }), { status: 404, headers: { 'Content-Type': 'application/json'}})
        }

        const user = await User.findById(userId);

        if (!user) {
            return new Response(JSON.stringify({ error: "User not found" }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        if (user.role !== 'admin') {
            return new Response(JSON.stringify({ error: "Unauthorized" }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        if (!content.has("name") ||!content.has("basePrice") ||!content.has("stock") ||!content.has("image") ||!content.has("category") ||!content.has("description")) {
            return new Response(JSON.stringify({ error: "Missing required fields" }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        if (content.get("name") === "" || content.get("basePrice") === "" || content.get("stock") === "" || content.get("image") === "" || content.get("category") === "" || content.get("description") === ""
        //  || content.get("additionalInfo") === ""
        ) {
            return new Response(JSON.stringify({ error: "Missing required fields" }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        if (parseFloat(content.get("stock")) < 0 || parseFloat(content.get("basePrice")) < 0) {
            return new Response(JSON.stringify({ error: "Invalid price or base price or stock" }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        if (content.get("stock") < 0 || content.get("basePrice") < 0) {
            return new Response(JSON.stringify({ error: "Invalid price or base price or stock" }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        if (isNaN(parseFloat(content.get("basePrice"))) || isNaN(parseInt(content.get("stock")))) {
            return new Response(JSON.stringify({ error: "Invalid price or stock" }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        const file = content.get("image");
        const arrayBuffer = await file.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer);
        const image = await uploadImage(buffer);
        if (!image) {
            return new Response(JSON.stringify({ error: "Error uploading image" }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        let category = await Category.findOne({ name: content.get("category") });
        if (!category) {
            category = await Category.create({ name: content.get("category") });
        }
        await Product.create({
            userId: content.get("userId"),
            name: content.get("name"),
            basePrice: parseFloat(content.get("basePrice")),
            stock: parseInt(content.get("stock")),
            image: image.secure_url,
            category: category._id,
            description: content.get("description"),
            additionalInfo: JSON.parse(content.get("additionalInfo")),
        });

        // Your logic here
        return new Response(JSON.stringify({ message: "Product uploaded successfully" }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Error uploading product" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
