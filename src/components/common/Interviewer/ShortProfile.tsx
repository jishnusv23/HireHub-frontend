import React from "react";
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
      <h1 className="text-xl font-bold mb-4">Profile</h1>

      <div className="w-24 h-24 overflow-hidden rounded-full mb-4">
        <img
          src={data?.profile?.avatar}
          alt="Short Profile"
          className="w-full h-full object-cover"
        />
      </div>

      <h3 className="text-lg font-bold mb-2">{data?.username}</h3>
      <p className="text-gray-600 mb-4">Role: {data?.role}</p>

      {/* Profile Actions */}
      <div className="space-y-4 w-full">
        <div className="bg-transparent w-28 h-12 mx-auto flex items-center justify-center rounded-lg shadow-sm border border-b-gray-500 hover:bg-primary">
          <PermIdentityIcon color="inherit" />
          <h1 className="text-sm ml-2">My Profile</h1>
        </div>

        <div className="bg-transparent w-28 h-12 mx-auto flex items-center justify-center rounded-lg shadow-sm border border-b-gray-500 hover:bg-primary">
          <MessageIcon color="inherit" />
          <h1 className="text-sm ml-2">My Message</h1>
        </div>

        <div className="bg-transparent w-28 h-12 mx-auto flex items-center justify-center rounded-lg shadow-sm border border-b-gray-500 hover:bg-primary">
          <LocalActivityIcon color="inherit" />
          <h1 className="text-sm ml-2">My Activity</h1>
        </div>

        <div className="bg-transparent w-28 h-12 mx-auto flex items-center justify-center rounded-lg shadow-sm border border-b-gray-500 hover:bg-primary">
          <WorkspacePremiumIcon color="inherit" />
          <h1 className="text-sm ml-2">Certificate</h1>
        </div>

        <div className="bg-transparent w-28 h-12 mx-auto flex items-center justify-center rounded-lg shadow-sm border border-b-gray-500 hover:bg-primary">
          <MonetizationOnIcon color="inherit" />
          <h1 className="text-sm ml-2">Payment</h1>
        </div>
      </div>
    </div>
  );
};
