import { MeetValidation } from "@/components/common/Meet/MeetValidation";
import { SocketContext } from "@/context/SocketProvider";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { RooteState } from "@/redux/store";
import { InterivieweeMeetAcess } from "@/redux/store/actions/common/IntervieweeMeetAccessAction";
import { verifyIntervewe } from "@/redux/store/actions/common/verifyHost";
import Peer from "peerjs";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  IoMicOffOutline,
  IoMicOutline,
  IoVideocamOffOutline,
  IoVideocamOutline,
  IoExit ,
  IoCallOutline,
} from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const MeetRoom = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [peerId, setPeerId] = useState<string>("");
  
  const { data } = useAppSelector((state: RooteState) => state.user);
  const [interviewerJoined, setInterviewerJoined] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState<boolean>(true);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);
  const [userAccepted, setUserAccepted] = useState<boolean>(false);
  const [isleaveRoom, setIsLeaveRoom] = useState<boolean>(false);
  const [personToCall, setPersonToCall] = useState<string>("");
  const MyVideoRef = useRef<HTMLVideoElement | null>(null);
  const RemoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const peerInstance = useRef<Peer | null>(null);
  const { uniqueId } = useParams();
  const roomId = uniqueId;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { socket } = useContext(SocketContext) || {};


  useEffect(() => {
    const peer = new Peer();
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (MyVideoRef.current) {
          MyVideoRef.current.srcObject = stream;
        }
        setStream(stream);
      });

    peer.on("open", (id) => {
      setPeerId(id);
      socket && socket.emit("room-joined", { roomId, id });
    });
    peerInstance.current = peer;

    return () => {
      peerInstance.current?.destroy();
    };
  }, []);

  useEffect(() => {
    socket &&
      socket.on("new-user-joined", (userId) => {
        if (userId !== peerId) {
          setPersonToCall(userId);
        }
      });
  }, [socket]);

  peerInstance.current &&
    peerInstance.current.on("call", (call) => {
      if (stream) {
        call.answer(stream);
        call.on("stream", (remoteVideoStream) => {
          if (RemoteVideoRef.current) {
            RemoteVideoRef.current.srcObject = remoteVideoStream;
          }
        });
      }
    });

  const call = (remotePeerId: string) => {
    if (peerInstance.current && stream) {
      const call = peerInstance.current.call(remotePeerId, stream);
      call.on("stream", (remoteStream: MediaStream) => {
        if (RemoteVideoRef.current) {
          RemoteVideoRef.current.srcObject = remoteStream;
        }
      });
    }
  };

  const toggleVideo = () => {
    const tracks = stream
      ?.getTracks()
      .filter((track) => track.kind === "video");

    tracks?.forEach((track) => (track.enabled = !videoEnabled));
    setVideoEnabled(!videoEnabled);
  };
  const toggleAudio = () => {
    const tracks = stream
      ?.getTracks()
      .filter((track) => track.kind === "audio");

    tracks?.forEach((track) => (track.enabled = !audioEnabled));
    setAudioEnabled(!audioEnabled);
  };

  const leaveRoom = () => {
    setIsLeaveRoom(true);
    navigate("/");
    if (stream) {
      stream.getTracks().filter((tracks) => tracks.stop());
    }
  };

   const checkInterviewerStatus = async () => {
     if (uniqueId && data?._id) {
       const response = await dispatch(
         verifyIntervewe({ uniqueId, userId: data._id })
       );
       if (response.payload.success) {
         setInterviewerJoined(true);
         setIsFormSubmitted(true)
       }
     }
   };

   useEffect(() => {
     checkInterviewerStatus();
   }, [uniqueId, dispatch, data]);

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
    <>
      {personToCall.length > 0 && personToCall !== peerId && !userAccepted && (
        <>
          <h1 className=" poppins ">Someone is requesting to join....</h1>
          <button
            className="px-2 py-2 rounded-md bg-lightgreen text-white font-bold"
            onClick={() => {
              call(personToCall), setUserAccepted(true);
            }}
          >
            Accept Join
          </button>
        </>
      )}
      <div
        className={`grid place-content-start ${
          userAccepted
            ? "md:grid-cols-2 grid-cols-1"
            : "md:grid-cols-2 grid-cols-1"
        } `}
      >
        <div>
          {!isleaveRoom && (
            <video
              className={` mt-5 rounded-lg${isleaveRoom ? "hidden" : ""}`}
              autoPlay
              muted
              ref={RemoteVideoRef}
            ></video>
          )}
        </div>
        <div>
          <video
            className={`w-full mt-5 rounded-lg`}
            autoPlay
            ref={MyVideoRef}
          ></video>
        </div>
      </div>

      <div className="flex gap-x-4 mt-12 bg-gray-900 justify-center py-3 rounded-md  w-6/6 ">
        <button
          className="text-3xl bg-lightgreen px-3 py-2 text-white rounded-lg"
          onClick={toggleVideo}
        >
          {videoEnabled ? (
            <IoVideocamOutline className="text-3xl" />
          ) : (
            <IoVideocamOffOutline className="" />
          )}
        </button>

        <button
          className="text-3xl bg-lightgreen text-white rounded-lg px-3 py-2"
          onClick={toggleAudio}
        >
          {audioEnabled ? (
            <IoMicOutline className="text-3xl" />
          ) : (
            <IoMicOffOutline className="text-3xl" />
          )}
        </button>
        {
          <button
            className="text-3xl bg-red-600 text-white rounded-lg px-3 py-2"
            onClick={leaveRoom}
          >
            {<IoExit className="text-3xl" />}
          </button>
        }
      </div>
    </>
  );
}
};

export default MeetRoom;
