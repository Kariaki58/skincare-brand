import OrdersTable from "@/components/dashboard/admin/order/order-display";
import CustomerTable from "@/components/dashboard/admin/customers/customer-table";
import { SidebarInsetComponent } from "@/components/dashboard/admin/side-bar-inset-component";
import { SidebarInset } from "@/components/ui/sidebar";
import { Suspense } from "react";


export default function page() {
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