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
        return new Response(JSON.stringify({ error: "Failed to fetch customers" }), { status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}


export async function POST(req) {
    try {
        await connectToDatabase();
        let { name, email, phone } = await req.json();
        if (!email) {
            return new Response(JSON.stringify({ error: "Email is required" }), { status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }
        if (!name) {
            name = email.split('@')[0];
        }
        if (!phone) {
            phone = "";
        }
        const existingCustomer = await Customer.findOne({ email });
        if (!existingCustomer) {
            const customer = new Customer({ name, email, phone });
            await customer.save();
        }
        return new Response(JSON.stringify({ message: "Customer added successfully" }), { status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to add customer" }), { status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
