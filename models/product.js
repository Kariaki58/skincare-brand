import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    basePrice: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    // additionalInfo: {
    //     type: Object,
    // },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }]
}, {
    timestamps: true,
});



export default mongoose.models.Product || mongoose.model("Product", productSchema);
