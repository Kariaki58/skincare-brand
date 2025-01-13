import CategoryDisplay from "@/components/app-ui/service-page/category-display";
import { SidebarInsetComponent } from "@/components/dashboard/admin/side-bar-inset-component";
import { SidebarInset } from "@/components/ui/sidebar";
import AddService from "../services/add/add-service";


export default function studio() {
    return (
        <SidebarInset>
            <SidebarInsetComponent />
            <AddService />
            <div>
                <CategoryDisplay />
            </div>
        </SidebarInset>
    )
}