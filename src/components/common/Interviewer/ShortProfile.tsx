import React, { useState } from "react";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import MessageIcon from "@mui/icons-material/Message";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
// import { Player } from "@lottiefiles/react-lottie-player";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { useAppSelector } from "@/hooks/hooks";
import { RooteState } from "@/redux/store";
import { CustomModal } from "@/components/customs/CustomModal";
import { InterviewerProfileForm } from "./InterviewerProfileForm";

export const ShortProfile = () => {
  const { data } = useAppSelector((state: RooteState) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProfile = () => {
    setIsModalOpen(true);
  };
  const closeModal = async () => {
    setIsModalOpen(false);
    // await dispatch(getUserData());
  };

  return (
    <>
      <div className="w-full max-w-screen-lg mx-auto p-4 lg:p-8 rounded-2xl border border-designColor bg-background">
        <h1 className="text-2xl lg:text-3xl font-bold mb-6 text-center font-mono">
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
          <div
            className="bg-transparent w-32 h-12 flex items-center justify-center rounded-lg shadow-sm border border-b-gray-500 hover:bg-primary"
            onClick={handleProfile}
          >
            <PermIdentityIcon color="inherit" />
            <h1 className="text-sm ml-2">My Profile</h1>
          </div>

          <div className="bg-transparent w-32 h-12 flex items-center justify-center rounded-lg shadow-sm border border-b-gray-500 hover:bg-primary">
            <MessageIcon color="inherit" />
            <h1 className="text-sm ml-2">My Interviewes</h1>
          </div>

          <div className="bg-transparent w-32 h-12 flex items-center justify-center rounded-lg shadow-sm border border-b-gray-500 hover:bg-primary">
            <LocalActivityIcon color="inherit" />
            <h1 className="text-sm ml-2">My Blogs</h1>
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
      <CustomModal isOpen={isModalOpen} onClose={closeModal} title="Profile">
        <InterviewerProfileForm />
      </CustomModal>
    </>
  );
};
