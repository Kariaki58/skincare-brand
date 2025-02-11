import { connectToDatabase } from "@/lib/mongoose";
import Order from "@/models/order";
import Customer from "@/models/customer";
import Product from "@/models/product";


export async function GET() {
    try {
        await connectToDatabase();
        const orders = await Order.find();


        return new Response(JSON.stringify({ orders }), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to fetch orders" }), { status: 500 });
    }
}

export async function POST(request) {
    try {
        await connectToDatabase();
        const { name, email, phone, country, cart } = await request.json();

        
        if (!name ||!email ||!phone ||!country ||!cart) {
            return new Response(JSON.stringify({ error: "All fields are required" }), { status: 400 });
        }

        if (!Array.isArray(cart)) {
            return new Response(JSON.stringify({ error: "Cart must be an array" }), { status: 400 });
        }

        const customer = await Customer.findOne({ $or: [{ email }, { phone }] });

        if (customer) {
            customer.name = name;
            customer.email = email;
            customer.phone = phone;
            await customer.save();
        } else {
            const newCustomer = new Customer({
                email,
                phone,
            });
            await newCustomer.save();
        }

        cart.forEach(async(item) => {
            const { _id, quantity } = item;
            const product = await Product.findById(_id);

            if (!product || product.stock < quantity) {
                return new Response(JSON.stringify({ error: "Invalid product or insufficient stock" }), { status: 400 });
            }

            product.stock -= quantity;
            await product.save();
        })

        const order = new Order({
            name,
            email,
            phone,
            country,
            cart,
        });

        await order.save();

        return new Response(JSON.stringify({ message: "order placed successfully" }), {
            status: 201,
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to place order" }), { status: 500 });
    }
}
