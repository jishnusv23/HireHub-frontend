// import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

// //*import pages
// import { Login } from "./pages/auth/Login";
// import Signup from "./pages/auth/Signup";
// import { Landingpage } from "./pages/users/Landingpage";

// //*import the Routesfile
// import PublicRoutes from "./routes/PublicRoutes";
// import { RoleBasedRedirect } from "./routes/RouleBasedRedirect";
// import { ProtectedRoutes } from "./routes/ProtectedRoutes";
// import { useAppDispatch, useAppSelector } from "./hooks/hooks";
// import { RooteState } from "./redux/store";
// import { useEffect } from "react";
// import { getUserData } from "./redux/store/actions/auth";
// function App() {
//   const { data } = useAppSelector((state: RooteState) => state.user);
//   const dispatch = useAppDispatch();
//   useEffect(() => {
//     if (!data) {
//       dispatch(getUserData());
//     }
//   }, [dispatch, data]);

//   return (
//     <Router>
//       <Routes>
//         {/* RoleBased router */}
//         <Route
//           path="/"
//           element={
//             <RoleBasedRedirect
//               roles={{
//                 admin: "/admin",
//                 interviewer: "/interviewer",
//                 interviewee: "/interviewee",
//               }}
//             />
//           }
//         />
//         {/* Protected here */}
//         {/* <Route path="/admin/*" element={<ProtectedRoutes allowedRoles={['admin']} element={}/>}/>
//         <Route path="/interviewer/*" element={<ProtectedRoutes allowedRoles={['interviewer']} element={}/>}/>
//         <Route path="/interviewer/*" element={<ProtectedRoutes allowedRoles={['interviewee']} element={}/>}/> */}

//         {/* PublicRoute */}
//         <Route
//           path="/signup"
//           element={<PublicRoutes element={<Landingpage />} allowedRoles={[]} />}
//         />
//         <Route
//           path="/login"
//           element={<PublicRoutes element={<Login />} allowedRoles={[]} />}
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
// import React from "react";
// import {
//   Route,
//   BrowserRouter as Router,
//   Routes,
//   Navigate,

// } from "react-router-dom";
// import { useAppSelector } from "./hooks/hooks";
// import { RooteState } from "./redux/store";

// // Pages
// import { Login } from "./pages/auth/Login";
// import Signup from "./pages/auth/Signup";
// import { Landingpage } from "./pages/common/Landingpage";
// import { Home } from "./pages/users/Home";
// import { Otp } from "./pages/auth/Otp";
// // Import other pages as needed

// // Higher-Order Components for Route Protection
// const withPublicRoute = (Component: any) => {
//   return (props: any) => {
//     const { data } = useAppSelector((state: RooteState) => state.user);
//     return data ? <Navigate to="/" /> : <Component {...props} />;
//   };
// };

// const withProtectedRoute = (
//   Component: JSX.ElementType,
//   allowedRoles: string[]
// ) => {
//   return (props: any) => {
//     const { data } = useAppSelector((state: RooteState) => state.user);
//     if (!data) return <Navigate to="/login" />;
//     if (!allowedRoles.includes(data.role))
//       return <Navigate to="/unauthorized" />;
//     return <Component {...props} />;
//   };
// };

// const withRoleBasedRedirect = (roleRoutes: any) => {
//   return () => {
//     const { data } = useAppSelector((state: RooteState) => state.user);
//     if (!data) return <Navigate to="/login" />;
//     return <Navigate to={roleRoutes[data?.role] || "/"} />;
//   };
// };

// // Apply HOCs to components
// const ProtectedLandingPage = withProtectedRoute(Landingpage, [
//   "admin",
//   "interviewer",
//   "interviewee",
// ]);

// const PublicLogin = withPublicRoute(Login);
// const PublicSignup = withPublicRoute(Signup);

// const RoleBasedRedirect = withRoleBasedRedirect({
//   admin: "/admin",
//   interviewer: "/interviewer",
//   interviewee: "/interviewee",
// });

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Public Landing Page */}
//         {/* <Route path="/" element={<Landingpage />} />
//          */}
//         {/* <Route path="/" element={<Home/>}/>
//          */}
//         <Route path="/" element={<Otp />} />

//         {/* Protected Routes */}
//         <Route path="/dashboard" element={<ProtectedLandingPage />} />

//         {/* Public Routes */}
//         <Route path="/login" element={<PublicLogin />} />
//         <Route path="/signup" element={<PublicSignup />} />

//         {/* Catch-all route for 404 */}
//         <Route path="*" element={<Navigate to="/" />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
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
import PendingUserLayout from "./routes/PendingUserLayout";
import { Home } from "./pages/users/Home";
import { RoleBasedRedirect } from "./routes/RoleBasedRedirect";
import { withRoleAuth } from "./routes/WithRoleAuth";

const App = () => {
  const { data,loading } = useAppSelector((state: RooteState) => state.user);
  console.log("🚀 ~ file: App.tsx:171 ~ App ~ data:", data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!data&&!loading) {
      dispatch(getUserData());
    } else if (data?.isBlocked) {
      console.log("-----------logout action");
    }
  }, [data, dispatch]);
  const PendingProtect = withRoleAuth([
    "pending",
    "interviewee",
    "interviewer",
    "admin",
  ])(PendingUserLayout);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={!data ? <Landingpage /> : <RoleBasedRedirect />}
        />
        <Route
          path="/login"
          element={!data ? <Login /> : <RoleBasedRedirect />}
        />
        <Route
          path="/signup"
          element={!data ? <Signup /> : <RoleBasedRedirect />}
        />
        //*Rolebased
        {/* Role-Based Routes */}
        {/* <Route path="/role-based-redirect" element={<RoleBasedRedirect />} /> */}
        <Route path="/userhome" element={<PendingProtect />}>
          <Route index element={<Home />} />
        </Route>
        {/* <Route path="/unauthorized" element={<Unauthorized />} /> */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
