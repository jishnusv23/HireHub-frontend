import React from "react";

const LocalVideoView = ({
  videoRef,
}: {
  videoRef: React.RefObject<HTMLVideoElement>;
}) => {
  return (
    <div className="w-full h-full">
      <video className="w-full h-full" ref={videoRef} autoPlay playsInline />
    </div>
  );
};

export default LocalVideoView;
