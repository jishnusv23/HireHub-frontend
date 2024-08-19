import { useAppSelector } from "@/hooks/hooks";
import { RooteState } from "@/redux/store";
import { Navigate } from "react-router-dom";

type RoleRoutes = {
  [key: string]: string;
};

interface RoleBasedRedirectProps {
  roles: RoleRoutes;
}

export const RoleBasedRedirect: React.FC<RoleBasedRedirectProps> = ({
  roles,
}) => {
  const { data } = useAppSelector((state: RooteState) => state.user);

  if (!data || !data.role || !roles[data.role]) {
    return <Navigate to="/home" replace />;
  }
  // if (!data.isVerified) {
  //   return <Navigate to="/otp-verification" replace />;
  // }

  return <Navigate to={roles[data.role]} replace />;
};
// import { useAppSelector } from "@/hooks/hooks";
// import { RooteState } from "@/redux/store";
// import { Navigate } from "react-router-dom";
// import { useMemo } from "react";

// type RoleRoutes = {
//   [key: string]: string;
// };

// interface RoleBasedRedirectProps {
//   roles: RoleRoutes;
// }

// export const RoleBasedRedirect: React.FC<RoleBasedRedirectProps> = ({
//   roles,
// }) => {
//   const { data } = useAppSelector((state: RooteState) => state.user);

//   // Use useMemo to avoid unnecessary recalculations
//   const role = useMemo(() => data?.role, [data]);

//   // Check if the role is valid and ensure it's defined before using it
//   const targetRoute = useMemo(() => {
//     if (!data) return "/home";
//     if (!data.isVerified) return "/otp-verification";

//     // Only attempt to access roles if role is defined
//     return role && roles[role] ? roles[role] : "/home";
//   }, [data, role, roles]);

//   // Return the navigation to the calculated target route
//   return <Navigate to={targetRoute} replace />;
// };
