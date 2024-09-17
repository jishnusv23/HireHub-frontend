import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
import {
  IoMicOffOutline,
  IoMicOutline,
  IoVideocamOffOutline,
  IoVideocamOutline,
  IoCallOutline,
} from "react-icons/io5";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import "tailwindcss/tailwind.css";
import { verifyIntervewe } from "@/redux/store/actions/common/verifyHost";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { RooteState } from "@/redux/store";
import { MeetValidation } from "@/components/common/Meet/MeetValidation";
import { toast } from "sonner";
import { InterivieweeMeetAcess } from "@/redux/store/actions/common/IntervieweeMeetAccessAction";
import { servers } from "@/common/WebRTCserver";
import { v4 as uuidv4 } from "uuid";

// Initialize socket connection
const socket = io("http://localhost:4002");

const MeetRoom = () => {
  const { data } = useAppSelector((state: RooteState) => state.user);
  const dispatch = useAppDispatch();
  const { uniqueId } = useParams();
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStreams, setRemoteStreams] = useState<MediaStream[]>([]);
  const [micMuted, setMicMuted] = useState(false);
  const [videoOff, setVideoOff] = useState(false);
  const [interviewerJoined, setInterviewerJoined] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const peerConnectionsRef = useRef<{ [key: string]: RTCPeerConnection }>({});

  const createPeerConnection = (peerId: string) => {
    if (peerConnectionsRef.current[peerId])
      return peerConnectionsRef.current[peerId];

    const pc = new RTCPeerConnection(servers);

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("webrtc-ice-candidate", {
          candidate: event.candidate,
          uniqueId,
          peerId,
        });
      }
    };

    pc.ontrack = (event) => {
      console.log(`Received remote track for peer ${peerId}`);
      setRemoteStreams((prevStreams) => {
        const newStream = event.streams[0];
        if (!prevStreams.some((stream) => stream.id === newStream.id)) {
          return [...prevStreams, newStream];
        }
        return prevStreams;
      });
    };

    if (localStream) {
      localStream.getTracks().forEach((track) => {
        pc.addTrack(track, localStream);
      });
    }

    peerConnectionsRef.current[peerId] = pc;
    return pc;
  };

  useEffect(() => {
    const startLocalStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setLocalStream(stream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing media devices", err);
      }
    };

    startLocalStream();
    socket.emit("join-room", uniqueId);

    socket.on(
      "webrtc-offer",
      async (offer: RTCSessionDescriptionInit, offerPeerId: string) => {
        const pc = createPeerConnection(offerPeerId);
        await pc.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        socket.emit("webrtc-answer", { answer, uniqueId, peerId: offerPeerId });
      }
    );

    socket.on(
      "webrtc-answer",
      async (answer: RTCSessionDescriptionInit, answerPeerId: string) => {
        const pc = peerConnectionsRef.current[answerPeerId];
        if (pc && pc.signalingState !== "stable") {
          await pc.setRemoteDescription(new RTCSessionDescription(answer));
        }
      }
    );

    socket.on(
      "webrtc-ice-candidate",
      async ({
        candidate,
        peerId,
      }: {
        candidate: RTCIceCandidateInit;
        peerId: string;
      }) => {
        const pc = peerConnectionsRef.current[peerId];
        if (pc && pc.remoteDescription) {
          await pc.addIceCandidate(new RTCIceCandidate(candidate));
        }
      }
    );

    return () => {
      socket.off("webrtc-offer");
      socket.off("webrtc-answer");
      socket.off("webrtc-ice-candidate");
    };
  }, [uniqueId]);

  const checkInterviewerStatus = async () => {
    if (uniqueId && data?._id) {
      const response = await dispatch(
        verifyIntervewe({ uniqueId, userId: data._id })
      );
      if (response.payload.success) {
        setInterviewerJoined(true);
        setIsFormSubmitted(true);
      }
    }
  };

  useEffect(() => {
    checkInterviewerStatus();
  }, [uniqueId, dispatch, data]);

  const toggleMic = () => {
    if (localStream) {
      localStream
        .getAudioTracks()
        .forEach((track) => (track.enabled = !micMuted));
      setMicMuted(!micMuted);
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      localStream
        .getVideoTracks()
        .forEach((track) => (track.enabled = !videoOff));
      setVideoOff(!videoOff);
    }
  };

  const startCall = async () => {
    const peerId = uuidv4();
    const pc = createPeerConnection(peerId);
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    socket.emit("webrtc-offer", { offer, uniqueId, peerId });
  };

  const handleFormSubmit = async (formData: {
    username: string;
    email: string;
  }) => {
    const { username, email } = formData;
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("email", email);

    const response = await dispatch(
      InterivieweeMeetAcess({
        uniqueId: uniqueId as string,
        email: email as string,
      })
    );

    if (response.payload.success) {
      setInterviewerJoined(true);
      setIsFormSubmitted(true);
      startCall();
    } else {
      toast.error("Session has not started yet");
    }
  };

  if (!data && !isFormSubmitted) {
    return (
      <MeetValidation RoomID={uniqueId || ""} onSubmit={handleFormSubmit} />
    );
  }

  if (interviewerJoined && isFormSubmitted) {
    return (
      <div className="h-screen flex flex-col">
        <div className="flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
          <video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full bg-gray-800 rounded-md"
          />
          {remoteStreams.map((stream) => (
            <video
              key={stream.id}
              autoPlay
              playsInline
              className="w-full h-full bg-gray-800 rounded-md"
              ref={(el) => {
                if (el) el.srcObject = stream;
              }}
            />
          ))}
        </div>
        <div className="flex justify-center items-center py-4 bg-gray-900">
          <button
            onClick={toggleMic}
            className="text-white mx-4 p-3 rounded-full bg-gray-800 hover:bg-gray-700"
          >
            {micMuted ? (
              <IoMicOffOutline size={24} />
            ) : (
              <IoMicOutline size={24} />
            )}
          </button>
          <button
            onClick={toggleVideo}
            className="text-white mx-4 p-3 rounded-full bg-gray-800 hover:bg-gray-700"
          >
            {videoOff ? (
              <IoVideocamOffOutline size={24} />
            ) : (
              <IoVideocamOutline size={24} />
            )}
          </button>
          <button
            onClick={() => console.log("End Call")}
            className="text-white mx-4 p-3 rounded-full bg-red-600 hover:bg-red-500"
          >
            <IoCallOutline size={24} />
          </button>
        </div>
      </div>
    );
  }

  return <div>Loading...</div>;
};

export default MeetRoom;
