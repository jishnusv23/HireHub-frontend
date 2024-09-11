// import React, { useEffect, useRef } from "react";
// import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
// import { v4 as uuidv4 } from "uuid";
// import { useSelector } from "react-redux";
// import { RooteState } from "@/redux/store";

// interface VideoCallProps {
//   RoomID: string;
//   userRole: "interviewer" | "interviewee";
//   onLeaveMeeting: () => void;
// }

// export const VideoCall: React.FC<VideoCallProps> = ({
//   RoomID,
//   userRole,
//   onLeaveMeeting,
// }) => {
//   const {data}=useSelector((state:RooteState)=>state.user)
//   const containerRef = useRef<HTMLDivElement | null>(null);

//   const joinMeet = async () => {
//     if (typeof window !== "undefined") {
//       const appId = Number(import.meta.env.VITE_ZEGO_APP_ID);
//       const serverId = String(import.meta.env.VITE_ZEGO_SERVER_ID);
//       const userName =data ?'Host': sessionStorage.getItem("username") || "Guest";
//       const userId = uuidv4();

//       if (RoomID) {
//         const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
//           appId,
//           serverId,
//           RoomID,
//           userId,
//           userName
//         );

//         const zp = ZegoUIKitPrebuilt.create(kitToken);
//         zp.joinRoom({
//           container: containerRef.current!,
//           scenario: {
//             mode: ZegoUIKitPrebuilt.VideoConference,
//           },
//           showPreJoinView: false,
//           onLeaveRoom: () => {
//             onLeaveMeeting();
//           },
//         });
//       }
//     }
//   };

//   useEffect(() => {
//     joinMeet();
//   }, [RoomID, userRole]);

//   return <div ref={containerRef} className="w-full h-screen" />;
// };
import React, { useEffect, useRef, useState } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import { RooteState } from "@/redux/store";
import { useNavigate } from "react-router-dom";

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
  const { data } = useSelector((state: RooteState) => state.user);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();
  useEffect(() => {
    let ui: ZegoUIKitPrebuilt | undefined;
    console.log("RoomID changed:", RoomID);

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
           
            onLeaveRoom: () => {
              setMeetingEnded(true);
            },
          });
        }
      } catch (error) {
        console.error("Error joining room:", error);
      }
    };

    joinMeet();

    return () => {
      if (ui) {
        ui.destroy();
      }
    };
  }, [RoomID, data]);
  const goToHome = () => {
    onLeaveMeeting();
    navigate("/home"); // Adjust the path based on your route
  };

  return (
    <div className="w-full h-screen">
      <div ref={containerRef} className="w-full h-full" />
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
