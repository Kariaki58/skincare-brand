import OrdersTable from "@/components/dashboard/admin/order/order-display";
import CustomerTable from "@/components/dashboard/admin/customers/customer-table";
import { SidebarInsetComponent } from "@/components/dashboard/admin/side-bar-inset-component";
import { SidebarInset } from "@/components/ui/sidebar";
import { Suspense } from "react";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/options";


export default async function page() {
    const session = await getServerSession(options);


    if (!session) {
        return <div>You need to be logged in to access this page.</div>;
    }
    if (session.user.role!== "admin") {
        return <div>You are not authorized to access this page.</div>;
    }
    return (
        <SidebarInset>
            <SidebarInsetComponent />
            <section className="bg-white h-screen">
                <h1 className="text-center font-bold uppercase my-4">orders</h1>
                <OrdersTable />
            </section>
        </SidebarInset>
    )
}