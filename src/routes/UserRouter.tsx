import { Home } from "@/pages/users/Home";
import React from "react";
import { Route, Routes } from "react-router-dom";
export const UserRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Add other user routes here */}
    </Routes>
  );
};
