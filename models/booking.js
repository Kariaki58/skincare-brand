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
        isConfirmed: {
            type: Boolean,
            default: false
        },
        isCancelled: {
            type: Boolean,
            default: false
        },
        services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
    },
    { timestamps: true }
);

bookingSchema.index({ selectedDate: 1, selectedSlot: 1 });

const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);

export default Booking;
