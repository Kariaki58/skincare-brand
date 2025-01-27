import Image from "next/image";
import image1 from "@/public/product-images/image2.jpg";
import { X } from "lucide-react";

export default function page() {
    return (
        <section>
            <div className="container mx-auto p-4 sm:p-8 min-h-screen">
                <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-6 sm:mb-10">
                    Shopping Cart
                </h1>

                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8">
                    <button className="px-4 py-2 sm:px-6 sm:py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 text-sm sm:text-base">
                    Clear Cart
                    </button>
                    <div className="text-lg sm:text-xl font-semibold text-gray-700 mt-4 sm:mt-0">
                    Total: NGN 0.00
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:gap-8">
                    <div className="flex gap-2 flex-row p-4 sm:p-6 shadow-md rounded-lg">
                    <Image
                        src={image1}
                        alt="Product Name"
                        className="w-40 h-40 object-cover rounded-md"
                    />
                    <div className="ml-0 sm:ml-4 flex-1 mt-4 sm:mt-0">
                        <h2 className="text-xl sm:text-2xl font-medium text-gray-800">Product Name</h2>
                        <p className="text-gray-800">
                        <span>Size:</span> <span className="font-semibold">M</span>
                        </p>
                        <p className="text-gray-800 text-sm">
                        <span>Color:</span> <span className="font-semibold">Blue</span>
                        </p>
                        <div className="mt-4 flex items-center justify-center space-x-2">
                        <button className="px-3 py-2 bg-[#214207] text-white font-bold text-xl rounded-md hover:bg-primary-dark transition-all duration-300 ease-in-out flex items-center justify-center shadow-md transform hover:scale-105">
                            -
                        </button>
                        <span className="px-4 py-2 border border-gray-300 bg-[#214207] text-white rounded-md text-lg font-semibold shadow-sm">
                            1
                        </span>
                        <button className="px-3 py-2 bg-[#214207] text-white font-bold text-xl rounded-md hover:bg-primary-dark transition-all duration-300 ease-in-out flex items-center justify-center shadow-md transform hover:scale-105">
                            +
                        </button>
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                        <p className="text-lg sm:text-xl font-semibold text-gray-800">
                            NGN 0.00
                        </p>
                        <X className="text-red-500 hover:text-red-700 transition duration-300"/>
                        </div>
                    </div>
                    </div>
                </div>

                <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row justify-around items-center gap-4">
                    <button className="px-4 py-2 sm:px-6 sm:py-3 bg-[#214207] text-white rounded-md hover:bg-[#1e310f] transition duration-300 text-sm sm:text-base">
                        Continue Shopping
                    </button>
                    <button className="px-4 py-2 sm:px-6 sm:py-3 bg-[#214207] text-white rounded-md hover:bg-[#1e310f] transition duration-300 text-sm sm:text-base">
                        Proceed to Checkout
                    </button>
                </div>

                <div className="text-center mt-10 sm:mt-20 hidden">
                    <p className="text-xl sm:text-2xl text-gray-700">Your cart is empty.</p>
                    <button className="mt-6 sm:mt-8 px-4 py-2 sm:px-6 sm:py-3 bg-gray-950 text-white rounded-md hover:bg-gray-600 transition duration-300 text-sm sm:text-base">
                        Continue Shopping
                    </button>
                </div>
            </div>
        </section>
    )
}