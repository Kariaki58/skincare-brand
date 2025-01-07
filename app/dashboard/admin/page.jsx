
import AppNavBar from "@/components/dashboard/admin/app-nav-bar";
import { SidebarInsetComponent } from "@/components/dashboard/admin/side-bar-inset-component";
import { SidebarInset } from "@/components/ui/sidebar";


export default function Page() {

    return (
        <SidebarInset>
            <SidebarInsetComponent />
            <section className="max-w-screen-lg w-full mx-auto">
                <div>
                    <AppNavBar />
                </div>
            </section>
        </SidebarInset>
    )
}
