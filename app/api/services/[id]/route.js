import { connectToDatabase } from "@/lib/mongoose";
import Service from "@/models/service";



export async function GET(request, { params }) {
    try {
        await connectToDatabase();
        const { id } = await params;

        if (!id) {
            return Response.json({ message: "Please provide a service ID" }, { status: 400 });
        }
        
        const services = await Service.findById(id);

        return Response.json(services, { status: 200 });
    } catch(error) {
        return Response.json({ message: "Failed to fetch services" }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    try {
        await connectToDatabase();
        const { id } = await params;
        const { name, price } = await request.json();

        if (!name || !price) {
            return Response.json({ message: "Please fill in all fields" }, { status: 400 });
        }

        const updatedService = await Service.findByIdAndUpdate(id, { name, price }, { new: true });

        return Response.json(updatedService, { status: 200 });
    } catch(error) {
        return Response.json({ message: "Failed to update service" }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        await connectToDatabase();
        const { id } = await params;

        await Service.findByIdAndDelete(id);

        return Response.json({ message: "Service deleted" }, { status: 200 });
    } catch(error) {
        return Response.json({ message: "Failed to delete service" }, { status: 500 });
    }
}