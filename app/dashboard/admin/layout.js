import AppNavBar from "@/components/dashboard/admin/app-nav-bar";
import { AppSidebar } from "@/components/dashboard/admin/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";


export default function layout({ children }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <div className="flex-1">
                <AppNavBar />
                {children}
            </div>
        </SidebarProvider>
    )
}
