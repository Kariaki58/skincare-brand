import { connectToDatabase } from "@/lib/mongoose";
import Booking from "@/models/booking";
import Service from "@/models/service";
import Customer from "@/models/customer";
import { sendEmail } from "@/actions/sendEmail";
import User from "@/models/user";
import { generateSellerAppointmentNotificationTemplate, generateSellerDepositRequestTemplate } from "@/lib/email-template/email-content";



export async function GET(request) {
    try {
        await connectToDatabase();
        
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get("page") || "1", 10);
        const userId = searchParams.has("userId") ? searchParams.get("userId") : null;


        const limit = 20;
        const skip = (page - 1) * limit;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (!userId) {
            return new Response(JSON.stringify({ error: "Missing required userId parameter"}), { status: 400, headers: { "Content-Type": "application/json" } });
        }

        const user = await User.findById(userId);
        if (!user) {
            return new Response(JSON.stringify({ error: "User not found"}), { status: 404, headers: { "Content-Type": "application/json" } });
        }
        if (user.role !== "admin") {
            return new Response(JSON.stringify({ error: "Unauthorized"}), { status: 403, headers: { "Content-Type": "application/json" } });
        }

        const bookings = await Booking.find({ selectedDate: { $gte: today } })
            .sort({ selectedDate: 1 })
            .populate("services")
            .skip(skip)
            .limit(limit);
        const comfirmedBookings = await Booking.countDocuments({ isConfirmed: true, selectedDate: { $gte: today }  });
        const cancelledBookings = await Booking.countDocuments({ isCancelled: true, selectedDate: { $gte: today } });
        const pendingBookings = await Booking.countDocuments({ isConfirmed: false, isCancelled: false, selectedDate: { $gte: today }});

        const totalCount = await Booking.countDocuments();
        const totalPages = Math.ceil(totalCount / limit);

        return new Response(
            JSON.stringify({ bookings, totalPages, currentPage: page, totalCount, comfirmedBookings, cancelledBookings, pendingBookings }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        return new Response(JSON.stringify({error: "An error occurred while fetching appointments"}), { status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export async function POST(request) {
    const { name, email, phone, date, time, message, services } = await request.json();
    if (!name || !email || !phone || !date || !time || !message || !services) {
        return new Response(JSON.stringify({error: "Please fill in all required fields"}), { status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }


    try {
        await connectToDatabase();
        const serviceIds = services.map(service => service._id);
        const serviceDocs = await Service.find({ _id: { $in: serviceIds } });
        const totalCost = serviceDocs.reduce((acc, service) => acc + service.price, 0);

        if (serviceDocs.length !== serviceIds.length) {
            return new Response(JSON.stringify({error: "One or more services do not exist"}), { status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        const existingBooking = await Booking.findOne({ email, selectedDate: { $gte: startOfDay, $lte: endOfDay }})


        if (existingBooking) {
            return new Response(JSON.stringify({ error: "You have already booked an appointment for that date" }), { status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        await Customer.findOneAndUpdate(
            { email },
            { 
                $inc: { bookings: 1 }, 
                $set: { email, name, phone } 
            },
            { new: true, upsert: true }
        );

        const booking = new Booking({
            name,
            email,
            phone,
            additionalInfo: message,
            selectedDate: new Date(date),
            selectedSlot: time,
            services: serviceIds
        });
        await booking.save();
        const totalCostDiscount = totalCost - (totalCost * 0.5);
        const numberOfPeople = await Booking.find({ selectedDate: new Date(date), selectedSlot: time }).countDocuments();
        const sellerNotify = generateSellerAppointmentNotificationTemplate(booking._id, date, time, numberOfPeople);
        const sellerDepositRequest = generateSellerDepositRequestTemplate(totalCostDiscount);

        await sendEmail(process.env.EMAIL_ADDRESS, "New Appointment Request", sellerNotify);
        await sendEmail(email, "Appointment Confirmation", sellerDepositRequest);

        return new Response(JSON.stringify({message: "Your appointment has been booked successfully"}), { status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return new Response(JSON.stringify({error: "An error occurred while booking your appointment"}), { status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}