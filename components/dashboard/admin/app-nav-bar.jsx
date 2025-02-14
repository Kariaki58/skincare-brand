import { DatePickerWithRange } from "./date-picker";
import { Bell, Search } from "lucide-react";


export default function AppNavBar() {
    return (
        <nav className="bg-white p-4 shadow-md flex flex-wrap items-center justify-between border border-gray-200">
            {/* Left Section */}
            <div className="flex items-center gap-4 w-full lg:w-auto">
                <h1 className="font-bold text-xl lg:text-2xl text-gray-900">Overview</h1>
                {/* <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg border border-gray-300 w-full lg:w-auto">
                    <DatePickerWithRange className="w-full outline-none border-none shadow-none text-gray-700" />
                </div> */}
            </div>

            {/* Right Section */}
            {/* <div className="flex items-center gap-5 w-full lg:w-auto mt-4 lg:mt-0">
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg border border-gray-300 flex-grow lg:flex-grow-0">
                    <Search size={20} className="text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search"
                        className="p-2 text-sm bg-transparent outline-none border-none placeholder-gray-400 w-full"
                    />
                </div>

                <div className="relative cursor-pointer">
                    <Bell size={28} className="text-gray-600 hover:text-gray-900 transition-colors duration-200" />
                    <span className="absolute bg-red-500 text-white text-xs font-medium px-2 py-0.5 rounded-full -top-2 right-0 shadow-sm">
                        3316
                    </span>
                </div>
            </div> */}
        </nav>
    );
}
