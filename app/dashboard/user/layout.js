import { AppSidebar } from "@/components/dashboard/user/app-sidebar";

export default function layout({ children }) {
    return (
        <>
            {/* <AppSidebar /> */}
            <div>
                {children}
            </div>
        </>
    )
}
