import { connectToDatabase } from "@/lib/mongoose";
import Booking from "@/models/booking";
import Service from "@/models/service";
import Customer from "@/models/customer";
import { sendEmail } from "@/actions/sendEmail";
import { generateSellerAppointmentNotificationTemplate, generateSellerDepositRequestTemplate } from "@/lib/email-template/email-content";



export async function GET(request) {
    try {
        await connectToDatabase();
        const bookings = await Booking.find().sort({ selectedDate: 1 });
        return new Response(JSON.stringify(bookings), { status: 200 });
    } catch (error) {
        return new Response("An error occurred while fetching appointments", { status: 500 });
    }
}

export async function POST(request) {
    const { name, email, phone, date, time, message, street, addressLine2, city, state, postalCode, country, services } = await request.json();
    if (!name || !email || !phone || !date || !time || !message 
        || !street || !city || !state || !postalCode || !country 
        || !services) {
        return new Response("Please fill in all required fields", { status: 400 });
    }

    console.log({ name, email, phone, date, time, message, street, addressLine2, city, state, postalCode, country, services });

    try {
        await connectToDatabase();
        const serviceIds = services.map(service => service._id);
        const serviceDocs = await Service.find({ _id: { $in: serviceIds } });
        const totalCost = serviceDocs.reduce((acc, service) => acc + service.price, 0);

        if (serviceDocs.length !== serviceIds.length) {
            return new Response("One or more services do not exist", { status: 400 });
        }
        
        const existingBooking = await Booking.findOne({ email, selectedDate: new Date(date) })

        if (existingBooking) {
            return new Response("You have already booked an appointment for that date", { status: 400 });
        }

        await Customer.findOneAndUpdate(
            { email },
            { 
                $inc: { bookings: 1 }, 
                $set: { email, name, phone } 
            },
            { new: true }
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

        return new Response("Your appointment has been booked successfully", { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response("An error occurred while booking your appointment", { status: 500 });
    }
}