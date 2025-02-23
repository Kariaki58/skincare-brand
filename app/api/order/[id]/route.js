import { connectToDatabase } from "@/lib/mongoose";
import Order from "@/models/order";
import User from "@/models/user";


export async function DELETE(request, { params }) {
    try {
        const { id } = await params;
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");
        
        if (!id) {
            return new Response(JSON.stringify({ success: false, message: "Order ID is required" }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        await connectToDatabase();
        if (!userId) {
            return new Response(JSON.stringify({ success: false, message: "User ID is required" }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }
        const user = await User.findOne({ _id: userId });
        if (!user) {
            return new Response(JSON.stringify({ success: false, message: "User not found" }), {
                status: 404,
                headers: { "Content-Type": "application/json" }
            });
        }
        if (user.role !== "admin") {
            return new Response(JSON.stringify({ success: false, message: "Unauthorized" }), {
                status: 403,
                headers: { "Content-Type": "application/json" }
            });
        }
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