"use client"

import {
    Command,
    GalleryVerticalEnd,
    Settings2,
    ChartNoAxesCombined,
    ScanEye,
    Images,
    UsersRound,
    NotebookPen,
    ShoppingBasket,
    Upload,
    ClockArrowUp,
} from "lucide-react";
import { MdOutlineInventory } from "react-icons/md";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./team-switcher";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar";
import profile from "@/public/about-images/about-picture-1.jpeg";
import Link from "next/link";

// This is sample data.

const data = {
    user: {
        name: "victoria hair braiding salon",
        email: "aderonkeanimashaun29@gmail.com",
        avatar: {profile},
    },
    teams: [
        {
        name: "victoria hair braiding salon",
        logo: GalleryVerticalEnd,
        plan: "business",
        },
    ],
    navMain: [
        {
            title: "Analytics",
            url: "/dashboard/admin",
            icon: ChartNoAxesCombined,
            isActive: true,
        },
        {
            title: "Products",
            url: "/dashboard/admin/products",
            icon: Upload,
            isActive: false,
        },
        {
            title: "Orders",
            url: "/dashboard/admin/orders",
            icon: ClockArrowUp,
            isActive: false,
        },
        {
            title: "Inventory",
            url: "/dashboard/admin/inventory",
            icon: MdOutlineInventory,
            isActive: false,
        },
        {
            title: "gallery",
            url: "/dashboard/admin/gallery",
            icon: Images,
            isActive: false,
        },
        {
            title: "Customers",
            url: "/dashboard/admin/customers",
            icon: UsersRound,
            isActive: false,
        },
        {
            title: 'bookings',
            url: '/dashboard/admin/bookings',
            icon: NotebookPen,
            isActive: false,
        },
        {
            title: "appointment",
            url: "/dashboard/admin/appointment",
            icon: Command,
            isActive: false,
        },
    ],
}

export function AppSidebar({ ...props }) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <Link href="/">
                    <TeamSwitcher teams={data.teams} />
                </Link>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
