import { NavBarRoutes } from "@/components/navbar-routes"
import { MobileNavBar } from "./mobileNavBar"



export const NavBar = () => {
    return (
        <div className="p-4 border-b h-16 flex items-center bg-white shadow-sm">
            <MobileNavBar/>
            <NavBarRoutes/>
        </div>
    )
}