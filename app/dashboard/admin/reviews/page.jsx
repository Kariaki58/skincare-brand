import { SidebarInsetComponent } from "@/components/dashboard/admin/side-bar-inset-component";
import { SidebarInset } from "@/components/ui/sidebar";
import Review from "@/components/dashboard/admin/reviews/review";
import { Suspense } from "react";


export default function Reviews() {
    return (
        <SidebarInset>
            <SidebarInsetComponent />
            <Suspense>
                <Review />
            </Suspense>
        </SidebarInset>
    )
}