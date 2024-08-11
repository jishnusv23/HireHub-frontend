import React from "react";
import { useAppSelector } from "@/hooks/hooks";
import { RooteState } from "@/redux/store";
import { Navigate } from "react-router-dom";

interface PublicRoutesProps {
  element: JSX.Element;
  allowedRoles: string[];
}

const PublicRoutes: React.FC<PublicRoutesProps> = ({
  element,
  allowedRoles,
}) => {
  const { data } = useAppSelector((state: RooteState) => state.user);
  const role = data?.role;
  if (!role) {
    return element;
  }
  return <Navigate to={"/"} />;
};

export default PublicRoutes;
