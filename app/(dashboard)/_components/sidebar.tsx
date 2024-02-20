import { Logo } from "./logo";
import { SideBarRoutes } from "./sidebar-routes";

export const Sidebar = () => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      <div className="p-4">
        <Logo />
      </div>
      <div className="w-full flex flex-col">
        <SideBarRoutes/>
      </div>
    </div>
  );
};
