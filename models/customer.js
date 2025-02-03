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



export default mongoose.models.Customer || mongoose.model('Customer', customerSchema)