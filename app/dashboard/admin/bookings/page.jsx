import TablePagination from "@/components/app-ui/booking/table-pagination";
import { SidebarInsetComponent } from "@/components/dashboard/admin/side-bar-inset-component";
import { SidebarInset } from "@/components/ui/sidebar";
import { CalendarCheck, CalendarX, Clock, CircleCheckBig, X } from "lucide-react";
import { Suspense } from "react";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/options";

export default async function Page({ searchParams }) {
    let bookingLength = 0;
    let comfirmedBooking = 0;
    let pendingBooking = 0;
    let cancelledBooking = 0;
    let errorOccurred = false;
    const session = await getServerSession(options);

    const params = await searchParams;

    let data = [];

    if (!session) {
        return <div>You are not authorized to view this page.</div>;
    }
    if (session?.user?.role !== "admin") {
        return <div>You are not authorized to view this page.</div>;
    }


    try {
        const response = await fetch(`${process.env.FRONTEND_URL}/api/appointment?page=${params.page}&userId=${session?.user?.id}`,
            {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            }
        );
        if (!response.ok) {
            const error = await response.json()
            console.log(error);
            errorOccurred = true;
        }
        data = await response.json();
        bookingLength = data.totalCount;
        comfirmedBooking = data.comfirmedBookings;
        pendingBooking = data.pendingBookings;
        cancelledBooking = data.cancelledBookings;

    } catch (error) {
        errorOccurred = true;
    }

    if (errorOccurred) {
        return <div>Error occurred while fetching bookings</div>;
    }
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
                        <p className="text-lg font-semibold">{bookingLength}</p>
                        <p className="text-sm text-gray-500">Total Bookings</p>
                    </div>
                </div>

                {/* Confirmed Bookings */}
                <div className="flex items-center border-2 rounded-md border-gray-200 shadow-lg p-4 bg-white">
                    <div className="mr-4 text-green-600">
                        <CircleCheckBig size={32} />
                    </div>
                    <div>
                        <p className="text-lg font-semibold">{comfirmedBooking}</p>
                        <p className="text-sm text-gray-500">Confirmed Bookings</p>
                    </div>
                </div>

                {/* Pending Bookings */}
                <div className="flex items-center border-2 rounded-md border-gray-200 shadow-lg p-4 bg-white">
                    <div className="mr-4 text-yellow-500">
                        <Clock size={32} />
                    </div>
                    <div>
                        <p className="text-lg font-semibold">{pendingBooking}</p>
                        <p className="text-sm text-gray-500">Pending Bookings</p>
                    </div>
                </div>

                {/* Cancelled Bookings */}
                <div className="flex items-center border-2 rounded-md border-gray-200 shadow-lg p-4 bg-white">
                    <div className="mr-4 text-red-600">
                        <CalendarX size={32} />
                    </div>
                    <div>
                        <p className="text-lg font-semibold">{cancelledBooking}</p>
                        <p className="text-sm text-gray-500">Cancelled Bookings</p>
                    </div>
                </div>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
                <TablePagination bookings={data.bookings} totalPages={data.totalPages} currentPage={data.currentPage} totalCount={data.totalCount} />
            </Suspense>
        </SidebarInset>
    );
}
