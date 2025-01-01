import { SidebarInsetComponent } from "@/components/dashboard/admin/side-bar-inset-component";
import { SidebarInset } from "@/components/ui/sidebar";


export default function settings() {
    return (
        <SidebarInset>
            <SidebarInsetComponent />
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <h1>settings</h1>
            </div>
        </SidebarInset>
    )
}