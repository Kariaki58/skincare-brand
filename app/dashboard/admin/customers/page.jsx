import CustomerTable from "@/components/dashboard/admin/customers/customer-table";
import { SidebarInsetComponent } from "@/components/dashboard/admin/side-bar-inset-component";
import { SidebarInset } from "@/components/ui/sidebar";
import { Suspense } from "react";

export default function Customers() {
    return (
        <SidebarInset>
            <SidebarInsetComponent />
            <Suspense fallback={<div>Loading...</div>}>
                <CustomerTable />
            </Suspense>
        </SidebarInset>
    );
}