import { Ellipsis, ClockArrowUp } from "lucide-react";
import { connectToDatabase } from "@/lib/mongoose";
import Order from "@/models/order"



export default async function OrderCard() {
    let orders = 0;
    let errorOccurred = false;
    try {
        await connectToDatabase();
        orders = await Order.countDocuments().exec();
    } catch (error) {
        errorOccurred = true;
    }
    return (
        <div className="col-span-1 bg-white border-2 p-4 shadow-md rounded-xl flex justify-between items-start gap-3 text-gray-600">
            <div className="flex items-center gap-5">
                <ClockArrowUp size={62} className="text-[#966f5d]" />
                <div>
                    <h3 className="text-lg font-medium">Orders</h3>
                    {errorOccurred ? (
                        <p className="text-red-500">Failed to load orders.</p>
                    ) : (
                        <h1 className="text-xl font-bold">{orders}</h1>
                    )}
                </div>
            </div>
            <Ellipsis size={24} />
        </div>
    );    
    
}