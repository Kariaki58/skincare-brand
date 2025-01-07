import { DatePickerWithRange } from "./date-picker";
import { Bell, Search } from "lucide-react";

export default function AppNavBar() {
    return (
        <nav className="bg-gray-50 p-4 shadow-md flex justify-between rounded-xl">
            <div className="flex items-center gap-4">
                <h1 className="font-bold text-2xl">Overview</h1>
                <div className="bg-white flex items-center gap-2 p-2 rounded-lg">
                    <DatePickerWithRange className="outline-none border-none shadow-none"/>
                </div>

            </div>
            <div className="flex items-center gap-4">
                <div className="bg-white flex items-center gap-1 p-2 rounded-lg">
                    <Search size={24} className="text-gray-600 hover:text-gray-900" />
                    <input type="text" placeholder="Search" className="p-2 border-none outline-none" />
                </div>
                <Bell size={24} className="text-gray-600 hover:text-gray-900" />
            </div>
        </nav>
    )
}