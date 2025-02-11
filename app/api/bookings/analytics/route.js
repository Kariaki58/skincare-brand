import Booking from "@/models/booking";
import { connectToDatabase } from "@/lib/mongoose";

export async function GET(request) {
    try {
        await connectToDatabase();

        const currentYear = new Date().getFullYear();

        // Step 1: Create an array of all months with initial counts set to zero
        const months = [
            { month: "January", bookings: 0, cancellations: 0 },
            { month: "February", bookings: 0, cancellations: 0 },
            { month: "March", bookings: 0, cancellations: 0 },
            { month: "April", bookings: 0, cancellations: 0 },
            { month: "May", bookings: 0, cancellations: 0 },
            { month: "June", bookings: 0, cancellations: 0 },
            { month: "July", bookings: 0, cancellations: 0 },
            { month: "August", bookings: 0, cancellations: 0 },
            { month: "September", bookings: 0, cancellations: 0 },
            { month: "October", bookings: 0, cancellations: 0 },
            { month: "November", bookings: 0, cancellations: 0 },
            { month: "December", bookings: 0, cancellations: 0 },
        ];

        // Step 2: Perform the aggregation
        const aggregationResults = await Booking.aggregate([
            {
                $match: {
                selectedDate: {
                    $gte: new Date(`${currentYear}-01-01`),
                    $lt: new Date(`${currentYear + 1}-01-01`),
                },
                },
            },
            {
                $group: {
                _id: {
                    month: { $month: "$selectedDate" },
                    isCancelled: "$isCancelled",
                },
                count: { $sum: 1 },
                },
            },
            {
                $group: {
                _id: "$_id.month",
                bookings: {
                    $sum: {
                    $cond: [{ $eq: ["$_id.isCancelled", false] }, "$count", 0],
                    },
                },
                cancellations: {
                    $sum: {
                    $cond: [{ $eq: ["$_id.isCancelled", true] }, "$count", 0],
                    },
                },
                },
            },
            {
                $sort: { _id: 1 },
            },
        ]);

        // Step 3: Merge the aggregation results with the months array
        aggregationResults.forEach((result) => {
            const monthIndex = result._id - 1;
            months[monthIndex].bookings = result.bookings;
            months[monthIndex].cancellations = result.cancellations;
        });

        return new Response(JSON.stringify(months), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response("Internal server error", { status: 500 });
    }
}
