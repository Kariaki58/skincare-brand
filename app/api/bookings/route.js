import { connectToDatabase } from "@/lib/mongoose";
import Booking from "@/models/booking";


export async function GET(request) {
    try {
        await connectToDatabase();

        const bookings = await Booking.find({})
            .select("selectedDate selectedSlot")
            .lean();

        // Group bookings by date and slot count
        const bookedSlots = {};
        bookings.forEach(({ selectedDate, selectedSlot }) => {
            const dateStr = selectedDate.toISOString().split("T")[0];
            if (!bookedSlots[dateStr]) bookedSlots[dateStr] = {};
            if (!bookedSlots[dateStr][selectedSlot]) bookedSlots[dateStr][selectedSlot] = 0;

            bookedSlots[dateStr][selectedSlot] += 1;
        });

        return new Response(JSON.stringify(bookedSlots), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error(error);
        return new Response("Internal server error", { status: 500 });
    }
}


