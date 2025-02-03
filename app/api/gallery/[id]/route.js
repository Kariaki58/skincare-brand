import { connectToDatabase } from "@/lib/mongoose";
import Gallery from "@/models/gallery";
import { deleteImage } from "@/lib/cloudinary-upload";


export async function DELETE(request, { params }) {
    try {
        await connectToDatabase();
        const { id } = await params;
        const galleryItem = await Gallery.findById(id);

        if (!galleryItem) {
            return new Response(JSON.stringify({ success: false, message: "Image not found" }), {
                status: 404,
            });
        }

        const response = await deleteImage(galleryItem.image);

        if (!response) {
            return new Response(JSON.stringify({ success: false, message: "Error deleting image" }), {
                status: 500,
            });
        }

        await Gallery.findByIdAndDelete(id)

        return new Response(JSON.stringify({ success: true, message: "Image deleted successfully" }), {
            status: 200,
        });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ success: false, message: "Failed to delete image" }), {
            status: 500,
        });
    }
}