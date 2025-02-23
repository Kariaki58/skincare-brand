import Customer from "@/models/customer";
import { connectToDatabase } from "@/lib/mongoose";
import User from "@/models/user";


export async function DELETE(req, { params }) {
    try {
        await connectToDatabase();
        const { id } = await params;
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");


        if (!userId) {
            return new Response(JSON.stringify({ error: "User ID is required" }), { status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        const user = await User.findById(userId);
        if (!user) {
            return new Response(JSON.stringify({ error: "User not found" }), { status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        if (user.role !== 'admin') {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        const customer = await Customer.findByIdAndDelete(id);
        if (!customer) {
            return new Response(JSON.stringify({ error: "Customer not found" }), { status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        return new Response(JSON.stringify({ message: "Customer deleted successfully" }), { status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to delete customer" }), { status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}