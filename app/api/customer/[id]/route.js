import Customer from "@/models/customer";
import { connectToDatabase } from "@/lib/mongoose";


export async function DELETE(req, { params }) {
    try {
        await connectToDatabase();
        const { id } = await params;
        const customer = await Customer.findByIdAndDelete(id);
        if (!customer) {
            return new Response(JSON.stringify({ error: "Customer not found" }), { status: 404 });
        }
        return new Response(JSON.stringify({ message: "Customer deleted successfully" }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to delete customer" }), { status: 500 });
    }
}