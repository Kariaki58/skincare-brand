import { connectToDatabase } from "@/lib/mongoose";
import Category from "@/models/category";


export async function GET(request) {
    try {
        await connectToDatabase();
        const category = await Category.find({}).exec();

        return new Response(JSON.stringify(category), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "something went wrong" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}