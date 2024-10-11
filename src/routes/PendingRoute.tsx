import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "@/pages/users/Home";


 export const PendingRouter = () => {


  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/details" element={<PendingDetails />} />
      <Route path="/help" element={<PendingHelp />} /> */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

