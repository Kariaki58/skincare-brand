import { connectToDatabase } from "@/lib/mongoose";
import Booking from "@/models/booking";
import User from "@/models/user";
import { sendEmail } from "@/actions/sendEmail";
import { generateCustomerAppointmentConfirmationTemplate } from "@/lib/email-template/email-content";
import { revalidatePath } from 'next/cache'


export async function PUT(request, { params }) {
    const { id } = await params;
    const { userId } = await request.json()

    if (!id) {
        return new Response(JSON.stringify({ error: "Please provide an id" }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    if (!userId) {
        return new Response(JSON.stringify({ error: "User ID is required" }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        await connectToDatabase();
        const user = await User.findById(userId);
        if (!user) {
            return new Response(JSON.stringify({ error: "User not found" }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        if (user.role !== "admin") {
            return new Response(JSON.stringify({ error: "Unauthorized" }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        const booking = await Booking.findByIdAndUpdate(
            id, 
            { isConfirmed: true, isCancelled: false },
            { new: true }
        );
        if (!booking) {
            return new Response(JSON.stringify({ error: "Booking not found" }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        const { email, selectedDate, selectedSlot } = booking;
        const date = new Date(selectedDate).toLocaleDateString();
        const time = selectedSlot;
        const customerNotify = generateCustomerAppointmentConfirmationTemplate(true, date, time);

        await sendEmail(email, "Appointment Confirmation", customerNotify);
        revalidatePath('/dashboard/admin/bookings');

        return new Response(JSON.stringify({ message: "We have changed the status, the client would receive an email."}), { status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "An error occurred while updating the appointment" }) , { status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
