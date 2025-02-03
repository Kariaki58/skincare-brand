import { connectToDatabase } from "@/lib/mongoose";
import User from "@/models/user";
import mongoose from "mongoose";
import Product from "@/models/product";
import Cart from "@/models/cart";


export async function GET(request) {
    try {
        await connectToDatabase();
        const { searchParams } = new URL(request.url);

        console.log(searchParams);
        const userId = searchParams.get("userId");

        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            return new Response(JSON.stringify({ error: "Invalid User ID" }), { status: 400 });
        }

        if (!userId) {
            return new Response(JSON.stringify({ error: "User ID required" }), { status: 400 });
        }
        const user = await User.findById(userId).exec();
        if (!user) {
            return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
        }
        console.log(userId)

        const cart = await Cart.findOne({ userId }).populate("cart._id").exec();

        return new Response(JSON.stringify(cart || { cart: [] }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: "Something went wrong" }), { status: 500 });
    }
}


export async function POST(request) {
    try {
        const response = await request.json();
        const { userId, cart } = response

        await connectToDatabase();

        const user = await User.findById(userId).exec();
        if (!user) {
            return new Response(JSON.stringify({ error: "User not found" }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        const existingCart = await Cart.findOne({ userId }).exec();

        if (existingCart) {
            existingCart.cart = cart;
            await existingCart.save();
        } else {
            await Cart.create({ userId, cart });
        }
        return new Response(JSON.stringify("cart"), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ error: "something went wrong" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}


export async function PUT(request) {
    
    return new Response('Hello, World!', {
        headers: { 'Content-Type': 'text/plain' },
    });
}

export async function DELETE(request) {
    return new Response('Hello, World!', {
        headers: { 'Content-Type': 'text/plain' },
    });
}