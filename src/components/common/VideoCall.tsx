import React, { useRef } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

export const VideoCall = ({ params }: { params: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const joinMeet = async (element: string) => {
    if(typeof window !=='undefined'){

    }
  };
  return <div>VideoCall</div>;
};
