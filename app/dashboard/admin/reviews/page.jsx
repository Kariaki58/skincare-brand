import { SidebarInsetComponent } from "@/components/dashboard/admin/side-bar-inset-component";
import { SidebarInset } from "@/components/ui/sidebar";
import Review from "@/components/dashboard/admin/reviews/review";


export default function Reviews() {
    return (
        <SidebarInset>
            <SidebarInsetComponent />
            <Review />
        </SidebarInset>
    )
}