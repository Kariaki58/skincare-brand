"use client";

import Image from "next/image";
import useCartStore from "@/store/cartStore";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";


const schema = z.object({
    name: z.string().min(3, "Name is required"),
    email: z.string().email("Invalid email format"),
    phone: z.string().min(6, "Phone number is required"),
    country: z.string().min(3, "Country is required"),
});

const CheckoutUI = () => {
    const { cart, clearCart } = useCartStore();
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({ resolver: zodResolver(schema) });
    const {toast} = useToast();

    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleOrders = async (data) => {
        const response = await fetch("/api/order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...data, cart }),
        });
        if (!response.ok) {
            toast({
                title: "Order failed",
                description: "Failed to place order. Please try again later.",
                variant: "destructive",
            });
            return;
        } else {
            toast({
                title: "Order placed successfully!",
                description: "We would call you once your order is ready for pickup.",
                variant: "success",
            });
        }
        setTimeout(() => {
            clearCart();
            reset();
            router.push("/");
        }, 2000);
    };

    return (
        <div className="container mx-auto p-4 md:p-8 lg:p-12">
            <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
                <div className="rounded-lg p-6 mb-10 bg-[#214207] text-white shadow-lg">
                    <h2 className="text-2xl font-semibold mb-6 border-b pb-2">Order Summary</h2>
                    {cart.length === 0 ? (
                        <p className="text-center">No items in cart</p>
                    ) : (
                        <ul className="space-y-4">
                            {cart.map((item) => (
                                <li key={item._id} className="flex justify-between items-center border-b pb-2">
                                    <Image src={item.image} width={50} height={50} className="h-10 w-10" alt={item.name} />
                                    <span>{item.quantity} x ${item.price}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div>
                    <div className="rounded-lg p-6 bg-[#214207] text-white shadow-lg mt-4">
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold">Pick up Location</h3>
                            <p>5811 Freedom Drive, Charlotte, NC 28214</p>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                            <span className="font-semibold">Total:</span>
                            <span className="font-semibold">${totalAmount.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="rounded-lg p-6 bg-[#214207] text-white shadow-lg mt-4">
                <h2 className="text-2xl font-semibold mb-6 border-b pb-2">Fill In Details</h2>
                <form onSubmit={handleSubmit(handleOrders)}>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 mb-8">
                        {["name", "email", "phone", "country"].map((field) => (
                            <div key={field}>
                                <label className="block font-medium text-white">
                                    {field.charAt(0).toUpperCase() + field.slice(1)}
                                </label>
                                <input
                                    type="text"
                                    {...register(field)}
                                    className="w-full border rounded-md py-2 px-3 mt-2 bg-[#214207] focus:ring-2 focus:ring-gray-500 outline-none"
                                />
                                {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]?.message}</p>}
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="bg-[#37700b] shadow-xl text-white py-2 px-4 rounded-md hover:bg-[#27460f] transition duration-150"
                        >
                            Place Order
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CheckoutUI;
