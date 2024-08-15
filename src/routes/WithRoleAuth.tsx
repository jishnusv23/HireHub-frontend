// withRoleAuth.tsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";

const withRoleAuth =
  (allowedRoles: string[]) => (WrappedComponent: React.ComponentType) => {
    return (props: any) => {
      const { data, loading } = useAppSelector((state) => state.user);
      const location = useLocation();

      // if (loading) {
      //   return <div>Loading...</div>;
      // }

      if (!data) {
        return <Navigate to="/login" state={{ from: location }} replace />;
      }

      if (!allowedRoles.includes(data.role)) {
        return <Navigate to="/unauthorized" replace />;
      }

      return <WrappedComponent {...props} />;
    };
  };

export default withRoleAuth;
