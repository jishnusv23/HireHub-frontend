import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import StraightOutlinedIcon from "@mui/icons-material/StraightOutlined";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import ShutterSpeedRoundedIcon from "@mui/icons-material/ShutterSpeedRounded";
import { InterviewType } from "@/types/Common";
import { formatDate } from "@/components/lib/DateExtracting";
import { convertTo12Hour } from "@/components/lib/TimeExtract";
import { formatTime } from "@/components/lib/TimeReminder";
import { getUserData } from "@/redux/store/actions/auth";
import { useAppDispatch } from "@/hooks/hooks";
import { InterviewModal } from "@/components/User/InterviewModal";
import { InterviewScheduleForm } from "@/components/User/InterVieweScheduleForm";
import ConfirmModal from "../users/ConfirmModal";
import { cancelInterveiws } from "@/redux/store/actions/interviewer/cancelnterveiws";

export const SingleInterviewDetails = () => {
  const [singleInterview, setSingelInterview] = useState<InterviewType | null>(
    null
  );
  const [loading,setLoading]=useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const handleInterview = () => {
    setIsModalOpen(true);
  };

  const closeModal = async () => {
    setIsModalOpen(false);
    await dispatch(getUserData());
  };

  useEffect(() => {
    if (location.state && location.state.data) {
      setSingelInterview(location.state.data);
    }
  }, [location.state]);

  const handleBack = () => {
    navigate("/interviewer/MyInterviews");
  };
  const handleCancelInterveiw = () => {
    setCancelModalOpen(true);
  };
  const handleCancelInterview =async () => {
    if(singleInterview){
      setLoading(true)
      setCancelModalOpen(false)
      const response=await dispatch(cancelInterveiws({data:singleInterview._id}))
      console.log("🚀 ~ file: SingleInterviewDetails.tsx:53 ~ handleCancelInterview ~ response:", response.payload.data)
      if(response.payload.data){
        setLoading(false)

        setSingelInterview(response.payload.data)
      }else{
        setLoading(false)
      }
      
    }
  };
  const closeModalInterview = () => {
    setCancelModalOpen(false);
    setLoading(false)
  };

  return (
    <>
      <div className="bg-background p-4 gap-3">
        <div className="flex justify-start flex-col md:flex-row gap-3">
          <Button
            onClick={handleBack}
            variant="contained"
            color="primary"
            className="w-full md:w-auto mb-4 md:mb-0"
          >
            Back to Interviews
          </Button>
          {singleInterview?.interviewStatus === "Scheduled" && (
            <div className="flex flex-col md:flex-row gap-4">
              <Button
                onClick={handleInterview}
                variant="contained"
                color="primary"
                className="w-full md:w-auto mb-4 md:mb-0"
              >
                {loading ? "loading" : "Edit Interview"}
              </Button>
              <Button
                variant="contained"
                color="error"
                className="w-full md:w-auto rounded-2xl"
                onClick={handleCancelInterveiw}
              >
                {loading ? "loading" : "Cancel Interview"}
              </Button>
            </div>
          )}
        </div>

        {/* Date and Time */}
        <div className="mt-4 h-auto p-4">
          <div className="flex items-start flex-col md:flex-row">
            <div className="flex items-center mr-4 pt-4">
              <HomeOutlinedIcon
                color="info"
                fontSize="large"
                className="text-2xl"
              />
              <StraightOutlinedIcon fontSize="large" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl md:text-2xl font-bold">
                {singleInterview?.date
                  ? formatDate(new Date(singleInterview.date))
                  : "No Date Available"}
              </h1>
              <h1 className="text-lg md:text-xl">
                {singleInterview
                  ? convertTo12Hour(singleInterview.startTime)
                  : "No Time Available"}
              </h1>
              <h1 className="text-sm">
                ( GMT +05:30 ) India Standard Time (Asia/Kolkata)
              </h1>
            </div>
          </div>
        </div>

        {/* Host and Department */}
        <div className="mt-4 h-auto p-4">
          <div className="flex items-start flex-col md:flex-row">
            <div className="flex items-center mr-4 pt-4">
              <ManageAccountsRoundedIcon color="info" fontSize="large" />
              <StraightOutlinedIcon fontSize="large" />
            </div>
            <div className="flex flex-col mr-8">
              <h1 className="text-lg md:text-2xl font-semibold">Host</h1>
              <h1 className="text-base md:text-xl">
                {singleInterview
                  ? singleInterview.interviewerEmail
                  : "No Title Available"}
              </h1>
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg md:text-xl font-semibold">Department</h1>
              <h1 className="text-base md:text-lg">
                {singleInterview
                  ? singleInterview.interviewType
                  : "No Description Available"}
              </h1>
            </div>
          </div>
        </div>

        {/* Participants and Meeting Link */}
        <div className="mt-4 h-auto p-4">
          <div className="flex items-start flex-col md:flex-row">
            <div className="flex items-center mr-4 pt-4">
              <ManageAccountsRoundedIcon color="info" fontSize="large" />
              <StraightOutlinedIcon fontSize="large" />
            </div>
            <div className="flex flex-col mr-8">
              <h1 className="text-lg md:text-xl font-bold">Participants</h1>
              <h1 className="text-sm">
                {singleInterview
                  ? singleInterview.participants.map((email, index) => (
                      <div key={index}>
                        {index + 1}. {email}
                      </div>
                    ))
                  : "No Participants"}
              </h1>
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg md:text-xl font-semibold">Meet Link</h1>
              {singleInterview?.interviewStatus == "Scheduled" ? (
                <a href={singleInterview ? singleInterview.meetingLink : ""}>
                  MeetLink
                </a>
              ) : (
                "Expired"
              )}
            </div>
          </div>
        </div>

        {/* Reminders */}
        <div className="mt-4 h-auto p-4">
          <div className="flex items-start flex-col md:flex-row">
            <div className="flex items-center mr-4 pt-4">
              <ShutterSpeedRoundedIcon color="info" fontSize="large" />
              <StraightOutlinedIcon fontSize="large" />
            </div>
            <div className="flex flex-col mr-8">
              <h1 className="text-lg md:text-2xl font-bold">Reminders</h1>
              <h1 className="text-base md:text-xl">
                {singleInterview
                  ? formatTime(singleInterview.startTime)
                  : "No Time Available"}
              </h1>
            </div>
            <div className="flex flex-col">
              <h1 className="text-base md:text-xl">
                {singleInterview?.date
                  ? formatDate(new Date(singleInterview.date))
                  : "No Date Available"}
              </h1>
            </div>
          </div>
        </div>
      </div>


      <InterviewModal isOpen={isModalOpen} onClose={closeModal} title="edit">
        <InterviewScheduleForm MeetData={singleInterview} />
      </InterviewModal>

      {cancelModalOpen && (
        <ConfirmModal
          onConfirm={handleCancelInterview}
          onCancel={closeModalInterview}
          message="CANCEL Interview"
        />
      )}
    </>
  );
};
