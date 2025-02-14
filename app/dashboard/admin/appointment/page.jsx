import ServiceAdd from "./service-add"
import ServiceDisplay from "./service-display"
import { SidebarInsetComponent } from "@/components/dashboard/admin/side-bar-inset-component";
import { SidebarInset } from "@/components/ui/sidebar";


export default function Page() {
    return (
        <SidebarInset>
            <SidebarInsetComponent />
            <div>
                <ServiceAdd />
                <ServiceDisplay />
            </div>
        </SidebarInset>
    )
}