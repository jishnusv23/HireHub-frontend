
import React from "react";

import { Outlet } from "react-router-dom";
import InterviewerSideBar from "@/components/interviewer/InterviewerSideBar";
import InterviewerNabar from "@/components/interviewer/InterviewerNabar";

export const interviewerLayout = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      
      <InterviewerSideBar open={isOpen}/>
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${
          isOpen ? "ml-64" : "ml-16"
        }`}
      >
        
        <InterviewerNabar toggleSidebar={toggleSidebar}/>

        <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-950">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
