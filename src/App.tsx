import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Landingpage } from "./pages/common/Landingpage";
import { Login } from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { RooteState } from "./redux/store";
import { getUserData } from "./redux/store/actions/auth";

import { RoleBasedRedirect } from "./routes/RouleBasedRedirect";
import PublicRoute from "./routes/PublicRoutes";
import { Otp } from "./pages/auth/Otp";
import { ProtectedRoute } from "./routes/ProtectedRoutes";
import { AdminRoutes } from "./routes/AdminRoutes";
import { PendingRouter } from "./routes/PendingRoute";
import { logoutAction } from "./redux/store/actions/auth/logoutAction";
import ForgotPasswrod from "./pages/auth/ForgotPasswrod";
import { ForgotPassLogin } from "./pages/auth/ForgotPassLogin";
import { InterViewerRoutes } from "./routes/InterViewerRoutes";

import { Contact } from "./pages/common/Contact";
import { AboutUs } from "./pages/common/AboutUs";
import MeetRoom from "./pages/Meet/MeetRoom";
import Blogs from "./components/customs/Blogs";
import Unauthorized from "./pages/common/Unauthorized";

const App = () => {
  const { data } = useAppSelector((state: RooteState) => state.user);
 
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!data) {
      dispatch(getUserData());
    } else if (data.isBlocked) {
      dispatch(logoutAction());
    }
  }, [data, dispatch]);

  return (
    <Router>
      <Routes>
        {/* Role based  */}
        <Route
          path="/"
          element={
            <RoleBasedRedirect
              roles={{
                admin: "/admin",
                pending: "/user",
                interviewer: "/interviewer",
                interviewee: "/interviewee",
              }}
            />
          }
        />

        {/* AdminProtect */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute
              allowedRoles={["admin"]}
              element={<AdminRoutes />}
            />
          }
        />
        {/* Interviewer */}
        <Route
          path="/interviewer/*"
          element={
            <ProtectedRoute
              allowedRoles={["interviewer"]}
              element={<InterViewerRoutes />}
            />
          }
        />
        {/* common user */}
        <Route
          path="/user/*"
          element={
            <ProtectedRoute
              allowedRoles={["pending"]}
              element={<PendingRouter />}
            />
          }
        />

        {/* public */}
        <Route
          path="/home"
          element={<PublicRoute element={<Landingpage />} allowedRoles={[]} />}
        />
        <Route
          path="/signup"
          element={<PublicRoute element={<Signup />} allowedRoles={[]} />}
        />
        <Route
          path="/login"
          element={<PublicRoute element={<Login />} allowedRoles={[]} />}
        />
        <Route
          path="/otp-verification"
          element={<PublicRoute element={<Otp />} allowedRoles={[]} />}
        />
        <Route
          path="/forgot-password"
          element={
            <PublicRoute
              element={<ForgotPasswrod />}
              allowedRoles={["interviewer", "", "pending"]}
            />
          }
        />
        <Route
          path="/verification"
          element={
            <PublicRoute element={<ForgotPassLogin />} allowedRoles={[]} />
          }
        />
        {/* <Route
          path="/Meet-HireHub/:uniqueId"
          element={
            <PublicRoute
              element={<Room />}
              allowedRoles={["interviewer", "pending", ""]}
            />
          }
        /> */}
        {/* <Route
          path="/Meet-HireHub/:uniqueId"
          element={
            <PublicRoute
              element={<ConnectRoom />}
              allowedRoles={["interviewer", "pending", ""]}
            />
          }
        /> */}
        <Route
          path="/Meet-HireHub/:uniqueId"
          element={
            <PublicRoute
              element={<MeetRoom />}
              // element={<Dummy />}
              allowedRoles={["interviewer", "pending", ""]}
            />
          }
        />
        <Route
          path="/contact"
          element={<PublicRoute element={<Contact />} allowedRoles={[]} />}
        />
        <Route
          path="/About"
          element={<PublicRoute element={<AboutUs />} allowedRoles={[]} />}
        />
        <Route
          path="/Blogs"
          element={<PublicRoute element={<Blogs />} allowedRoles={[]} />}
        />

        <Route path="*" element={<Unauthorized />} />
      </Routes>
    </Router>
  );
};

export default App;
