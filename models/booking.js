import mongoose from 'mongoose';


const bookingSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        additionalInfo: {
            type: String
        },
        selectedDate: {
            type: Date,
            required: true
        },
        selectedSlot: {
            type: String,
            required: true
        },
        services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
    },
    { timestamps: true }
);

const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);

export default Booking;
