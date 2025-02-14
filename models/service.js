import mongoose from "mongoose";


const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});


export default mongoose.models.Service || mongoose.model("Service", serviceSchema);
