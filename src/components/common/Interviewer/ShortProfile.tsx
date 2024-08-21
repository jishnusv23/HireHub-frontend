import React from "react";
import IMg from "@/assets/home/cartoon-little-boy.jpg";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import MessageIcon from "@mui/icons-material/Message";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { useAppSelector } from "@/hooks/hooks";
import { RooteState } from "@/redux/store";

export const ShortProfile = () => {
  const { data } = useAppSelector((state: RooteState) => state.user);
  return (
    <div className="lg:ml-32 flex flex-col items-center text-center w-full p-4 rounded-lg shadow-md">
      <h1>Profile</h1>
      <div className="w-24 h-24 overflow-hidden rounded-full mb-4">
        <img
          src={data?.profile?.avatar}
          alt="Short Profile"
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-lg font-bold">User Name</h3>
      <p className="text-gray-600">Role: Interviewer</p>
      <div className="bg-background w-28 h-12 flex items-center justify-center mt-4 rounded-lg">
        <PermIdentityIcon color="primary" />
        <h1 className=" text-sm ml-2">My Profile</h1>
      </div>
      <div className="bg-background w-28 h-12 flex items-center justify-center mt-4 rounded-lg">
        <MessageIcon color="primary" />
        <h1 className="text-sm ml-2">My Message</h1>
      </div>
      <div className="bg-background w-28 h-12 flex items-center justify-center mt-4 rounded-lg">
        <LocalActivityIcon color="primary" />
        <h1 className=" text-sm ml-2">My Activity</h1>
      </div>
      <div className="bg-background w-28 h-12 flex items-center justify-center mt-4 rounded-lg">
        <WorkspacePremiumIcon color="primary" />
        <h1 className=" text-sm ml-2">Certificate</h1>
      </div>
      <div className="bg-background w-28 h-12 flex items-center justify-center mt-4 rounded-lg">
        <MonetizationOnIcon color="primary" />
        <h1 className=" text-sm  ml-2">Payment</h1>
      </div>
    </div>
  );
};
