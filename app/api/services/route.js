import { connectToDatabase } from "@/lib/mongoose";
import Service from "@/models/service";


export async function GET(request) {
    try {
        await connectToDatabase();
        const services = await Service.find({});

        return Response.json(services, { status: 200 });
    } catch(error) {
        return Response.json({ message: "Failed to fetch services" }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await connectToDatabase();
        const { name, price } = await request.json();

        if (!name || !price) {
            return Response.json({ message: "Please fill in all fields" }, { status: 400 });
        }

        const newService = new Service({ name, price });
        await newService.save();

        return Response.json(newService, { status: 201 });
    } catch(error) {
        return Response.json({ message: "Failed to create service" }, { status: 500 });
    }
}