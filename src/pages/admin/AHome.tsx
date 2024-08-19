import React from "react";
import AdminNavbar from "@/components/admin/AdminNavbar";
import AdminSideBar from "@/components/admin/AdminSideBar";
import { Outlet } from "react-router-dom";

export const AHome = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      <AdminSideBar open={isOpen} />
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${
          isOpen ? "ml-64" : "ml-16"
        }`}
      >
        <AdminNavbar toggleSidebar={toggleSidebar} />

        <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-950">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
