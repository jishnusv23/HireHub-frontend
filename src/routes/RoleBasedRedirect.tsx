import { useGetUserRole, useIAuthenticated } from "@/hooks/authHook";
import { Navigate, Outlet } from "react-router-dom";

export const RoleBasedRedirect = () => {
  const isAuthenticated = useIAuthenticated();
  const userRole = useGetUserRole();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  switch (userRole) {
    case "pending":
      return <Navigate to="/userhome" replace />;
    case "interviewee":
      return <Navigate to="/interviewee" replace />;
    case "interviewer":
      return <Navigate to="/interviewer" replace />;
    case "admin":
      return <Navigate to="/admin" replace />;
    default:
      return <Navigate to="/" replace />;
  }
};
