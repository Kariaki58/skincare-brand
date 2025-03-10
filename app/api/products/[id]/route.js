import { connectToDatabase } from "@/lib/mongoose";
import User from "@/models/user";
import Product from "@/models/product";
import Category from "@/models/category";
import Review from "@/models/review";
import { uploadImage, deleteImage } from "@/lib/cloudinary-upload";


export async function GET(request,  { params }) {
    try {
        await connectToDatabase();
        const { id } = await params;

        if (!id) {
            return new Response(JSON.stringify({ error: "Missing product ID" }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }


        const product = await Product.findById(id).populate('category').populate('reviews').exec();
        
        return new Response(JSON.stringify(product), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "An error occurred" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export async function PUT(request, { params }) {
    try {
        await connectToDatabase();
        const { id } = await params;
        const content = await request.formData();
        const user = await User.findById(content.get("userId"));

        if (!id) {
            return new Response(JSON.stringify({ error: "Missing product ID" }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }
        if (!user) {
            return new Response(JSON.stringify({ error: "User not found" }), { status: 404, headers: { 'Content-Type': 'application/json' } });
        }
        if (user.role !== 'admin') {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { 'Content-Type': 'application/json' } });
        }

        if (
            !content.has("name") ||
            !content.has("basePrice") ||
            !content.has("stock") ||
            !content.has("image") ||
            !content.has("category") ||
            !content.has("description")
            // !content.has("additionalInfo")
        ) {
            return new Response(JSON.stringify({ error: "Missing required fields" }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        if (
            content.get("name") === "" || 
            content.get("basePrice") === "" || 
            content.get("stock") === "" || 
            content.get("image") === "" || 
            content.get("category") === "" || 
            content.get("description") === ""
            // content.get("additionalInfo") === ""
        ) {
            return new Response(JSON.stringify({ error: "Missing required fields" }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        if (parseFloat(content.get("stock")) < 0 || parseFloat(content.get("basePrice")) < 0) {
            return new Response(JSON.stringify({ error: "Invalid price or base price or stock" }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        if (content.get("stock") < 0 || content.get("basePrice") < 0) {
            return new Response(JSON.stringify({ error: "Invalid price or base price or stock" }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        if (isNaN(parseFloat(content.get("basePrice"))) || isNaN(parseInt(content.get("stock")))) {
            return new Response(JSON.stringify({ error: "Invalid price or stock" }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        let imageUrl = content.get("image");

        const product = await Product.findById(id);
        
        if (!product) {
            return new Response(JSON.stringify({ error: "Product not found" }), { status: 404, headers: { 'Content-Type': 'application/json' } });
        }
        let category = await Category.findByIdAndUpdate(product.category, { name: content.get("category") }, { new: true });

        if (!imageUrl || typeof imageUrl !== "string" || !imageUrl.startsWith("http")) {
            const file = content.get("image");
            if (file && file instanceof Blob) {
                const arrayBuffer = await file.arrayBuffer();
                const buffer = new Uint8Array(arrayBuffer);
                const uploadResult = await uploadImage(buffer);
                imageUrl = uploadResult.secure_url;


                if (!imageUrl) {
                    return new Response(JSON.stringify({ error: "Error uploading image" }), {
                        status: 500,
                        headers: { "Content-Type": "application/json" },
                    });
                }
                if (product.image) {
                    await deleteImage(product.image);
                }
            } else {
                imageUrl = product.image;
            }
        }
        

        const updatedProduct = await Product.findByIdAndUpdate(id, {
            name: content.get("name"),
            basePrice: parseFloat(content.get("basePrice")),
            stock: parseInt(content.get("stock")),
            image: imageUrl,
            category: category._id,
            description: content.get("description"),
            // additionalInfo: JSON.parse(content.get("additionalInfo")),
        }, { new: true }).populate('category');

        return new Response(JSON.stringify(updatedProduct), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        return new Response(JSON.stringify({ error: "An error occurred" }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}

export async function DELETE(request, { params }) {
    try {
        await connectToDatabase();
        const { id } = await params;
        const data = await request.json();
        if (!data) {
            return new Response(JSON.stringify({ error: "Missing request body" }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        if (!data?.userId) {
            return new Response(JSON.stringify({ error: "Missing userId in request body" }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        const user = await User.findById(data.userId);

        if (!id) {
            return new Response(JSON.stringify({ error: "Missing product ID" }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }
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

        const product = await Product.findById(id);
        if (!product) {
            return new Response(JSON.stringify({ error: "Product not found" }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const categoryId = product.category;
        await deleteImage(product.image);
        await Product.findByIdAndDelete(id);

        const productsInCategory = await Product.find({ category: categoryId });

        if (productsInCategory.length === 0) {
            await Category.findByIdAndDelete(categoryId);
        }

        return new Response(JSON.stringify({ message: "Product and associated category deleted successfully" }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: "An error occurred" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
