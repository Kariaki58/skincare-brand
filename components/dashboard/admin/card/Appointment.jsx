import { Ellipsis, CalendarRange } from "lucide-react";
import { connectToDatabase } from "@/lib/mongoose";
import Booking from "@/models/booking";

export default async function AppointMentCard() {
    let appointments = 0;
    let errorOccurred = false;
    try {
        await connectToDatabase();
        appointments = await Booking.countDocuments().exec();
    } catch (error) {
        errorOccurred = true;
    }
    return (
        <div className="col-span-1 bg-white border-2 p-4 shadow-md rounded-xl flex justify-between items-start gap-3 text-gray-600">
            <div className="flex items-center gap-5">
                <CalendarRange size={62} className="text-[#966f5d]"/>
                <div>
                    <h3 className="text-lg font-medium">AppointMent</h3>
                    {errorOccurred? (
                        <p className="text-red-500">Failed to load appointments.</p>
                    ) : (
                        <h1 className="text-xl font-bold">{appointments}</h1>
                    )}
                </div>
            </div>
            <Ellipsis size={24}/>
        </div>
    )
}