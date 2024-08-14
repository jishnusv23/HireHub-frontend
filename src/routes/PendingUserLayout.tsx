
import { Outlet, Navigate } from "react-router-dom";
import { useGetUserRole } from "@/hooks/authHook";

const PendingUserLayout = () => {
  const userRole = useGetUserRole();

  if (userRole !== "pending") {
    return <Navigate to="/unauthorized" replace />;
  }

  return (
    <div>
      {/* <h1>Pending User Dashboard</h1> */}
      <Outlet /> 
    </div>
  );
};

export default PendingUserLayout;
