import { connectToDatabase } from "@/lib/mongoose";
import User from "@/models/user";
import Service from "@/models/service";
import ServiceCategory from "@/models/service-category";
import { uploadImage } from "@/lib/cloudinary-upload";


export async function GET(request) {
    try {
        await connectToDatabase();
        const services = await Service.find({}).populate("categoryId").exec();

        return new Response(JSON.stringify(services), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Failed to fetch services" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export async function POST(request) {
    try {
        await connectToDatabase();
        const content = await request.formData();
        const user = await User.findById(content.get("userId"));

        console.log(content);

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
            console.log("line 49")
            return new Response(JSON.stringify({ error: "Missing required fields" }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const file = content.get("image");
        const arrayBuffer = await file.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer);

        const image = await uploadImage(buffer);

        let categoryId
        if (content.get("newCategory")) {
            if (!content.has("categoryName") || !content.has("categorySubheading") || !content.has("categoryDescription")) {
                console.log("line 64")
                return new Response(JSON.stringify({ error: "Missing required fields" }), {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                });
            }
            categoryId = await ServiceCategory.create({
                name: content.get("categoryName"),
                subHeading: content.get("categorySubheading"),
                description: content.get("categoryDescription"),
            })
        } else {
            if (!content.has("category")) {
                return new Response(JSON.stringify({ error: "Missing required fields" }), {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                });
            }
            const response = await ServiceCategory.findOne({ name: content.get("category") });
            if (!response) {
                return new Response(JSON.stringify({ error: "Category not found" }), {
                    status: 404,
                    headers: { 'Content-Type': 'application/json' },
                });
            }
            categoryId = response._id;
        }

        await Service.create({
            name: content.get("name"),
            description: content.get("description"),
            duration: content.get("duration"),
            price: content.get("price"),
            image: image.url,
            categoryId: categoryId
        });

        return new Response(JSON.stringify({ message: "services added." }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}