// newRolebased.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";

export const RoleBasedRedirect = () => {
  const { data } = useAppSelector((state) => state.user);

  if (!data) {
    return <Navigate to="/login" replace />;
  }

  switch (data.role) {
    case "pending":
      return <Navigate to="/userhome" replace />;
    case "interviewee":
      return <Navigate to="/interviewee/dashboard" replace />;
    case "interviewer":
      return <Navigate to="/interviewer/dashboard" replace />;
    case "admin":
      return <Navigate to="/admin/dashboard" replace />;
    default:
      return <Navigate to="/unauthorized" replace />;
  }
};
