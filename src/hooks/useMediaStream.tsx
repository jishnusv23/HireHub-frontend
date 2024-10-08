// In your useMediaStream hook definition

import { useEffect, useState } from "react";

export const useMediaStream = (initializeStream:boolean) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);

  useEffect(() => {
    if (initializeStream) {
      const getMedia = async () => {
        try {
          const mediaStream = await navigator.mediaDevices.getUserMedia({
            video: videoEnabled,
            audio: audioEnabled,
          });
          setStream(mediaStream);
        } catch (error) {
          console.error("Error accessing media devices.", error);
        }
      };

      getMedia();

      // Cleanup function to stop the media stream when component unmounts
      return () => {
        if (stream) {
          stream.getTracks().forEach((track) => track.stop());
        }
      };
    }
  }, [initializeStream, videoEnabled, audioEnabled]);

  const toggleVideo = () => {
    setVideoEnabled((prev) => !prev);
  };

  const toggleAudio = () => {
    setAudioEnabled((prev) => !prev);
  };

  return { stream, videoEnabled, audioEnabled, toggleVideo, toggleAudio };
};
