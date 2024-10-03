import { formatDate } from "@/components/lib/DateExtracting";
import { formatTime } from "@/components/lib/TimeReminder";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import StraightOutlinedIcon from "@mui/icons-material/StraightOutlined";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import ShutterSpeedRoundedIcon from "@mui/icons-material/ShutterSpeedRounded";
import React from "react";
import { convertTo12Hour } from "@/components/lib/TimeExtract";

import { InterviewType } from "@/types/Common";
interface InteriverProps {
  interview: InterviewType | null;
}
const InterviewView: React.FC<InteriverProps> = ({ interview }) => {
  if (!interview) {
    return <div>No interview details available</div>;
  }
  return (
    <div className="bg-background p-4 gap-3">
      <div className="flex justify-start flex-col md:flex-row gap-3">
        {/* Other UI components */}
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
              {interview?.date
                ? formatDate(new Date(interview?.date))
                : "No Date Available"}
            </h1>
            <h1 className="text-lg md:text-xl">
              {interview?.startTime
                ? convertTo12Hour(interview?.startTime)
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
              {interview?.interviewerEmail || "No Title Available"}
            </h1>
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg md:text-xl font-semibold">Department</h1>
            <h1 className="text-base md:text-lg">
              {interview?.interviewType || "No Description Available"}
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
              {interview?.participants.length > 0
                ? interview.participants.map((email: string, index: number) => (
                    <div key={index}>
                      {index + 1}. {email}
                    </div>
                  ))
                : "No Participants"}
            </h1>
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
              {interview?.reminded || "No Time Available"}
            </h1>
          </div>
          <div className="flex flex-col">
            <h1 className="text-base md:text-xl">
              {interview?.date
                ? formatDate(new Date(interview.date))
                : "No Date Available"}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewView;
