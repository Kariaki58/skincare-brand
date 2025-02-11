import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
    },
    bookings: {
        type: Number,
        default: 0,
    }
}, {
    timestamps: true
});

customerSchema.index({ email: 1, phone: 1 });



export default mongoose.models.Customer || mongoose.model('Customer', customerSchema)