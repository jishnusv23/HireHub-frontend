import InterviewerDashboard from "@/components/interviewer/InterviewerDashboard";
import { LayoutInterviewer } from "@/pages/interviewer/LayoutInterviewer";
import { InterviewerProfile } from "@/components/interviewer/InterviewerProfile";
import { SuccessPage } from "@/components/common/Interviewer/SuccessPage";
import React from "react";
import { Route, Routes } from "react-router-dom";

export const InterViewerRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LayoutInterviewer />}>
        <Route index element={<InterviewerDashboard />} />
        <Route path="Dashboard" element={<InterviewerDashboard />} />
        <Route path="profile" element={<InterviewerProfile />} />
        
      </Route>
    </Routes>
  );
};
// hirehubinterviewer@gmail.com
// HireInterviewer@12
