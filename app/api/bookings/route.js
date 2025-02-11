import { connectToDatabase } from "@/lib/mongoose";
import Booking from "@/models/booking";
import Service from "@/models/service";
import User from "@/models/user";
import mongoose from "mongoose";


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



export async function POST(request) {
    try {
        await connectToDatabase();
        const { name, email, phone, additionalInfo, selectedDate, selectedSlot, services } = await request.json();

        if (!name || !email || !phone || !selectedDate || !selectedSlot || !Array.isArray(services) || services.length === 0) {
            return new Response("Missing required fields", { status: 400 });
        }

        if (additionalInfo && additionalInfo.length > 500) {
            return new Response("Additional info too long", { status: 400 });
        }


        const selectedDateObj = new Date(selectedDate);
        selectedDateObj.setHours(0, 0, 0, 0);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDateObj < today) {
            return new Response("Selected date is invalid or in the past", { status: 400 });
        }

        // Check if the user has already booked for the selected date
        const existingUserBooking = await Booking.findOne({
            selectedDate: selectedDateObj,
            $or: [{ email }, { phone }],
        });

        if (existingUserBooking) {
            return new Response("You have already booked for this date. Please select another day.", { status: 400 });
        }

        // Validate service IDs
        const objectIds = services.map(id => {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return null;
            }
            return new mongoose.Types.ObjectId(id);
        }).filter(id => id !== null);

        if (objectIds.length !== services.length) {
            return new Response("One or more service IDs are invalid", { status: 400 });
        }

        const findServices = await Service.find({ '_id': { $in: objectIds } });

        if (findServices.length !== objectIds.length) {
            const invalidIds = services.filter(id => !findServices.some(service => service._id.toString() === id));
            console.error('Invalid service IDs:', invalidIds);
            return new Response("Some service IDs are invalid", { status: 400 });
        }

        // Check if the slot is already fully booked
        const existingBookings = await Booking.countDocuments({
            selectedDate: selectedDateObj,
            selectedSlot: selectedSlot
        });

        if (existingBookings > 6) {
            return new Response("This time slot is fully booked. Please choose another slot.", { status: 400 });
        }

        const booking = new Booking({
            name,
            email,
            phone,
            additionalInfo,
            selectedDate: selectedDateObj,
            selectedSlot,
            services: objectIds,
        });

        await booking.save();

        return new Response("Booking created successfully", { status: 201 });
    } catch (error) {
        console.error("Error creating booking:", error);
        return new Response("Internal server error", { status: 500 });
    }
}


export async function DELETE(request) {
    try {
        await connectToDatabase();
        const { id } = await request.body;
        const booking = await Booking.findById(id);

        if (!booking) {
            return new Response("Booking not found", { status: 404 });
        }

        const user = await User.findById(booking.userId);

        if (!user) {
            return new Response("User not found", { status: 404 });
        }

        if (user.role === "admin") {
            await booking.delete();
            return new Response("Booking deleted", { status: 204 });
        } else {
            return new Response("Unauthorized", { status: 401 });
        }
    } catch (error) {
        console.error(error);
        return new Response("Internal server error", { status: 500 });
    }
}
