import React from "react";
import { Route, Routes } from "react-router-dom";
import { AHome } from "@/pages/admin/AHome";
import AdminDashboard from "@/components/admin/AdminDashboard ";
import AdminInterviewee from "@/components/admin/AdminInterviewee";
import AdminInterviewer from "@/components/admin/AdminInterviewer";
import AdminBlogs from "@/components/admin/AdminBlogs";
import AdminContentRequest from "@/components/admin/AdminContentRequest";
import {AdminSettings} from "@/components/admin/AdminSettings";
// import AddBlogsAdmin from "@/components/common/Admin/AddBlogsAdmin";

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AHome />}>
        <Route index element={<AdminDashboard />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="Interviewee" element={<AdminInterviewee />} />
        <Route path="Interviewer" element={<AdminInterviewer />} />
        <Route path="blogs" element={<AdminBlogs />} />
        <Route path="blogs/request" element={<AdminContentRequest />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>
    </Routes>
  );
};
