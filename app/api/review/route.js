import { connectToDatabase } from "@/lib/mongoose";
import User from "@/models/user";
import Product from "@/models/product";
import Review from "@/models/review";


export async function POST(request) {
    try {
        await connectToDatabase();
        const { name, email, review, rating, userId, productId } = await request.json();

        if (!name || !email || !review || !rating || !productId) {
            return Response.json({ message: "Please fill in all fields" }, { status: 400 });
        }

        const user = await User.findById(userId);
        if (!user) {
            return Response.json({ message: "User not found" }, { status: 404 });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return Response.json({ message: "Product not found" }, { status: 404 });
        }

        // Check if the user has already reviewed any product
        const existingReview = await Review.findOne({ $or: [{ userId }, { email }] });

        if (existingReview) {
            return Response.json({ message: "You have already submitted a review before" }, { status: 400 });
        }

        const newReview = new Review({
            name,
            email,
            content: review,
            rating,
            userId,
        });

        await newReview.save();

        // Add review ID to product's reviews array
        product.reviews.push(newReview._id);
        await product.save();

        return Response.json(newReview, { status: 200 });
    } catch (error) {
        return Response.json({ message: error.message }, { status: 500 });
    }
}
