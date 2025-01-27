import Image from "next/image";
import image1 from "@/public/product-images/image2.jpg";


const CheckoutUI = () => {
    return (
        <div className="container mx-auto p-4 md:p-8 lg:p-12">
        <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
            <div className="rounded-lg p-6 mb-10 bg-[#214207] text-white shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 border-b pb-2">Order Summary</h2>
            <ul className="space-y-4">
                <li className="flex justify-between items-center border-b pb-2">
                    <Image src={image1} className="h-10 w-10" alt="Product Name" />
                    <span>Quantity x Price</span>
                    <span>Total</span>
                </li>
                {/* Repeat similar items */}
            </ul>
            </div>
            <div>
            <div className="mt-4">
                <h3 className="text-lg font-semibold">Coupon Code</h3>
                <input
                type="text"
                className="border rounded-md py-2 px-3 mt-2 w-full bg-[#214207] text-white focus:ring-2 focus:ring-gray-500 outline-none"
                placeholder="Enter coupon code"
                />
                <button className="mt-3 bg-[#214207] text-white py-2 px-5 rounded-md hover:bg-[#1d330d] transition duration-150">
                Apply Coupon
                </button>
            </div>
            <div className="mt-4">
                <h3 className="text-lg font-semibold">Pick up Location</h3>
                <select
                className="border py-2 px-4 rounded-md w-full bg-[#214207] text-white focus:ring-2 focus:ring-gray-500 outline-none"
                >
                <option value="">Select Location</option>
                <option value="location_placeholder">Location Name</option>
                {/* Additional locations */}
                </select>
            </div>
            <div className="flex justify-between items-center mt-4 pt-4">
                <span className="font-semibold">Shipping Fee:</span>
                <span className="font-semibold">Amount</span>
            </div>
            <div className="flex justify-between items-center mt-2">
                <span className="font-semibold">Discount:</span>
                <span className="font-semibold">%</span>
            </div>
            <div className="flex justify-between items-center mt-2">
                <span className="font-semibold">Total:</span>
                <span className="font-semibold">Total Amount</span>
            </div>
            </div>
        </div>

        <div className="rounded-lg p-6 bg-[#214207] text-white shadow-lg mt-4">
            <h2 className="text-2xl font-semibold mb-6 border-b pb-2">Shipping Details</h2>
            <form>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 mb-8">
                {['name', 'email', 'address', 'city', 'state', 'zip', 'phone', 'country'].map((field) => (
                <div key={field}>
                    <label className="block font-medium text-white">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                    <input
                    type="text"
                    name={field}
                    // value={shippingDetails[field]}
                    // onChange={handleChange}
                    className="w-full border rounded-md py-2 px-3 mt-2 bg-[#214207] focus:ring-2 focus:ring-gray-500 outline-none"
                    required
                    />
                </div>
                ))}
            </div>

            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Select Payment Method</h3>
                <select
                className="border py-2 px-4 rounded-md w-full bg-[#214207] focus:ring-2 focus:ring-gray-500 outline-none"
                >
                    <option value="payStack">PayStack</option>
                </select>
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
