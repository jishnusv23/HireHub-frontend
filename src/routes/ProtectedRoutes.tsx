import React, { FC } from "react";
import { Navigate } from "react-router-dom";
import { RooteState } from "@/redux/store";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { logoutAction } from "@/redux/store/actions/auth/logoutAction";

interface ProtectedRouteProps {
  element: React.ReactElement;
  allowedRoles: string[];
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  element,
  allowedRoles,
}) => {
  const { data } = useAppSelector((state: RooteState) => state.user);
  const dispatch = useAppDispatch();

  if (!data) {
    return <Navigate to="/home" />;
  }

  if (data.isBlocked) {
    dispatch(logoutAction());
    return <Navigate to="/login" />;
  }
  // if (!data.isVerified) {
  //   return <Navigate to="/home" replace />;
  // }

  const userRole = data.role || "";

  if (allowedRoles.includes(userRole)) {
    return element;
  } else {
    return <Navigate to="/login" />;
  }
};
