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
    <div className="w-full max-w-screen-lg mx-auto p-4 lg:p-8 rounded-2xl border border-designColor bg-background">
      <h1 className="text-2xl lg:text-3xl font-bold mb-6 text-center">
        Profile
      </h1>

      <div className="w-32 h-32 lg:w-40 lg:h-40 overflow-hidden rounded-full mb-6 mx-auto">
        <img
          src={data?.profile?.avatar}
          alt="Short Profile"
          className="w-full h-full object-cover"
        />
      </div>

      <h3 className="text-xl lg:text-2xl font-bold mb-2 text-center">
        {data?.username}
      </h3>
      <p className="text-gray-600 mb-6 text-center">Role: {data?.role}</p>

      {/* Profile Actions */}
      <div className="flex flex-wrap gap-4 justify-center">
        <div className="bg-transparent w-32 h-12 flex items-center justify-center rounded-lg shadow-sm border border-b-gray-500 hover:bg-primary">
          <PermIdentityIcon color="inherit" />
          <h1 className="text-sm ml-2">My Profile</h1>
        </div>

        <div className="bg-transparent w-32 h-12 flex items-center justify-center rounded-lg shadow-sm border border-b-gray-500 hover:bg-primary">
          <MessageIcon color="inherit" />
          <h1 className="text-sm ml-2">My Message</h1>
        </div>

        <div className="bg-transparent w-32 h-12 flex items-center justify-center rounded-lg shadow-sm border border-b-gray-500 hover:bg-primary">
          <LocalActivityIcon color="inherit" />
          <h1 className="text-sm ml-2">My Activity</h1>
        </div>

        <div className="bg-transparent w-32 h-12 flex items-center justify-center rounded-lg shadow-sm border border-b-gray-500 hover:bg-primary">
          <WorkspacePremiumIcon color="inherit" />
          <h1 className="text-sm ml-2">Certificate</h1>
        </div>

        <div className="bg-transparent w-32 h-12 flex items-center justify-center rounded-lg shadow-sm border border-b-gray-500 hover:bg-primary">
          <MonetizationOnIcon color="inherit" />
          <h1 className="text-sm ml-2">Payment</h1>
        </div>
      </div>
    </div>
  );
};
