import React, { useEffect, useRef } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import { RooteState } from "@/redux/store";

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
  const {data}=useSelector((state:RooteState)=>state.user)
  const containerRef = useRef<HTMLDivElement | null>(null);

  const joinMeet = async () => {
    if (typeof window !== "undefined") {
      const appId = Number(import.meta.env.VITE_ZEGO_APP_ID);
      const serverId = String(import.meta.env.VITE_ZEGO_SERVER_ID);
      const userName =data ?'Host': sessionStorage.getItem("username") || "Guest";
      const userId = uuidv4();

      if (RoomID) {
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
          appId,
          serverId,
          RoomID,
          userId,
          userName
        );

        const zp = ZegoUIKitPrebuilt.create(kitToken);
        zp.joinRoom({
          container: containerRef.current!,
          scenario: {
            mode: ZegoUIKitPrebuilt.VideoConference,
          },
          onLeaveRoom: () => {
            onLeaveMeeting();
          },
        });
      }
    }
  };

  useEffect(() => {
    joinMeet();
  }, [RoomID, userRole]);

  return <div ref={containerRef} className="w-full h-screen" />;
};
