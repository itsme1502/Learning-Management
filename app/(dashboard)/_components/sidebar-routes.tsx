"use client";

import { BarChart, Compass, Layout, List } from "lucide-react";
import { SideBarItem } from "./sideBarItem";
import { usePathname } from "next/navigation";

const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: Compass,
    label: "Browse",
    href: "/search",
  },
];

const teacherRoutes = [
  {
    icon: List,
    label: "courses",
    href: "/teacher/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics",
  },
];

export const SideBarRoutes = () => {
    const pathname = usePathname();
    
    const isTeacherPage = pathname?.includes("/teacher");
    const routes = isTeacherPage ? teacherRoutes : guestRoutes;
    
  return (
    <div className="flex flex-col w-full">
    {routes.map((route) => (
     <SideBarItem 
     key = {route.href}
     icon = {route.icon}
     label = {route.label}
     href = {route.href}
     />
    ))
    }
    </div>
);
};
