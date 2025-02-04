import mongoose from "mongoose";


const ServiceCategory = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    subHeading: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

export default mongoose.models.ServiceCategory || mongoose.model("ServiceCategory", ServiceCategory);