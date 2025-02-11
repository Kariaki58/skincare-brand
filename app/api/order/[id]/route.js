import { connectToDatabase } from "@/lib/mongoose";
import Order from "@/models/order";


export async function DELETE(request, { params }) {
    try {
        const { id } = await params;
        
        
        if (!id) {
            return new Response(JSON.stringify({ success: false, message: "Order ID is required" }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        await connectToDatabase();
        const deletedOrder = await Order.findByIdAndDelete(id);

        if (!deletedOrder) {
            return new Response(JSON.stringify({ success: false, message: "Order not found" }), {
                status: 404,
                headers: { "Content-Type": "application/json" }
            });
        }

        return new Response(JSON.stringify({ success: true, message: "Order deleted successfully" }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, message: error.message || "Server error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}