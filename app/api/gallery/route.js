import { connectToDatabase } from "@/lib/mongoose";
import Gallery from "@/models/gallery";
import { uploadImage } from "@/lib/cloudinary-upload";
import { revalidatePath } from "next/cache"; 

export async function GET(request) {
    try {
        await connectToDatabase();

        // Get query parameters for pagination (page number and limit)
        const url = new URL(request.url);
        
        const page = parseInt(url.searchParams.get('page')) || 1;  // Default to page 1 if not provided
        const limit = parseInt(url.searchParams.get('limit')) || 3;  // Default to 10 items per page if not provided

        // Calculate the number of items to skip based on the page number
        const skip = (page - 1) * limit;

        // Fetch gallery items with pagination
        const gallery = await Gallery.find({})
            .skip(skip)   // Skip items based on the page number
            .limit(limit) // Limit the number of items per page
            .exec();

        // Fetch total count of items for pagination metadata
        const totalItems = await Gallery.countDocuments();

        // Calculate total number of pages
        const totalPages = Math.ceil(totalItems / limit);

        // Respond with the gallery data and pagination metadata
        return new Response(
            JSON.stringify({
                gallery,
                pagination: {
                    currentPage: page,
                    totalPages: totalPages,
                    totalItems: totalItems,
                    itemsPerPage: limit,
                },
            }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            }
        );
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


        const galleryItem = new Gallery({
            image: responsedUpload.secure_url,
        });

        await galleryItem.save();
        revalidatePath("/dashboard/admin/gallery");
        return new Response(JSON.stringify({ success: true, message: "Image uploaded successfully" }), {
            status: 201,
        });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, message: "Failed to upload image" }), {
            status: 500,
        });
    }
}
