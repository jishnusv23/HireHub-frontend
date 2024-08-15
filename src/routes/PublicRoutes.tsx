import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";
import { RooteState } from "../redux/store";

interface PublicRouteProps {
  element: JSX.Element;
  allowedRoles: string[];
}

const PublicRoutes: React.FC<PublicRouteProps> = ({
  element,
  allowedRoles,
}) => {
  const { data } = useAppSelector((state: RooteState) => state.user);
  const role = data?.role;

  // If allowedRoles is empty, assume the route is public and accessible to everyone
  if (allowedRoles.length === 0) {
    return element; // Allow access to this route for everyone
  }

  // If the user has a role that matches allowedRoles, render the element
  if (role && allowedRoles.includes(role)) {
    return element;
  }

  // If the user has a role but it's not in allowedRoles, redirect based on their role
  if (role) {
    return <Navigate to="/" />;
  }

  // If the user is not authenticated, redirect to home or login
  return <Navigate to="/home" />;
};

export default PublicRoutes;
