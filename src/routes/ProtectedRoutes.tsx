import React, { FC } from "react";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { RooteState } from "@/redux/store";

interface ProtectedRoutesProps {
  element: React.ReactElement;
  allowedRoles: string[];
}

export const ProtectedRoutes: FC<ProtectedRoutesProps> = ({
  element,
  allowedRoles,
}) => {
  const { data } = useAppSelector((state: RooteState) => state.user);
  const dispatch = useAppDispatch();
  if (!data) {
    return <Navigate to={"/signup"} />;
  }
  const userRole = data?.role || "";
  if (allowedRoles.includes(userRole)) {
    return element;
  }
};
