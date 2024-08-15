import React from "react";
import { Outlet } from "react-router-dom";

const PendingUserLayout = () => {
  return (
    <div>
      {/* <h1>Pending User Dashboard</h1> */}
      {/* Add pending user-specific navigation here */}
      <Outlet />
    </div>
  );
};

export default PendingUserLayout;
