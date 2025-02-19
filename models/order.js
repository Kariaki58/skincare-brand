import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        cart: {
            type: Array,
            required: true,
        },

    },{
        timestamps: true
})

orderSchema.index({ email: 1, phone: 1 });


export default mongoose.models.Order || mongoose.model('Order', orderSchema)
