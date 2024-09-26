import React from "react";
import { Route, Routes } from "react-router-dom";
import { AHome } from "@/pages/admin/AHome";
import AdminDashboard from "@/components/admin/AdminDashboard ";
import AdminInterviewee from "@/components/admin/AdminInterviewee";
import AdminInterviewer from "@/components/admin/AdminInterviewer";


export const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AHome />}>
        <Route index element={<AdminDashboard />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="Interviewee" element={<AdminInterviewee />} />
        <Route path="Interviewer" element={<AdminInterviewer />} />
      </Route>
    </Routes>
  );
};
