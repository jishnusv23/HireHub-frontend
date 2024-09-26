import React from "react";
import {
  FaUsers,
  FaCog,
  FaTachometerAlt,
  FaChartBar,
  FaFileAlt,
  FaUserGraduate,
} from "react-icons/fa"; // Add other icons
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import HireHub from "../common/HireHub";
import Logo from "@/assets/logos/HireHub-r.png";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

const sidebarVariants = {
  expanded: {
    width: "16rem",
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  collapsed: {
    width: "4rem",
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

export const AdminSideBar = ({ open }: { open: boolean }) => {
  const location = useLocation();

  const adminMenuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "/admin/dashboard" },
    { name: "Interviewee", icon: <FaUsers />, path: "/admin/interviewee" },
    {
      name: "Interviewer",
      icon: <FaUserGraduate />,
      path: "/admin/Interviewer",
    },
    { name: "Analytics", icon: <AutoStoriesIcon />, path: "/admin/dashboard" },
    { name: "Reports", icon: <FaFileAlt />, path: "/admin/dashboard" },
    { name: "Settings", icon: <FaCog />, path: "/admin/dashboard" },
  ];

  return (
    <motion.div
      initial="collapsed"
      animate={open ? "expanded" : "collapsed"}
      variants={sidebarVariants}
      className="fixed inset-y-0 left-0 pt-9 z-30 bg-backgroundAccent overflow-hidden flex flex-col"
      aria-label="Admin Sidebar"
    >
      <div className="flex flex-col items-center py-4">
        {open ? (
          <div className="text-2xl font-bold mb-2">
            <HireHub />
          </div>
        ) : (
          <img
            src={Logo}
            alt="HireHub Logo"
            width={30}
            height={30}
            className="mb-2"
          />
        )}
      </div>
      <div className="flex flex-col flex-grow">
        {adminMenuItems.map((item, index) => (
          <Link
            to={item.path}
            key={index}
            className={`flex items-center p-4 mb-4 rounded-lg transition-colors duration-200 hover:bg-primary ${
              location.pathname === item.path ? "bg-primary" : ""
            }`}
            role="menuitem"
            aria-current={location.pathname === item.path ? "page" : undefined}
          >
            <div className="flex items-center">
              <div className="mr-3 text-lg font-bold" aria-hidden="true">
                {item.icon}
              </div>
              <span className={`${open ? "block" : "hidden"}`}>
                {item.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

export default AdminSideBar;
