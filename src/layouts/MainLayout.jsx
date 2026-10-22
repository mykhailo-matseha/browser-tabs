import Tabs from "@/components/Tabs";
import { initialTabs } from "@/data/initialTabs";
import { Outlet } from "react-router";

function MainLayout() {
  return (
    <div>
      <Tabs initialTabs={initialTabs} />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
