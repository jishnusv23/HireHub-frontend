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
import { useNavigate } from "react-router-dom";
import { CustomModal } from "./CustomModal";
import { SuccessPage } from "../common/Interviewer/SuccessPage";

export const InterviewChoice = () => {
  const { data } = useAppSelector((state: RooteState) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [responsePayload, setResponsePayload] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenCustom, setIsModalOpenCustom] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleInterview = () => {
    setIsModalOpen(true);
  };
  const closeModal = async () => {
    setIsModalOpen(false);
    await dispatch(getUserData());
  };
  const handleInstantMeet = async () => {
    try {
      setLoading(true);
      const response = await dispatch(
        InstantMeetAction({
          interviewerId: data?._id as string,
          interviewerEmail: data?.email as string,
        })
      );
      console.log(
        "🚀 ~ file: InterviewChoice.tsx:26 ~ handleInstantMeet ~ response:",
        response
      );
      if (response.payload.success) {
        setLoading(false);
        setIsModalOpenCustom(true);
        setResponsePayload(response.payload.data);
        // navigate('/Meet-now',{state:{data:response.payload.data}});
      }
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
            <Button onClick={handleInstantMeet} disabled={loading}>
              {" "}
              Meet Now
            </Button>
          </div>

          <div className="p-6 bg-backgroundAccent border border-gray-300 shadow-md rounded-lg text-center">
            <h1 className="text-lg font-semibold mb-4">Schedule Meeting</h1>
            <Button onClick={handleInterview} disabled={loading}>
              Schedule{" "}
            </Button>
          </div>
        </div>
      </div>
      <InterviewModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="schedule"
      >
        <InterviewScheduleForm MeetData={null} />
      </InterviewModal>
      <CustomModal
        isOpen={isModalOpenCustom}
        onClose={closeModal}
        title="schedule"
      >
        <SuccessPage response={responsePayload} InstantMeet={true} />
      </CustomModal>
    </>
  );
};
// HireHub HireHub has invited you to join an online meeting.

// Title: HireHub HireHub's meeting
// Time: Tue, Sep 10, 2024 11:02 AM  (Asia/Kolkata)
// Duration: 1 hour

// Meeting link:
// https://meet.zoho.in/nYR58cvKgx

// Meeting ID: 135 118 9999
// Password: knFR7s
