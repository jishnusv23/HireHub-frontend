import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { RooteState } from "@/redux/store";
import { verifyIntervewe } from "@/redux/store/actions/common/verifyHost";
import { VideoCall } from "@/components/common/VideoCall";
import { MeetValidation } from "@/components/common/Meet/MeetValidation";
import { InterivieweeMeetAcess } from "@/redux/store/actions/common/IntervieweeMeetAccessAction";
import { toast } from "sonner";

export const Room = () => {
  const { uniqueId } = useParams();
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state: RooteState) => state.user);

  const [interviewerJoined, setInterviewerJoined] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const obje = {
    uniqueId,
    userId: data?._id || "",
  };

  const checkInterviewerStatus = async () => {
    const response = await dispatch(verifyIntervewe(obje));
    if (response.payload.success) {
      setInterviewerJoined(true);
    }
  };

  useEffect(() => {
    if (uniqueId && data?._id) {
      checkInterviewerStatus();
    }
  }, [uniqueId, dispatch, data]);

  const handleFormSubmit = async (formData: any) => {
    const { username, email } = formData;
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);

    console.log("🚀 ~ formData:", formData);

    const response = await dispatch(InterivieweeMeetAcess(uniqueId || ""));

    console.log("🚀 ~ response payload:", response.payload);

    if (response.payload.success) {
      console.log("🚀 ~ Interviewer joined and form submitted");
      setInterviewerJoined(true);
      setIsFormSubmitted(true);
    } else {
      toast.error("Session has not started yet");
    }
  };

  if (data?.role === "interviewer") {
    return <VideoCall RoomID={uniqueId || ""} userRole="interviewer" />;
  }

  if (!data && !isFormSubmitted) {
    return (
      <MeetValidation RoomID={uniqueId || ""} onSubmit={handleFormSubmit} />
    );
  }

  if (interviewerJoined && isFormSubmitted) {
    return <VideoCall RoomID={uniqueId || ""} userRole="interviewee" />;
  }

  return <div>Waiting for interviewer to join...</div>;
};
