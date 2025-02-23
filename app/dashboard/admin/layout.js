import AppNavBar from "@/components/dashboard/admin/app-nav-bar";
import { AppSidebar } from "@/components/dashboard/admin/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/options";
import { redirect } from "next/navigation";

export default async function layout({ children }) {
    const session = await getServerSession(options);
    if (!session) {
        redirect("/");
    }
    if (session.user.role!== "admin") {
        redirect("/");
    }

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
