import { connectToDatabase } from "@/lib/mongoose";
import Service from "@/models/service";
import User from "@/models/user";



export async function GET(request, { params }) {
    try {
        await connectToDatabase();
        const { id } = await params;

        if (!id) {
            return Response.json({ message: "Please provide a service ID" }, { status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        
        const services = await Service.findById(id);

        return Response.json(services, { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch(error) {
        return Response.json({ message: "Failed to fetch services" }, { status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

export async function PUT(request, { params }) {
    try {
        await connectToDatabase();
        const { id } = await params;
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

        const updatedService = await Service.findByIdAndUpdate(id, { name, price }, { new: true });

        return Response.json(updatedService, { status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch(error) {
        return Response.json({ message: "Failed to update service" }, { status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

export async function DELETE(request, { params }) {
    try {
        await connectToDatabase();
        const { id } = await params;
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return new Response(JSON.stringify({ success: false, message: "User ID is required" }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        const user = await User.findById(userId);
        if (!user) {
            return new Response(JSON.stringify({ success: false, message: "User not found" }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        if (user.role!== "admin") {
            return new Response(JSON.stringify({ success: false, message: "Unauthorized" }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        await Service.findByIdAndDelete(id);

        return Response.json({ message: "Service deleted" }, { status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch(error) {
        return Response.json({ message: "Failed to delete service" }, { status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}