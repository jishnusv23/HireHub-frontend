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

export const SingleInterviewDetails = () => {
  const [singleInterview, setSingelInterview] = useState<InterviewType | null>(
    null
  );
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.data) {
      setSingelInterview(location.state.data);
    }
  }, [location.state]);

  const handleBack = () => {
    navigate("/interviewer/MyInterviews");
  };

  return (
    <div className="bg-background p-4 gap-3">
      <Button onClick={handleBack} variant="contained" color="primary">
        Back to Interviews
      </Button>
      {/* Date and Time */}
      <div className="mt-4 h-auto  p-4">
        <div className="flex items-start">
          <div className="flex items-center mr-4 pt-4">
            <HomeOutlinedIcon
              color="info"
              fontSize="large"
              className="text-2xl"
            />
            <StraightOutlinedIcon fontSize="large" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">
              {singleInterview?.date
                ? formatDate(new Date(singleInterview.date))
                : "No Date Available"}
            </h1>
            <h1 className="text-xl ">
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
      <div className="mt-4 h-auto  p-4">
        <div className="flex items-start">
          <div className="flex items-center mr-4 pt-4">
            <ManageAccountsRoundedIcon color="info" fontSize="large" />
            <StraightOutlinedIcon fontSize="large" />
          </div>
          <div className="flex flex-col mr-8">
            <h1 className="text-2xl font-semibold">Host</h1>
            <h1 className="text-xl ">
              {singleInterview ? singleInterview.title : "No Title Available"}
            </h1>
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold">Department</h1>
            <h1 className="text-lg ">
              {singleInterview
                ? singleInterview.description
                : "No Description Available"}
            </h1>
          </div>
        </div>
      </div>
      {/* Participants and Meeting Link */}
      <div className="mt-4 h-auto  p-4">
        <div className="flex items-start">
          <div className="flex items-center mr-4 pt-4">
            <ManageAccountsRoundedIcon color="info" fontSize="large" />
            <StraightOutlinedIcon fontSize="large" />
          </div>
          <div className="flex flex-col mr-8 ">
            <h1 className="text-xl font-bold">Participants</h1>
            <h1 className="text-sm ">
              {singleInterview
                ? singleInterview.participants
                : "No Participants"}
            </h1>
            {/* <Button className="mt-2">Copy</Button> */}
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold">Meet Link</h1>
            {singleInterview?.interviewStatus == "Scheduled" ? (
              <a href={singleInterview ? singleInterview.meetingLink : ""}>
                {" "}
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
        <div className="flex items-start">
          <div className="flex items-center mr-4 pt-4">
            <ShutterSpeedRoundedIcon color="info" fontSize="large" />
            <StraightOutlinedIcon fontSize="large" />
          </div>
          <div className="flex flex-col mr-8">
            <h1 className="text-2xl font-bold">Reminders</h1>
            <h1 className="text-xl ">
              {singleInterview
                ? formatTime(singleInterview.startTime)
                : "No Time Available"}
            </h1>
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl">
              {singleInterview?.date
                ? formatDate(new Date(singleInterview.date))
                : "No Date Available"}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};
