import { useGetUserRole, useIAuthenticated } from "@/hooks/authHook";
import { Navigate } from "react-router-dom";

export const withRoleAuth =
  (allowedRoles: string[]) => (WrappedComponent: React.ComponentType) => {
    return (props: any) => {
      const isAuthenticated = useIAuthenticated();
      const userRole = useGetUserRole();

      if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
      }

      
      if (userRole === null || !allowedRoles.includes(userRole)) {
        return <Navigate to="/unauthorized" replace />;
      }

      return <WrappedComponent {...props} />;
    };
  };
