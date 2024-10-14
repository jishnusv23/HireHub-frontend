// import React, { useEffect, useRef } from "react";
// export const VideoPlayer: React.FC<{
//   stream: MediaStream | null | undefined;
//   muted?: boolean;
//   username: string;
// }> = ({ stream, muted = false, username }) => {
//   const videoRef = useRef<HTMLVideoElement>(null);

//   useEffect(() => {
//     if (videoRef.current && stream) {
//       videoRef.current.srcObject = stream;
//     }
//   }, [stream]);

//   return (
//     <div className="relative w-full h-full min-w-[250px] min-h-[200px]">
//       <div className="absolute top-2 left-2 text-white bg-black bg-opacity-50 px-2 py-1 rounded">
//         {username}
//       </div>
//       <video
//         data-testid="peer-video"
//         className="w-full h-full object-cover border border-white"
//         ref={videoRef}
//         autoPlay
//         playsInline
//         muted={muted}
//       />
//     </div>
//   );
// };

// export const VideoPlayer: React.FC<{
//   stream: MediaStream | null | undefined;
//   muted?: boolean;
// }> = ({ stream, muted = false }) => {
//   const videoRef = useRef<HTMLVideoElement>(null);

//   useEffect(() => {
//     if (videoRef.current && stream) {
//       videoRef.current.srcObject = stream;
//     }
//   }, [stream]);

//   return (
//     <video
//       data-testid="peer-video"
//       className="w-full border border-white"
//       ref={videoRef}
//       autoPlay
//       playsInline
//       muted={false}
//     />
//   );
// };

import React, { useEffect, useRef } from "react";

export const VideoPlayer: React.FC<{
  stream: MediaStream | null | undefined;
  muted?: boolean;
  username: string;
  className?: string;
}> = ({ stream, muted = false, username, className = "" }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className={`relative min-w-[150px] min-h-[100px] ${className}`}>
      <div className="absolute top-2 left-2 text-white bg-black bg-opacity-50 px-2 py-1 rounded">
        {username}
      </div>
      <video
        className="w-full h-full object-cover"
        ref={videoRef}
        autoPlay
        playsInline
        muted={muted}
      />
    </div>
  );
};
