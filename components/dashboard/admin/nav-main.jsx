"use client"


import {
    Collapsible,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";


export function NavMain({items}) {
    const path = usePathname()
    const pathName = path.split("/")[path.split("/").length - 1]

    return (
        <SidebarGroup>
        <SidebarGroupLabel>Platform</SidebarGroupLabel>
        <SidebarMenu>
            {items.map((item) => (
                <Collapsible
                    key={item.title}
                    asChild
                    defaultOpen={item.isActive}
                    className="group/collapsible"
                >
                    <SidebarMenuItem>
                        <div  className={`${pathName === item.title.toLowerCase() || (pathName === "admin" && item.title.toLowerCase() === "analytics") ? "bg-gray-600 text-white rounded-md": ""}`}>
                            <Link href={item.url}>
                                <SidebarMenuButton tooltip={item.title}>
                                {item.icon && <item.icon />}
                                <span>{item.title}</span>
                                </SidebarMenuButton>
                            </Link>
                        </div>
                    </SidebarMenuItem>
                </Collapsible>
            ))}
        </SidebarMenu>
        </SidebarGroup>
    )
}
