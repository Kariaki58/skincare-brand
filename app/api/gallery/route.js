import { connectToDatabase } from "@/lib/mongoose";
import Gallery from "@/models/gallery";
import { uploadImage } from "@/lib/cloudinary-upload";
import { revalidatePath } from "next/cache"; 

export async function GET(request) {
    try {
        await connectToDatabase();
        const gallery = await Gallery.find({}).exec();

        return new Response(JSON.stringify(gallery), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}



export async function POST(request) {
    try {
        await connectToDatabase();
        const image = await request.formData();


        if (!image) {
            return new Response(JSON.stringify({ success: false, message: "Image is required" }), {
                status: 400,
            });
        }
        const file = image.get("image");

        if (!file) {
            return new Response(JSON.stringify({ success: false, message: "Image is required" }), {
                status: 400,
            });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer);
        const responsedUpload = await uploadImage(buffer);

        if (!responsedUpload) {
            return new Response(JSON.stringify({ success: false, message: "Error uploading image" }), {
                status: 500,
            });
        }

        console.log(responsedUpload.secure_url)

        const galleryItem = new Gallery({
            image: responsedUpload.secure_url,
        });

        await galleryItem.save();
        revalidatePath("/dashboard/admin/gallery");
        return new Response(JSON.stringify({ success: true, message: "Image uploaded successfully" }), {
            status: 201,
        });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ success: false, message: "Failed to upload image" }), {
            status: 500,
        });
    }
}
