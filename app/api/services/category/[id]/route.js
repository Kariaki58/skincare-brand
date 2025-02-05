import { connectToDatabase } from "@/lib/mongoose";
import User from "@/models/user";
import ServiceCategory from "@/models/service-category"
import Service from "@/models/service"
import { uploadImage, deleteImage } from "@/lib/cloudinary-upload";

export async function GET(request, { params }) {
    try {
        await connectToDatabase();
        const { id } = await params;
        console.log(id)
        const serviceCategory = await ServiceCategory.findById(id);

        return new Response(JSON.stringify(serviceCategory), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error(error);
        return new Response("Failed to connect to the database", { status: 500 });
    }
}

export async function PUT(request, { params }) {
    try {
        await connectToDatabase();
        const { id } = await params;
        const data = await request.json();


        if (!data.userId) {
            return new Response("User ID is required", { status: 400 });
        }
        const user = await User.findById(data.userId);

        if (!user) {
            return new Response("User not found", { status: 404 });
        }
        if (user.role!== 'admin') {
            return new Response("Unauthorized", { status: 401 });
        }

        if (!data.name) {
            return new Response("Name is required", { status: 400 });
        }
        if (!data.subHeading) {
            return new Response("Description is required", { status: 400 });
        }
        if (!data.description) {
            return new Response("Icon is required", { status: 400 });
        }
        const serviceCategory = await ServiceCategory.findByIdAndUpdate(id, data, { new: true });

        return new Response(JSON.stringify(serviceCategory), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error(error);
        return new Response("Failed to connect to the database", { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        await connectToDatabase();
        const { id } = await params;

        console.log(id)

        if (!id) {
            return new Response("Service category ID is required", { status: 400 });
        }

        const service = await Service.find({ categoryId: id });

        if (service.length <= 0) {
            return new Response("Service category not found", { status: 404 });
        }
        await Promise.all(service.map(async (service) => {
            if (service.image) {
                await deleteImage(service.image);
            }
        }));

        service.forEach(async (service) => {
            await Service.findByIdAndDelete(service._id);
        });

        await ServiceCategory.findByIdAndDelete(id);


        return new Response("service", { status: 200 })


        const data = await request.json();

        if (!data.userId) {
            return new Response("User ID is required", { status: 400 });
        }
        const user = await User.findById(data.userId);

        if (!user) {
            return new Response("User not found", { status: 404 });
        }
        if (user.role!== 'admin') {
            return new Response("Unauthorized", { status: 401 });
        }

        const serviceCategory = await ServiceCategory.findByIdAndDelete(id);

        return new Response(JSON.stringify(serviceCategory), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error(error);
        return new Response("Failed to connect to the database", { status: 500 });
    }
}