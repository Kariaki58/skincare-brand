import { connectToDatabase } from "@/lib/mongoose";
import User from "@/models/user";
import Product from "@/models/product";
import { uploadImage } from "@/lib/cloudinary-upload";

export async function POST(request) {
    try {
        await connectToDatabase();
        const content = await request.formData();
        const user = await User.findById(content.get("userId"));


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
        if (!content.has("name") ||!content.has("price") ||!content.has("basePrice") ||!content.has("stock") ||!content.has("image") ||!content.has("category") ||!content.has("description") ||!content.has("additionalInfo")) {
            return new Response(JSON.stringify({ error: "Missing required fields" }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        if (content.get("name") === "" || content.get("price") === "" || content.get("basePrice") === "" || content.get("stock") === "" || content.get("image") === "" || content.get("category") === "" || content.get("description") === "" || content.get("additionalInfo") === "") {
            return new Response(JSON.stringify({ error: "Missing required fields" }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        if (parseFloat(content.get("stock")) < 0 || parseFloat(content.get("price")) < 0 || parseFloat(content.get("basePrice")) < 0) {
            return new Response(JSON.stringify({ error: "Invalid price or base price or stock" }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        if (parseFloat(content.get("price")) < parseFloat(content.get("basePrice"))) {
            return new Response(JSON.stringify({ error: "Base price must be less than or equal to price" }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        if (content.get("stock") < 0 || content.get("price") < 0 || content.get("basePrice") < 0) {
            return new Response(JSON.stringify({ error: "Invalid price or base price or stock" }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        if (isNaN(parseFloat(content.get("price"))) || isNaN(parseFloat(content.get("basePrice"))) || isNaN(parseInt(content.get("stock")))) {
            return new Response(JSON.stringify({ error: "Invalid price or stock" }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        const file = content.get("image");
        const arrayBuffer = await file.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer);
        const image = await uploadImage(buffer);
        if (!image) {
            return new Response(JSON.stringify({ error: "Error uploading image" }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        await Product.create({
            userId: content.get("userId"),
            name: content.get("name"),
            price: parseFloat(content.get("price")),
            basePrice: parseFloat(content.get("basePrice")),
            stock: parseInt(content.get("stock")),
            image: image.secure_url,
            category: content.get("category"),
            description: content.get("description"),
            additionalInfo: JSON.parse(content.get("additionalInfo")),
        });

        // Your logic here
        return new Response(JSON.stringify({ message: "Product uploaded successfully" }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Error uploading product" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
