import { DatePickerWithRange } from "./date-picker";
import { Bell, Search } from "lucide-react";
import Image from "next/image";
import profile from "@/public/gallery/cute-photo-1.jpg";


export default function AppNavBar() {
    return (
        <nav className="bg-white p-4 shadow-md flex flex-wrap items-center justify-between rounded-xl border border-gray-200">
            {/* Left Section */}
            <div className="flex items-center gap-4 w-full lg:w-auto">
                <h1 className="font-bold text-xl lg:text-2xl text-gray-900">Overview</h1>
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg border border-gray-300 w-full lg:w-auto">
                    <DatePickerWithRange className="w-full outline-none border-none shadow-none text-gray-700" />
                </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4 w-full lg:w-auto mt-4 lg:mt-0">
                {/* Search Box */}
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg border border-gray-300 flex-grow lg:flex-grow-0">
                    <Search size={20} className="text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search"
                        className="p-2 text-sm bg-transparent outline-none border-none placeholder-gray-400 w-full"
                    />
                </div>

                {/* Notifications Icon */}
                <div className="relative cursor-pointer">
                    <Bell size={28} className="text-gray-600 hover:text-gray-900 transition-colors duration-200" />
                    <span className="absolute bg-red-500 text-white text-xs font-medium px-2 py-0.5 rounded-full -top-2 right-0 shadow-sm">
                        3316
                    </span>
                </div>

                {/* Profile Section */}
                <div className="flex items-center gap-2 cursor-pointer">
                    <div className="w-10 h-10 rounded-full border border-gray-300 relative">
                        <Image
                            src={profile}
                            alt="Profile"
                            fill={true}
                            className="rounded-full object-cover"
                            priority
                        />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-700">John Doe Hello world</p>
                        <p className="text-xs text-gray-500">Admin</p>
                    </div>
                </div>
            </div>
        </nav>
    );
}
