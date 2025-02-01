"use server";

import { connectToDatabase } from "@/lib/mongoose";
import Product from "@/models/product";


export default async function getProductDocumentLength() {
    try {
        await connectToDatabase();
        const productCount = await Product.countDocuments().exec();
        return productCount;
    } catch (error) {
        console.error(error);
        throw new Error("Error counting products");
    }
}