"use client"

import { UserButton } from "@clerk/nextjs"
import { usePathname } from "next/navigation"
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";

export const NavBarRoutes = () => {

    const pathname = usePathname();

    const isTeacherPage = pathname?.includes("/teacher");
    const isPlayerPage = pathname?.includes("/chapter");

   

    return (
      <div className="flex gap-x-3 ml-auto">
        {isPlayerPage || isTeacherPage ? (
          <Link href="/">
            <Button>
              <LogOut className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </Link>
        ) : (
          <Link href="/teacher/courses">
            <Button size="sm" variant="ghost">
              Teacher Mode
            </Button>
          </Link>
        )}
        <UserButton afterSignOutUrl="/" />
      </div>
    );
}