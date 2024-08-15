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

// import PublicRoutes from "./routes/PublicRoutes";
// import { ProtectedRoute } from "./routes/ProtectedRoutes";
// import { UserRouter } from "./routes/UserRouter";
// import { RoleBasedRedirect } from "./routes/RouleBasedRedirect";
// import { Home } from "./pages/users/Home";
// import { logoutAction } from "./redux/store/actions/auth/logoutAction";
// import { makeErrorDisable } from "./redux/store/slices/users";

// const App = () => {
//   const { data, loading } = useAppSelector(
//     (state: RooteState) => state.user
//   );
//   const error = useAppSelector((state: RooteState) => state.user.error);
//   console.log("🚀 ~ file: App.tsx:28 ~ App ~ error:", error)
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
//             <Route path="/" element={<Navigate to="/login" />} />
//           </Routes>
//         </Router>
//       </>
//     );
//   }
//   if (data.role === "pending" || !data.isBlocked) {
//     // User is not authenticated
//     return (
//       <>
//         <Router>
//           <Routes>
//             <Route path="/userHome" element={<Home />} />
//             <Route
//               path="/login"
//               element={!data ? <Login /> : <Navigate to={"/userHome"} />}
//             />
//             <Route
//               path="/userHome"
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
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Landingpage } from "./pages/common/Landingpage";
import { Login } from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { RooteState } from "./redux/store";
import { getUserData } from "./redux/store/actions/auth";
import { Home } from "./pages/users/Home";
import { RoleBasedRedirect } from "./routes/newRolebased";
import withRoleAuth from "./routes/WithRoleAuth";
import ProtectedRoute from "./routes/ProtectedRoutes";
import {UserRouter} from "./routes/UserRouter";
// import IntervieweeRouter from "./routes/IntervieweeRouter";
// import InterviewerRouter from "./routes/InterviewerRouter";
// import AdminRouter from "./routes/AdminRouter";
// import Unauthorized from "./pages/common/Unauthorized";

const App = () => {
  const { data, loading } = useAppSelector((state: RooteState) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!data) {
      dispatch(getUserData());
    } else if (data?.isBlocked) {
      // Handle blocked user
    }
  }, [data, dispatch]);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/login" element={ <Login /> } />
        <Route path="/signup" element={<Signup /> } />

        <Route path="/userhome" element={
          <ProtectedRoute>
            <UserRouter />
          </ProtectedRoute>
        } />

        {/* <Route path="/interviewee/*" element={
          <ProtectedRoute>
            {withRoleAuth(["interviewee"])(IntervieweeRouter)}
          </ProtectedRoute>
        } /> */}

        {/* <Route path="/interviewer/*" element={
          <ProtectedRoute>
            {withRoleAuth(["interviewer"])(InterviewerRouter)}
          </ProtectedRoute>
        } /> */}

        {/* <Route path="/admin/*" element={
          <ProtectedRoute>
            {withRoleAuth(["admin"])(AdminRouter)}
          </ProtectedRoute>
        } /> */}

        <Route path="/unauthorized" element={<Login />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
