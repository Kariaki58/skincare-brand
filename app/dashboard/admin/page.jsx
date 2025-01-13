
import AppNavBar from "@/components/dashboard/admin/app-nav-bar";
import CardDisplay from "@/components/dashboard/admin/card-display";
import { Component } from "@/components/dashboard/admin/charts/chart-card-bookings";
import { SidebarInsetComponent } from "@/components/dashboard/admin/side-bar-inset-component";
import { SidebarInset } from "@/components/ui/sidebar";


export default function Page() {

    return (
        <SidebarInset>
            <SidebarInsetComponent />
            <div>
                <section className="px-5 max-w-screen-xl mx-auto">
                    <CardDisplay />
                </section>
                <section className="px-5 max-w-screen-xl mx-auto mt-5">
                    <Component />
                </section>
            </div>
        </SidebarInset>
    )
}
