"use client";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import useCartStore from "@/store/cartStore";


export default function Cart() {
    const { cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = useCartStore();
    const [totalAmount, setTotalAmount] = useState(0);


    useEffect(() => {
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setTotalAmount(total);
    }, [cart]);

    const handleRemoveFromCart = (productId) => {
        removeFromCart(productId);
    };

    const handleIncreaseQuantity = (productId) => {
        increaseQuantity(productId);
    };

    const handleDecreaseQuantity = (productId) => {
        decreaseQuantity(productId);
    };

    const handleClearCart = () => {
        clearCart();
    };

    return (
        <div className="container mx-auto p-4 sm:p-8 min-h-screen">
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-6 sm:mb-10">
                Shopping Cart
            </h1>

            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8">
                <button
                    onClick={handleClearCart}
                    className="px-4 py-2 sm:px-6 sm:py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 text-sm sm:text-base"
                >
                    Clear Cart
                </button>
                <div className="text-lg sm:text-xl font-semibold text-gray-700 mt-4 sm:mt-0">
                    Total: ${totalAmount.toFixed(2)}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:gap-8">
                {/* Cart Items */}
                {cart.map((item) => (
                    <div key={`${item._id}-${item.name}`} className="flex gap-2 flex-row p-4 sm:p-6 shadow-md rounded-lg">
                        <Image
                            src={item.image}
                            alt={item.name}
                            width={100}
                            height={100}
                            className="w-40 h-40 object-cover rounded-md"
                        />
                        <div className="ml-0 sm:ml-4 flex-1 mt-4 sm:mt-0">
                            <h2 className="text-xl sm:text-2xl font-medium text-gray-800">{item.name}</h2>
                            <div className="mt-4 flex items-center justify-center space-x-2">
                                <button
                                    onClick={() => handleDecreaseQuantity(item._id)}
                                    className="px-3 py-2 bg-[#214207] text-white font-bold text-xl rounded-md hover:bg-primary-dark transition-all duration-300 ease-in-out flex items-center justify-center shadow-md transform hover:scale-105"
                                >
                                    -
                                </button>
                                <span className="px-4 py-2 border border-gray-300 bg-[#214207] text-white rounded-md text-lg font-semibold shadow-sm">
                                    {item.quantity}
                                </span>
                                <button
                                    onClick={() => handleIncreaseQuantity(item._id)}
                                    className="px-3 py-2 bg-[#214207] text-white font-bold text-xl rounded-md hover:bg-primary-dark transition-all duration-300 ease-in-out flex items-center justify-center shadow-md transform hover:scale-105"
                                >
                                    +
                                </button>
                            </div>
                            <div className="mt-4 flex justify-between items-center">
                                <p className="text-lg sm:text-xl font-semibold text-gray-800">
                                    ${item.price.toFixed(2)}
                                </p>
                                <X
                                    onClick={() => handleRemoveFromCart(item._id)}
                                    className="text-red-500 hover:text-red-700 transition duration-300 cursor-pointer"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {
                cart.length > 0 && (
                    <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row justify-around items-center gap-4">
                        <Link href="/shop">
                            <button className="px-4 py-2 sm:px-6 sm:py-3 bg-[#214207] text-white rounded-md hover:bg-[#1e310f] transition duration-300 text-sm sm:text-base">
                                    Continue Shopping
                            </button>
                        </Link>
                        <Link href="/checkout">
                            <button
                                className="px-4 py-2 sm:px-6 sm:py-3 bg-[#214207] text-white rounded-md hover:bg-[#1e310f] transition duration-300 text-sm sm:text-base"
                            >
                                    Proceed to Checkout
                            </button>
                        </Link>
                    </div>
                )
            }
            <div className={`text-center mt-10 sm:mt-20 ${cart.length === 0 ? '' : 'hidden'}`}>
                <p className="text-xl sm:text-2xl text-gray-700">Your cart is empty.</p>
                <button className="mt-6 sm:mt-8 px-4 py-2 sm:px-6 sm:py-3 bg-gray-950 text-white rounded-md hover:bg-gray-600 transition duration-300 text-sm sm:text-base">
                    <Link href="/shop">
                        Continue Shopping
                    </Link>
                </button>
            </div>
        </div>
    );
}
