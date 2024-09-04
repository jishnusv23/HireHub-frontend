import React, { useEffect, useRef } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { v4 as uuidv4 } from "uuid";

export const VideoCall = ({
  RoomID,
  userRole,
}: {
  RoomID: string;
  userRole: "interviewer" | "interviewee";
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const joinMeet = async () => {
    if (typeof window !== "undefined") {
      const appId = Number(import.meta.env.VITE_ZEGO_APP_ID);
      const serverId = String(import.meta.env.VITE_ZEGO_SERVER_ID);
      const userName = localStorage.getItem("userName") || "Guest";
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
        });
      }
    }
  };
    const handleLeaveMeeting = () => {
      localStorage.removeItem("userName");
      localStorage.removeItem("email");

     
    };

  useEffect(() => { 
    joinMeet();
    return () => {
      handleLeaveMeeting();
    };
  }, [RoomID, userRole]);

  return <div ref={containerRef} className="w-full h-screen" />;
};
