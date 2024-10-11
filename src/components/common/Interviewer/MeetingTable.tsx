import { InterviewType } from "@/types/Common";

import WbIncandescentOutlinedIcon from "@mui/icons-material/WbIncandescentOutlined";
import  { useState } from "react";
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
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { InstantMeetAction } from "@/redux/store/actions/common/InstantMeetAction";
import { RooteState } from "@/redux/store";
import { CustomModal } from "@/components/customs/CustomModal";
import { SuccessPage } from "./SuccessPage";
import InterviewView from "../Admin/InterviewView";

export const MeetingTable = ({
  Interviewdata,
  setAllMeetData,
}: {
  Interviewdata: InterviewType[];
  setAllMeetData: () => Promise<void>;
}) => {
  const { data } = useAppSelector((state: RooteState) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [responsePayload, setResponsePayload] = useState<any>(null);
  const [isModalOpenCustom, setIsModalOpenCustom] = useState(false);
  const [isModalOpenAdmin, setIsModalOpenAdmin] = useState(false);
  const [selectedInterview, setSelectedInterview] =
    useState<InterviewType | null>(null);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleInterview = () => {
    setIsModalOpen(true);
  };

  const closeModal = async () => {
    setIsModalOpen(false);
    setIsModalOpenAdmin(false);
  };
  const instantMeetCloseModl = async () => {
    setIsModalOpenCustom(false);

   await setAllMeetData();
  };
  const handleView = (rowData: any) => {
    navigate("/interviewer/MyInterviews/singleDetails", {
      state: { data: rowData },
    });
  };
  const handleInstantMeet = async () => {
    const response = await dispatch(
      InstantMeetAction({
        interviewerId: data?._id as string,
        interviewerEmail: data?.email as string,
      })
    );
    if (response.payload.success) {
      setIsModalOpenCustom(true);
      setResponsePayload(response.payload.data);
    }
  };
  const handleadmin = (interviewData: InterviewType) => {
    setSelectedInterview(interviewData);
    setIsModalOpenAdmin(true);
  };
  return (
    <>
      <div className="flex justify-end mb-4 gap-4">
        {data?.role !== "admin" && (
          <>
            <Button onClick={handleInstantMeet}>Start Meet</Button>
            <Button onClick={handleInterview}>Schedule</Button>
          </>
        )}
      </div>
      {Interviewdata.length === 0 && (
        <div className="flex items-center justify-center  min-h-[calc(100vh-4rem)]">
          <div className="text-center">
            <h1 className="font-bold text-2xl text-foreground">
              No active meetings. Set up a new one to begin!
            </h1>
            <Player
              src="https://lottie.host/dacdeae0-e164-4f33-8b87-3be09559dc99/KsBkmJ1IRN.json"
              background="transparent"
              speed={1}
              loop
              autoplay
              className="w-80 mx-auto"
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
            {Interviewdata.map((row, index) => (
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
                  {data?.role == "admin" ? (
                    <Button onClick={() => handleadmin(row)}>
                      Detail View
                    </Button>
                  ) : (
                    <Button onClick={() => handleView(row)}>Detail View</Button>
                  )}
                  {/* <Button onClick={() => handleView(row)}>Detail View</Button> */}

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
      {/* <CustomModal */}
      <CustomModal
        isOpen={isModalOpenAdmin}
        onClose={closeModal}
        title="Details"
      >
        <InterviewView interview={selectedInterview} />
      </CustomModal>
      <CustomModal
        isOpen={isModalOpenCustom}
        onClose={instantMeetCloseModl}
        title="Invite participants to join meeting"
      >
        <SuccessPage response={responsePayload} InstantMeet={true} />
      </CustomModal>
    </>
  );
};
