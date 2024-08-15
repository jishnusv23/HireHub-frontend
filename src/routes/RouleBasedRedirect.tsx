import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "@/hooks/hooks";
import { RooteState } from "@/redux/store";

interface RoleBasedRedirectProps {
  roles: { [key: string]: string };
}

export const RoleBasedRedirect: React.FC<RoleBasedRedirectProps> = ({
  roles,
}) => {
  const { data, loading } = useAppSelector((state: RooteState) => state.user);
  const location = useLocation();

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  if (!data || !data.role) {
    return <Navigate to="/signup" replace />;
  }

  const targetPath = roles[data.role];

  if (!targetPath || location.pathname === targetPath) {
    return null;
  }

  return <Navigate to={targetPath} replace />;
};
