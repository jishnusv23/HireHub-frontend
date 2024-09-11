import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const { data } = useAppSelector((state: RooteState) => state.user);

  const [interviewerJoined, setInterviewerJoined] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const checkInterviewerStatus = async () => {
    if (uniqueId && data?._id) {
      const response = await dispatch(
        verifyIntervewe({ uniqueId, userId: data._id })
      );
      if (response.payload.success) {
        setInterviewerJoined(true);
      }
    }
  };

  useEffect(() => {
    checkInterviewerStatus();
  }, [uniqueId, dispatch, data]);

  const handleFormSubmit = async (formData: {
    username: string;
    email: string;
  }) => {
    const { username, email } = formData;
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("email", email);

    const response = await dispatch(InterivieweeMeetAcess({uniqueId:uniqueId as string,email:email as string}));

    if (response.payload.success) {
      setInterviewerJoined(true);
      setIsFormSubmitted(true);
    } else {
      toast.error("Session has not started yet");
    }
  };

  const handleLeaveMeeting = () => {
    sessionStorage.clear();
    navigate("/");
  };

  if (data?.role === "interviewer" || data?.role == "pending") {
    return (
      <VideoCall
        RoomID={uniqueId || ""}
        userRole="interviewer"
        onLeaveMeeting={handleLeaveMeeting}
      />
    );
  }

  if (!data && !isFormSubmitted) {
    return (
      <MeetValidation RoomID={uniqueId || ""} onSubmit={handleFormSubmit} />
    );
  }

  if (interviewerJoined && isFormSubmitted) {
    return (
      <VideoCall
        RoomID={uniqueId || ""}
        userRole="interviewee"
        onLeaveMeeting={handleLeaveMeeting}
      />
    );
  }

  return <div>Waiting for interviewer to join...</div>;
};
