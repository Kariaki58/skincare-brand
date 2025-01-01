import { SidebarInsetComponent } from "@/components/dashboard/admin/side-bar-inset-component";
import { SidebarInset } from "@/components/ui/sidebar";


export default function Reviews() {
    return (
        <SidebarInset>
            <SidebarInsetComponent />
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <h1>Reviews</h1>
            </div>
        </SidebarInset>
    )
}