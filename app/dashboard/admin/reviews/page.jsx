import { SidebarInsetComponent } from "@/components/dashboard/admin/side-bar-inset-component";
import { SidebarInset } from "@/components/ui/sidebar";
import { Suspense } from "react";
import ReviewDashboard from "@/components/dashboard/admin/reviews/review";


export default function Reviews() {
    return (
        <SidebarInset>
            <SidebarInsetComponent />
            <Suspense fallback={<div>Loading...</div>}>
                <ReviewDashboard />
            </Suspense>
        </SidebarInset>
    )
}