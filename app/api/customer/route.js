import Customer from "@/models/customer";
import { connectToDatabase } from "@/lib/mongoose";

export async function GET(req) {
    try {
        await connectToDatabase();
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get("page")) || 1;
        const limit = 10;
        
        const totalCustomers = await Customer.countDocuments();

        const totalPages = Math.ceil(totalCustomers / limit);

        const customers = await Customer.find()
            .skip((page - 1) * limit)
            .limit(limit);

        return new Response(JSON.stringify({ 
            customers, 
            totalPages, 
            currentPage: page 
        }), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to fetch customers" }), { status: 500 });
    }
}
