// import React, { useEffect, useState } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import { Landingpage } from "./pages/common/Landingpage";
// import { Login } from "./pages/auth/Login";
// import Signup from "./pages/auth/Signup";
// import { useAppDispatch, useAppSelector } from "./hooks/hooks";
// import { RooteState } from "./redux/store";
// import { getUserData } from "./redux/store/actions/auth";

// // import PublicRoutes from "./routes/PublicRoutes";
// // // import { ProtectedRoute } from "./routes/ProtectedRoutes";
// // import { UserRouter } from "./routes/UserRouter";
// // import { RoleBasedRedirect } from "./routes/RouleBasedRedirect";
// import { Home } from "./pages/users/Home";
// // import { logoutAction } from "./redux/store/actions/auth/logoutAction";
// import { makeErrorDisable } from "./redux/store/slices/users";
// import { Otp } from "./pages/auth/Otp";

// const App = () => {
//   const { data, loading } = useAppSelector((state: RooteState) => state.user);
//   const error = useAppSelector((state: RooteState) => state.user.error);
//   console.log("🚀 ~ file: App.tsx:28 ~ App ~ error:", error);
//   console.log(data?.isBlocked, "status");
//   const dispatch = useAppDispatch();

//   useEffect(() => {
//     if (!data) {
//       dispatch(getUserData());
//     }
//   }, [dispatch, data]);
//   useEffect(() => {
//     setTimeout(() => {
//       dispatch(makeErrorDisable());
//     }, 5000);
//   }, [error]);
//   // if (loading) {
//   //   return <div>Loading...</div>; // Display loading indicator
//   // }

//   // if (error) {
//   //   return <div>Error: {error}</div>; // Display error message
//   // }

//   console.log("User Data:", data);

//   if (data === null || data?.role == undefined) {
//     // User is not authenticated
//     return (
//       <>
//         <Router>
//           <Routes>
//             <Route path="/login" element={<Login />} />
//             <Route path="/signup" element={<Signup />} />
//             {/* <Route path="/theatre/signup" element={<TheatreSignup />} /> */}
//             <Route path="/" element={<Landingpage />} />
//             <Route path="/otp-verification" element={<Otp />} />
//           </Routes>
//         </Router>
//       </>
//     );
//   }
//   if ((data.role === "pending" &&data.isVerified) ) {
//     // User is not authenticated
//     return (
//       <>
//         <Router>
//           <Routes>
//             <Route path="/" element={<Navigate to={"/user"} />} />
//             <Route
//               path="/login"
//               element={!data ? <Login /> : <Navigate to={"/user"} />}
//             />
//             <Route
//               path="/user"
//               element={data ? <Home /> : <Navigate to={"/login"} />}
//             />

//             {/* <Route path="/theatre/signup" element={<TheatreSignup />} /> */}
//             {/* <Route path="/" element={<Navigate to="/login" />} />
//           <Route path="/ticketDetails/:id" element={<TicketDetailsPage />} /> */}
//             {/* <Route path="*" element={<Navigate to="/login" />} /> */}
//           </Routes>
//         </Router>
//       </>
//     );
//   }
// };

// export default App;
// App.tsx
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
// import { Room } from "./pages/Meet/Room";
import { Contact } from "./pages/common/Contact";
import { AboutUs } from "./pages/common/AboutUs";
import MeetRoom  from "./pages/Meet/MeetRoom";
import ConnectRoom from "./pages/Meet/ConnectRoom";

// import { SuccessPage } from "./components/common/Interviewer/SuccessPage";

const App = () => {
  const { data, loading } = useAppSelector((state: RooteState) => state.user);
  // console.log("🚀 ~ file: App.tsx:116 ~ App ~ data:", data);
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
              allowedRoles={["interviewer", "pending", ""]}
            />
          }
        />
        <Route
          path="/contact"
          element={<PublicRoute element={<Contact/>} allowedRoles={[]} />}
        />
        <Route
          path="/About"
          element={<PublicRoute element={<AboutUs/>} allowedRoles={[]} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
