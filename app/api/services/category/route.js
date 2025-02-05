import { connectToDatabase } from "@/lib/mongoose";
import serviceCategory from "@/models/service-category";


export async function GET(request) {
    try {
        await connectToDatabase();
        const serviceCategories = await serviceCategory.find({}).exec();

        return new Response(JSON.stringify(serviceCategories), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Failed to fetch service categories" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
