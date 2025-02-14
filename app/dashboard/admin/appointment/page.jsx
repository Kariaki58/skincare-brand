import ServiceAdd from "./service-add"
import ServiceDisplay from "./service-display"
import { SidebarInsetComponent } from "@/components/dashboard/admin/side-bar-inset-component";
import { SidebarInset } from "@/components/ui/sidebar";
import { Suspense } from "react";


export default function Page() {
    return (
        <SidebarInset>
            <SidebarInsetComponent />
            <div>
                <Suspense fallback={<div>Loading...</div>}>
                    <ServiceAdd />
                </Suspense>
                <ServiceDisplay />
            </div>
        </SidebarInset>
    )
}