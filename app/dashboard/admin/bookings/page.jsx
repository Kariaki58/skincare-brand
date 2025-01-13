import AppNavBar from "@/components/dashboard/admin/app-nav-bar";
import { SidebarInsetComponent } from "@/components/dashboard/admin/side-bar-inset-component";
import { SidebarInset } from "@/components/ui/sidebar";
import { CalendarCheck, CalendarX, Clock, CheckCircle } from "lucide-react";

export default function Page() {
    return (
        <SidebarInset>
            <SidebarInsetComponent />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4 pt-0">
                {/* Total Bookings */}
                <div className="flex items-center border-2 rounded-md border-gray-200 shadow-lg p-4 bg-white">
                    <div className="mr-4 text-blue-600">
                        <CalendarCheck size={32} />
                    </div>
                    <div>
                        <p className="text-lg font-semibold">203</p>
                        <p className="text-sm text-gray-500">Total Bookings</p>
                    </div>
                </div>

                {/* Confirmed Bookings */}
                <div className="flex items-center border-2 rounded-md border-gray-200 shadow-lg p-4 bg-white">
                    <div className="mr-4 text-green-600">
                        <CheckCircle size={32} />
                    </div>
                    <div>
                        <p className="text-lg font-semibold">54</p>
                        <p className="text-sm text-gray-500">Confirmed Bookings</p>
                    </div>
                </div>

                {/* Pending Bookings */}
                <div className="flex items-center border-2 rounded-md border-gray-200 shadow-lg p-4 bg-white">
                    <div className="mr-4 text-yellow-500">
                        <Clock size={32} />
                    </div>
                    <div>
                        <p className="text-lg font-semibold">12</p>
                        <p className="text-sm text-gray-500">Pending Bookings</p>
                    </div>
                </div>

                {/* Cancelled Bookings */}
                <div className="flex items-center border-2 rounded-md border-gray-200 shadow-lg p-4 bg-white">
                    <div className="mr-4 text-red-600">
                        <CalendarX size={32} />
                    </div>
                    <div>
                        <p className="text-lg font-semibold">2</p>
                        <p className="text-sm text-gray-500">Cancelled Bookings</p>
                    </div>
                </div>
            </div>
            <div className="rounded-md  p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                    <div className="bg-white border-2 rounded-md border-gray-200 shadow-md p-4 space-y-4">
                        <p className="text-lg font-semibold">Top Booking Category</p>
                        <p className="text-gray-500">Deluxe Spa Package</p>
                    </div>
                    <div className="bg-white border-2 rounded-md border-gray-200 shadow-md p-4 space-y-4">
                        <p className="text-lg font-semibold">Most Active Day</p>
                        <p className="text-gray-500">Saturday</p>
                    </div>
                    <div className="bg-white border-2 rounded-md border-gray-200 shadow-md p-4 space-y-4">
                        <p className="text-lg font-semibold">Estimated Revenue</p>
                        <p className="text-gray-500">$10,500</p>
                    </div>
                </div>
            </div>
        </SidebarInset>
    );
}
