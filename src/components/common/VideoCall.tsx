
import React, { useEffect, useRef, useState } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import { RooteState } from "@/redux/store";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";

interface VideoCallProps {
  RoomID: string;
  userRole: "interviewer" | "interviewee";
  onLeaveMeeting: () => void;
}

export const VideoCall: React.FC<VideoCallProps> = ({
  RoomID,
  userRole,
  onLeaveMeeting,
}) => {
  const [zp, setZp] = useState<ZegoUIKitPrebuilt | null>(null);
  const [meetingEnded, setMeetingEnded] = useState(false);
  const [meetingJoined, setMeetingJoined] = useState(false);
  const { data } = useSelector((state: RooteState) => state.user);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    let ui: ZegoUIKitPrebuilt | undefined;

    const joinMeet = async () => {
      try {
        if (!containerRef.current) return;

        if (typeof window !== "undefined") {
          const appId = Number(import.meta.env.VITE_ZEGO_APP_ID);
          const serverId = String(import.meta.env.VITE_ZEGO_SERVER_ID);
          const userName = data
            ? "Host"
            : sessionStorage.getItem("username") || "Guest";
          const userId = uuidv4();

          const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appId,
            serverId,
            RoomID,
            userId,
            userName
          );

          ui = ZegoUIKitPrebuilt.create(kitToken);
          setZp(ui);

          ui.joinRoom({
            container: containerRef.current,
            scenario: {
              mode: ZegoUIKitPrebuilt.VideoConference,
            },
            showPreJoinView: false,
            maxUsers: 5,
            onJoinRoom: () => {
              setMeetingJoined(true);
            },
            onLeaveRoom: () => {
              setMeetingEnded(true);
            },
          });
        }
      } catch (error) {
        console.error("Error joining room:", error);
      }
    };
    console.log(userRole,zp)
    joinMeet();

    return () => {
      if (ui) {
        ui.destroy();
      }
    };
  }, [RoomID, data]);

  const goToHome = () => {
    onLeaveMeeting();
    navigate("/home");
  };

  const handleCustomAction = () => {
    console.log("Custom Action triggered");
    alert("Custom button clicked!");
    
  };

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className=" h-screen" />
      {meetingJoined && (
        <div className="absolute bottom-4 right-1/4 transform translate-x-1/2">
          <IconButton
            onClick={handleCustomAction}
            style={{
              backgroundColor: "#2196f3",
              color: "white",
              padding: "12px",
            }}
          >
            <EditCalendarIcon />
          </IconButton>
        </div>
      )}
      {meetingEnded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
            onClick={() => window.location.reload()}
          >
            Rejoin
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={goToHome}
          >
            Go to Home
          </button>
        </div>
      )}
    </div>
  );
};
