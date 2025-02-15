import { connectToDatabase } from "@/lib/mongoose";
import Booking from "@/models/booking";
import { sendEmail } from "@/actions/sendEmail";
import { generateCustomerAppointmentConfirmationTemplate } from "@/lib/email-template/email-content";


export async function PUT(request, { params }) {
    const { id } = await params;

    console.log(id)

    if (!id) {
        return new Response({ error: "Please provide an id" }, { status: 400 });
    }

    try {
        await connectToDatabase();
        const booking = await Booking.findByIdAndUpdate(id, { isConfirmed: true }, { new: true });
        const { email, selectedDate, selectedSlot } = booking;
        const date = new Date(selectedDate).toLocaleDateString();
        const time = selectedSlot;
        const customerNotify = generateCustomerAppointmentConfirmationTemplate(true, date, time);
        await sendEmail(email, "Appointment Confirmation", customerNotify);
        return new Response(JSON.stringify({ message: "We have changed the status, the client would receive an email."}), { status: 200 });
    } catch (error) {
        return new Response({ error: "An error occurred while updating the appointment" } , { status: 500 });
    }
}
