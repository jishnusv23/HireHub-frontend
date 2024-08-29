import { InterviewType } from "@/types/Common";
import { Button } from "@mui/material";
import WbIncandescentOutlinedIcon from "@mui/icons-material/WbIncandescentOutlined";
import React from "react";
import RotateRightOutlinedIcon from "@mui/icons-material/RotateRightOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { Player } from "@lottiefiles/react-lottie-player";
import { formatDate } from "@/components/lib/DateExtracting";
import { convertTo12Hour } from "@/components/lib/TimeExtract";
import { Link, useNavigate } from "react-router-dom";

export const MeetingTable = ({ data }: { data: InterviewType[] }) => {
  const navigate = useNavigate();
  const handleView = (rowData:any) => {
    navigate("/interviewer/MyInterviews/singleDetails", {
      state: { data: rowData },
    });
  };
  return (
    <>
      <div className="flex justify-end mb-4">
        <Button className="flex justify-end">Create</Button>
      </div>
      {data.length === 0 && (
        <div className="flex items-center justify-center  min-h-[calc(100vh-4rem)]">
          <div className="text-center">
            <h1>Condecting your meet</h1>
            <Player
              src="https://lottie.host/dacdeae0-e164-4f33-8b87-3be09559dc99/KsBkmJ1IRN.json"
              background="transparent"
              speed={1}
              loop
              autoplay
              className="w-60 mx-auto"
            />
            <div className="mt-4">
              <Button className="mr-2">Meet Now</Button>
              <Button>Schedule</Button>
            </div>
          </div>
        </div>
      )}
      <div className="p-4 sm:p-6 lg:p-8 bg-background">
        <div className="relative overflow-x-auto sm:rounded-lg">
          <div className="min-w-full">
            {data.map((row, index) => (
              <div
                key={index}
                className="shadow-md rounded-lg mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border dark:hover:border-primary"
              >
                <div className="flex-1 text-muted-foreground text-xl font-bold mb-2 sm:mb-0">
                  <span>
                    <WbIncandescentOutlinedIcon
                      style={{
                        transform: "rotate(180deg)",
                        transition: "transform 0.3s",
                      }}
                      color="warning"
                    />
                  </span>
                  <div className="grid grid-cols-1 ">
                    {formatDate(new Date(row.date))}
                    <span> {convertTo12Hour(row.startTime)}</span>
                  </div>
                </div>
                <div className="flex-1 mb-2 sm:mb-0">
                  <span className="font-semibold">Host:</span>{" "}
                  {row.interviewerEmail}
                </div>
                <div className="flex-1 mb-2 sm:mb-0">
                  <span className="font-semibold">Type:</span>{" "}
                  {row.interviewType}
                </div>
                <div className="flex-1 mb-2 sm:mb-0">
                  {row.interviewStatus === "Cancelled" && (
                    <ThumbDownAltOutlinedIcon color="error" />
                  )}
                  {row.interviewStatus === "Scheduled" && (
                    <RotateRightOutlinedIcon color="action" />
                  )}
                  {row.interviewStatus === "Completed" && (
                    <CheckCircleOutlineOutlinedIcon color="success" />
                  )}
                </div>
                <div className="flex-1 mb-2 sm:mb-0">
                  <Button onClick={()=>handleView(row)}>Detail View</Button>
                  
                  {/* <Link to={`/MyInterviews/singleDetails`}>link</Link> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
