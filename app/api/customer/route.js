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


export async function POST(req) {
    try {
        await connectToDatabase();
        let { name, email, phone } = await req.json();
        if (!email) {
            return new Response(JSON.stringify({ error: "Email is required" }), { status: 400 });
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
        return new Response(JSON.stringify({ message: "Customer added successfully" }), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to add customer" }), { status: 500 });
    }
}


// TODO: IMPLEMENT PUT FUNCTION YOURSELF.
// export async function PUT(req) {
//     try {
//         await connectToDatabase();
//         const { customerId } = req.params;
//         const { name, email, phone } = await req.json();
//         const customer = await Customer
//             .findByIdAndUpdate(customerId, { name, email, phone }, { new: true });  

//         if (!customer) {
//             return new Response(JSON.stringify({ error: "Customer not found" }), { status: 404 });
//         }
//         return new Response(JSON.stringify({ message: "Customer updated successfully" }), { status: 200 });
//     }
//     catch (error) {
//         return new Response(JSON.stringify({ error: "Failed to update customer" }), { status: 500 });
//     }

// }
