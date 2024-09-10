import { InterviewType } from "@/types/Common";
// import { Button } from "@mui/material";
import WbIncandescentOutlinedIcon from "@mui/icons-material/WbIncandescentOutlined";
import React, { useState } from "react";
import RotateRightOutlinedIcon from "@mui/icons-material/RotateRightOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { Player } from "@lottiefiles/react-lottie-player";
import { formatDate } from "@/components/lib/DateExtracting";
import { convertTo12Hour } from "@/components/lib/TimeExtract";
import { Link, useNavigate } from "react-router-dom";
import { InterviewModal } from "@/components/User/InterviewModal";
import { InterviewScheduleForm } from "@/components/User/InterVieweScheduleForm";
import { isActive, isExpired } from "@/components/lib/JoinAccess"; // Expected output depends on the current time
import { Button } from "@/components/ui/button";
export const MeetingTable = ({ data }: { data: InterviewType[] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  // const testStartTime = "16:05";
  // const testDateString = "2024-09-03T15:35:00Z"; // Adjust if needed

  // console.log(isActive(testStartTime, testDateString), "oooooo");

  const handleInterview = () => {
    setIsModalOpen(true);
  };

  const closeModal = async () => {
    setIsModalOpen(false);
  };
  const handleView = (rowData: any) => {
    navigate("/interviewer/MyInterviews/singleDetails", {
      state: { data: rowData },
    });
  };
  return (
    <>
      <div className="flex justify-end mb-4 gap-4">
        <Button>Start Meet</Button>
        <Button onClick={handleInterview}>Schedule</Button>
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
                {row.interviewStatus === "Scheduled" && (
                  <>
                    {isExpired(row.startTime, row.date) ? (
                      <div className="flex-1 mb-2 sm:mb-0">
                        <Button className="bg-red-500 hover:bg-red-400">
                          Expired
                        </Button>
                      </div>
                    ) : isActive(row.startTime, row.date) ? (
                      <Link
                        to={`/Meet-HireHub/${row.uniqueId}`}
                        className="flex-1 mb-2 sm:mb-0"
                      >
                        <Button className="bg-green-500 hover:bg-green-400">
                          JOIN
                        </Button>
                      </Link>
                    ) : (
                      <div className="flex-1 mb-2 sm:mb-0">
                        <Button className="bg-yellow-500 hover:bg-yellow-400">
                          Pending
                        </Button>
                      </div>
                    )}
                  </>
                )}

                <div className="flex-1 mb-2 sm:mb-0">
                  <Button onClick={() => handleView(row)}>Detail View</Button>

                  {/* <Link to={`/MyInterviews/singleDetails`}>link</Link> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <InterviewModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="ScheduleInterview"
      >
        <InterviewScheduleForm MeetData={null} />
      </InterviewModal>
    </>
  );
};
