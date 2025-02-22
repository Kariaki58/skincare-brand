import { connectToDatabase } from "@/lib/mongoose";
import Service from "@/models/service";
import User from "@/models/user";


export async function GET(request) {
    try {
        await connectToDatabase();
        const services = await Service.find({});

        return Response.json(services, { status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch(error) {
        return Response.json({ message: "Failed to fetch services" }, { status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

export async function POST(request) {
    try {
        await connectToDatabase();
        const { name, price, userId } = await request.json();

        if (!name || !price) {
            return Response.json({ message: "Please fill in all fields" }, { status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        if (!userId) {
            return Response.json({ message: "Please provide a user ID" }, { status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const user = await User.findById(userId);
        if (!user) {
            return Response.json({ message: "User not found" }, { status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        if (user.role!== "admin") {
            return Response.json({ message: "Unauthorized" }, { status: 401,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const newService = new Service({ name, price });
        await newService.save();

        return Response.json(newService, { status: 201,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch(error) {
        return Response.json({ message: "Failed to create service" }, { status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}