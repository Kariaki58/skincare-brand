import { connectToDatabase } from "@/lib/mongoose";
import Service from "@/models/service";
import ServiceCategory from "@/models/service-category"
import User from "@/models/user";
import { uploadImage, deleteImage } from "@/lib/cloudinary-upload";


export async function GET(request, { params }) {
    try {
        await connectToDatabase();
        const { id } = await params;
        const service = await Service.findById(id).populate("categoryId");

        if (!service) {
            return new Response("Service not found", { status: 404 });
        }
        return new Response(JSON.stringify(service), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response("Failed to connect to the database", { status: 500 });
    }
}

export async function PUT(request, { params }) {
    try {
        await connectToDatabase();
        const { id } = await params;
        const content = await request.formData();
        const user = await User.findById(content.get("userId"));

        if (!user) {
            return new Response(JSON.stringify({ error: "User not found" }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        if (user.role!== 'admin') {
            return new Response(JSON.stringify({ error: "Unauthorized" }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        if (!content.has("name") || !content.has("price") || !content.has("duration") || !content.has("description") || !content.has("image")) {
            return new Response(JSON.stringify({ error: "Missing required fields" }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        

        if (!content.get("category")) {
            return new Response(JSON.stringify({ error: "Category not found" }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        console.log(content.get("category"))

        const category = await ServiceCategory.findOne({ name: content.get("category")});
        console.log(category)
        if (!category) {
            return new Response(JSON.stringify({ error: "Category not found" }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const service = await Service.findById(id)
        if (!service) {
            return new Response("Service not found", { status: 404 });
        }
        let image = content.get("image");
        console.log(image)

        if (!content.get("image") || typeof content.get("image") !== "string" || !content.get("image").startsWith("http")) {
            const file = content.get("image");
            const arrayBuffer = await file.arrayBuffer();
            const buffer = new Uint8Array(arrayBuffer);

            const uploadResult = await uploadImage(buffer);
            image = uploadResult.secure_url;
            if (!image) {
                return new Response("Failed to upload image", { status: 500 });
            }
            if (service.image) {
                await deleteImage(service.image);
            }
        }

        if (!image) {
            return new Response("Failed to upload image", { status: 500 });
        }
        await Service.findByIdAndUpdate(id, {
            name: content.get("name"),
            description: content.get("description"),
            duration: parseFloat(content.get("duration")),
            image,
            price: parseFloat(content.get("price")),
            categoryId: category._id,
        }, { new: true });

        return new Response(JSON.stringify(service), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response("Failed to connect to the database", { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        await connectToDatabase();
        const { id } = await params;
        const data = await request.json();

        if (!id) {
            return new Response("Missing id", { status: 400 });
        }
        if (!data.userId) {
            return new Response("Missing userId", { status: 400 });
        }
        const user = await User.findById(data.userId);
        if (!user) {
            return new Response(JSON.stringify({ error: "User not found" }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        if (user.role !== 'admin') {
            return new Response(JSON.stringify({ error: "Unauthorized" }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        const service = await Service.findById(id);
        if (!service) {
            return new Response("Service not found", { status: 404 });
        }
        if (service.image) {
            await deleteImage(service.image);
        }

        await Service.findByIdAndDelete(id);
        
        return new Response("Service deleted", { status: 200 });
    }
    catch (error) {
        console.error(error);
        return new Response("Failed to connect to the database", { status: 500 });
    }
}
