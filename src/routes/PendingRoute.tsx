import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "@/pages/users/Home";

import { useAppSelector } from "../hooks/hooks";

 export const PendingRouter = () => {
//   const { data } = useAppSelector((state) => state.user);

//   if (!data || data.role !== "pending") {
//     // Redirect to home if user is not in a "pending" state
//     return <Navigate to="/kkkkkko" replace />;
//   }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/details" element={<PendingDetails />} />
      <Route path="/help" element={<PendingHelp />} /> */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

