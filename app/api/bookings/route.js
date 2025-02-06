import { connectToDatabase } from "@/lib/mongoose";
import Booking from "@/models/booking";
import Service from "@/models/service";
import User from "@/models/user";
import mongoose from "mongoose";


export async function GET(request) {
    try {
        await connectToDatabase();
        const bookings = await Booking.find({})
            .populate("services")
            .exec();

        return new Response(JSON.stringify(bookings), {
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
        console.log(services)

        const objectIds = services.map(id => mongoose.Types.ObjectId(id));

        if (!objectIds.every(id => mongoose.Types.ObjectId.isValid(id))) {
            return new Response("Invalid service ids", { status: 400 });
        }
        if (!name || !email || !phone || !selectedDate || !selectedSlot || !services) {
            return new Response("Missing required fields", { status: 400 });
        }
        if (additionalInfo) {
            if (additionalInfo.length > 500) {
                return new Response("Additional info too long", { status: 400 });
            }
        }
        if (selectedDate < new Date()) {
            return new Response("Selected date is in the past", { status: 400 });
        }

        const findServices = await Service.find({ '_id': { $in: objectIds } });

        if (findServices.length !== objectIds.length) {
            const invalidIds = ids.filter(id => !services.some(service => service._id.toString() === id));
            console.error('Invalid service IDs:', invalidIds);
        }

        // const booking = new Booking({
        //     name,
        //     email,
        //     phone,
        //     additionalInfo,
        //     selectedDate,
        //     selectedSlot,
        //     services,
        // });

        // await booking.save();
        return new Response("Booking created", { status: 201 });
    } catch (error) {
        console.error(error);
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
