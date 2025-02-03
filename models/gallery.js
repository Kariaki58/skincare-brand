import mongoose from "mongoose";


const gallerySchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
});

export default mongoose.models.Gallery || mongoose.model("Gallery", gallerySchema);