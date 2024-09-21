import React, { useEffect, useRef } from "react";

export const VideoPlayer: React.FC<{
  stream: MediaStream | null | undefined;
  muted?: boolean;
}> = ({ stream, muted = true }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <video
      data-testid="peer-video"
      className="w-full"
      ref={videoRef}
      autoPlay
      playsInline
      muted={muted}
    />
  );
};
