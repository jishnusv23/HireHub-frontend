import React, { useEffect, useRef } from "react";

interface VideoCallProps {
  RoomID: string;
  onLeaveMeeting: () => void;
  localStream: MediaStream | null;
  remoteStreams: MediaStream[];
}

export const Meetroom: React.FC<VideoCallProps> = ({
  RoomID,
  onLeaveMeeting,
  localStream,
  remoteStreams,
}) => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRefs = useRef<HTMLVideoElement[]>([]); 
  console.log(RoomID)

  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  useEffect(() => {
    // Assign each remote stream to its corresponding video element
    remoteStreams.forEach((stream, index) => {
      if (
        remoteVideoRefs.current[index] &&
        remoteVideoRefs.current[index].srcObject !== stream
      ) {
        remoteVideoRefs.current[index].srcObject = stream;
      }
    });
  }, [remoteStreams]);

  return (
    <div className="relative w-full h-screen bg-gray-900">
      {/* Local Video */}
      {localStream && (
        <video
          ref={localVideoRef}
          autoPlay
          playsInline
          muted
          className="absolute bottom-4 right-4 w-1/4 max-w-[200px] aspect-video object-cover rounded-lg border-2 border-white shadow-md z-10"
        />
      )}

      {/* Remote Videos */}
      {remoteStreams.map((_, index) => (
        <video
          key={index}
          ref={(el) => {
            // Store the reference of each remote video element in the array
            if (el && !remoteVideoRefs.current[index]) {
              remoteVideoRefs.current[index] = el;
            }
          }}
          autoPlay
          playsInline
          className="w-full h-full object-cover"
        />
      ))}

      {/* Leave Meeting Button */}
      <button
        onClick={onLeaveMeeting}
        className="absolute bottom-4 left-4 bg-red-500 text-white px-4 py-2 rounded-lg z-20"
      >
        Leave Meeting
      </button>
    </div>
  );
};
