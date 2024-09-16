import React, { useEffect, useRef } from "react";

interface VideoCallProps {
  RoomID: string;
  onLeaveMeeting: () => void;
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
}

export const Meetroom: React.FC<VideoCallProps> = ({
  RoomID,
  onLeaveMeeting,
  localStream,
  remoteStream,
}) => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  return (
    <>
      {localStream && (
        <video
          ref={localVideoRef}
          autoPlay
          playsInline
          muted
          className="absolute bottom-4 right-4 w-1/4 max-w-[200px] aspect-video object-cover rounded-lg border-2 border-white shadow-md"
        />
      )}
      {remoteStream && (
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover"
        />
      )}
    </>
  );
};
