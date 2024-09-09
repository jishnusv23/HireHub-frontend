import React, { useState } from "react";
import { Button } from "../ui/button";
import { InterviewModal } from "../User/InterviewModal";
import { InterviewScheduleForm } from "../User/InterVieweScheduleForm";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getUserData } from "@/redux/store/actions/auth";
import { asyncThunkCreator } from "@reduxjs/toolkit";
import { InstantMeetAction } from "@/redux/store/actions/common/InstantMeetAction";
import { string } from "zod";
import { RooteState } from "@/redux/store";

export const InterviewChoice = () => {
    const {data}=useAppSelector((state:RooteState)=>state.user)
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleInterview = () => {
    setIsModalOpen(true);
  };
  const closeModal = async () => {
    setIsModalOpen(false);
    await dispatch(getUserData());
  };
  const handleInstantMeet = async () => {
    try {
      const response = await dispatch(InstantMeetAction(data?._id as string));
    } catch (error: any) {
      console.error("something wrong", error);
    }
  };
  return (
    <>
      <div className="flex justify-center items-center  ">
        <div className="flex space-x-6">
          <div className="p-6 bg-backgroundAccent border border-gray-300 shadow-md rounded-lg text-center">
            <h1 className="text-lg font-semibold mb-4">Instant Meeting</h1>
            <Button onClick={handleInstantMeet}>Start Instant Meeting</Button>
          </div>

          <div className="p-6 bg-backgroundAccent border border-gray-300 shadow-md rounded-lg text-center">
            <h1 className="text-lg font-semibold mb-4">Schedule Meeting</h1>
            <Button onClick={handleInterview}>Schedule a Meeting</Button>
          </div>
        </div>
      </div>
      <InterviewModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="schedule"
      >
        <InterviewScheduleForm />
      </InterviewModal>
    </>
  );
};
