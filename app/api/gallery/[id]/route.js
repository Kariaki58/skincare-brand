import { connectToDatabase } from "@/lib/mongoose";
import Gallery from "@/models/gallery";
import { deleteImage } from "@/lib/cloudinary-upload";
import User from "@/models/user";


export async function DELETE(request, { params }) {
    try {
        await connectToDatabase();
        const { id } = await params;
        const { searchParams } = new URL(request.url)
        const galleryItem = await Gallery.findById(id);

        const userId = searchParams.get("userId");

        if (!userId) {
            return new Response(JSON.stringify({ success: false, message: "User ID is required" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }
        const user = await User.findById(userId);
        if (!user) {
            return new Response(JSON.stringify({ success: false, message: "User not found" }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }

        if (!galleryItem) {
            return new Response(JSON.stringify({ success: false, message: "Image not found" }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }

        const response = await deleteImage(galleryItem.image);

        if (!response) {
            return new Response(JSON.stringify({ success: false, message: "Error deleting image" }), {
                status: 500,
                headers: { "Content-Type": "application/json" },
            });
        }

        await Gallery.findByIdAndDelete(id)

        return new Response(JSON.stringify({ success: true, message: "Image deleted successfully" }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, message: "Failed to delete image" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}