import React from "react";

import { useLocation, NavLink } from "react-router-dom";
import ToolTipWrapper from "@/components/ui/ToolTipWrapper";

type MenuItem = {
  name: string;
  icon: React.ReactNode;
  path: string;
};

interface SidebarProps {
  menuItems: MenuItem[];
  bgColor?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  menuItems,
  bgColor = "bg-blue-600",
}) => {
  const { pathname } = useLocation();

  return (
    <div className={`${bgColor} w-64 min-h-screen p-4`}>
      <ul className="space-y-4">
        {menuItems.map((item, index) => (
          <li key={index}>
            <NavLink to={item.path}>
              <ToolTipWrapper title={item.name}>
                <div
                  className={`p-2 rounded-xl hover:bg-background ${
                    pathname === item.path ? "bg-primary text-white" : ""
                  }`}
                >
                  <div className="m-1">{item.icon}</div>
                </div>
              </ToolTipWrapper>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
