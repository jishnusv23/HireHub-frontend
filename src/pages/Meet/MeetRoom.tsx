import  {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import Peer from "peerjs";
import { v4 as uuidv4 } from "uuid";
import {
  IoMicOffOutline,
  IoMicOutline,
  IoVideocamOffOutline,
  IoVideocamOutline,
} from "react-icons/io5";

import { MdCallEnd, MdOutlineMoreVert } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { RooteState } from "@/redux/store";
import { SocketContext } from "@/context/SocketProvider";
import { MeetValidation } from "@/components/common/Meet/MeetValidation";
import { InterivieweeMeetAcess } from "@/redux/store/actions/common/IntervieweeMeetAccessAction";
import { verifyIntervewe } from "@/redux/store/actions/common/verifyHost";
import TerminalIcon from "@mui/icons-material/Terminal";
import { VideoPlayer } from "@/components/common/Meet/VideoPlayer";
import { peersReducer, PeerState } from "@/reducers/peerReducer";
import {
  addPeerStreamAction,
  addPeerNameAction,
  removePeerStreamAction,
  addAllPeersAction,
  removeAllPeerStream,
} from "@/redux/store/actions/Room/peerAction";
import CodeEditor from "@/components/common/editor/CodeEditor";

import ConfirmModal from "@/components/common/users/ConfirmModal";

const MeetRoom = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [peers, dispatch] = useReducer(peersReducer, {});
  const [videoEnabled, setVideoEnabled] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
  const [roomLength, setRoomLength] = useState<number>(0);
  console.log(
    "🚀 ~ file: MeetRoom.tsx:46 ~ MeetRoom ~ roomLength:",
    roomLength
  );
  const [isOpenTerminal, setIsOpenTerminal] = useState(false);
  const [interviewerJoined, setInterviewerJoined] = useState<boolean>(false);
  const location = useLocation();
  const { uniqueId } = useParams();
  const roomId = uniqueId || "";
  const navigate = useNavigate();
  const appDispatch = useAppDispatch();
  const { socket } = useContext(SocketContext) || {};
  const { data } = useAppSelector((state: RooteState) => state.user);
  const [userData, setUserData] = useState<{
    username: string;
    email: string;
    userId: string | null;
  }>({
    username: "",
    email: "",
    userId: null,
  });

  const peerInstance = useRef<Peer | null>(null);
  const myVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedUsername = localStorage.getItem("username");
    const storedEmail = localStorage.getItem("email");
    const isGuest = !data;
    if (isGuest && storedUserId && storedUsername && storedEmail) {
      setUserData({
        userId: storedUserId,
        username: storedUsername,
        email: storedEmail,
      });
      setIsFormSubmitted(true);
    }
  }, []);
  useEffect(() => {
    const preventNavigation = (event: PopStateEvent) => {
      // Push the current state again to prevent navigation
      navigate(location.pathname, { replace: true });
      // Show a warning to the user
      event.preventDefault();
      const confirmMessage = "Are you sure you want to leave the meeting?";
      if (window.confirm(confirmMessage)) {
        // If the user confirms, you can handle the exit here
        leaveRoom();
      }
    };

    window.history.pushState(null, "", location.pathname);
    window.addEventListener("popstate", preventNavigation);

    return () => {
      window.removeEventListener("popstate", preventNavigation);
    };
  }, [navigate, location]);

  const OpenTerminal = () => {
    socket?.emit("open-codeEditor", { roomId });
    setIsOpenTerminal(true);
  };

  useEffect(() => {
    const initializePeerConnection = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setStream(stream);
        if (myVideoRef.current) {
          myVideoRef.current.srcObject = stream;
        }

        const peer = new Peer(userData.userId as string);
        peerInstance.current = peer;

        peer.on("open", (peerId) => {
          socket?.emit("join-room", {
            roomId,
            peerId,
            userName: data?.username || userData?.username,
          });
          socket?.emit("find-roomlength", { roomId });
        });

        peer.on("call", (call) => {
          call.answer(stream);
          call.on("stream", (remoteStream) => {
            dispatch(addPeerStreamAction(call.peer, remoteStream));
          });
        });

        socket?.on("user-joined", ({ peerId, userName }) => {
          connectToNewUser(peerId, stream);
          dispatch(addPeerNameAction(peerId, userName));
        });
        //room -length
        socket?.on("room-length", (Roomlegnth) => {
          console.log(`its current leght of the room ${Roomlegnth}`);
          setRoomLength(Roomlegnth);
        });

        socket?.on("feedback-received", ({ email, rating }) => {
          toast.success(
            `🎉 Interviewee Response! 🎉\n\nFrom: ${email}\nRating: ${rating} ⭐`,
            {
              action: {
                label: "View Details",
                onClick: () => console.log(`Feedback from ${email}: ${rating}`),
              },
            }
          );
        });

        //auto-open setup
        socket?.on("auto-openTerminal", (isOpen) => {
          console.log("Terminal state received from server:", isOpen);
          setIsOpenTerminal(isOpen);
        });

        //close the meet
        socket?.on("meet-close", (message) => {
          toast.info(message);
          if (stream) {
            stream.getTracks().forEach((track) => track.stop());
          }
          setStream(null)
          dispatch(removeAllPeerStream());

          navigate(`/Feedback/${roomId}`, {
            state: { data: { roomId, email: userData.email } },
          });
          localStorage.clear();
          // leaveRoom()
        });

        socket?.on("user-disconnected", (peerId) => {
          dispatch(removePeerStreamAction(peerId));
        });

        socket?.on("get-users", ({ participants }) => {
          dispatch(addAllPeersAction(participants));
        });

        return () => {
          stream.getTracks().forEach((track) => track.stop());
          socket?.off("meet-close");
          socket?.off("user-joined");
          socket?.off("user-disconnected");
          socket?.off("get-users");
          socket?.off("auto-openTerminal");
          socket?.close()
          peer.destroy();
        };
      } catch (err) {
        console.error("Failed to get media devices.", err);
        toast.error("Failed to access camera and microphone");
      }
    };

    if (isFormSubmitted || (data && interviewerJoined)) {
      initializePeerConnection();
    }
  }, [roomId, data, socket, isFormSubmitted, interviewerJoined]);

  const connectToNewUser = (peerId: string, stream: MediaStream) => {
    const call = peerInstance.current!.call(peerId, stream);
    call.on("stream", (remoteStream) => {
      dispatch(addPeerStreamAction(peerId, remoteStream));
    });
  };

  const toggleVideo = () => {
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      videoTrack.enabled = !videoEnabled;
      setVideoEnabled(!videoEnabled);
    }
  };

  const toggleAudio = () => {
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      audioTrack.enabled = !audioEnabled;
      setAudioEnabled(!audioEnabled);
    }
  };

  const leaveRoom = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    socket?.emit("leave-room", { roomId, peerId: peerInstance.current?.id });
    socket?.on("user-disconnected", (peerId) => {
      dispatch(removePeerStreamAction(peerId));
    });
    navigate(`/Feedback/${roomId}`, {
      state: { data: { roomId, email: userData.email } },
    });
    localStorage.clear();
  };

  const handleFormSubmit = async (formData: {
    username: string;
    email: string;
  }) => {
    const { username, email } = formData;
    const userId = uuidv4();
    const response = await appDispatch(
      InterivieweeMeetAcess({
        uniqueId: roomId,
        email: email,
      })
    );
    if (response.payload.success) {
      setIsFormSubmitted(true);
      localStorage.setItem("userId", userId);
      localStorage.setItem("username", username);
      localStorage.setItem("email", email);
      setUserData({
        username,
        email,
        userId,
      });
    } else {
      toast.error(
        "Session has not started yet or Maximum participant limit reached. Cannot join the meeting."
      );
    }
    console.log("🚀 ~ file: MeetRoom.tsx:261 ~ MeetRoom ~ response:", response);
  };

  const checkInterviewerStatus = async () => {
    if (roomId && data?._id) {
      const response = await appDispatch(
        verifyIntervewe({ uniqueId: roomId, userId: data._id })
      );
      if (response.payload.success) {
        setInterviewerJoined(true);
        setUserData({
          username: data?.username as string,
          email: data?.email as string,
          userId: data?._id,
        });
      }
    }
  };
  const handleLeaveInterivewer = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    checkInterviewerStatus();
  }, [roomId, appDispatch, data]);

  
   
  if (!data && !isFormSubmitted) {
    return <MeetValidation RoomID={roomId} onSubmit={handleFormSubmit} />;
  }
  const handleConfirm = () => {
    setIsModalOpen(false);
    socket?.emit("Interviewer-left", {
      roomId,
      peerId: peerInstance.current?.id,
    });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

   return (
     <>
       {isModalOpen && (
         <ConfirmModal
           message={`leave this meet`}
           onConfirm={handleConfirm}
           onCancel={handleCancel}
         />
       )}
       <div className="relative h-screen w-full bg-black">
         <div
           className={`absolute inset-0 flex ${
             isOpenTerminal ? "flex-row" : "items-center justify-center"
           }`}
         >
           {isOpenTerminal && (
             <div className="w-[70%] h-full border-r-2 border-gray-600">
               <CodeEditor roomId={roomId} setIsOpenTerminal={setIsOpenTerminal} />
             </div>
           )}
           <div
             className={`${isOpenTerminal ? "w-[30%]" : "w-full"} h-full p-4`}
           >
             <div
               className={`grid gap-4 h-full ${
                 isOpenTerminal
                   ? "grid-cols-1 sm:grid-cols-2"
                   : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
               }`}
             >
               <div className="relative">
                 <VideoPlayer stream={stream} username={userData.username as string} muted />
                
               </div>
               {Object.entries(peers as PeerState).map(([peerId, peer]) => {
                 if (userData.username !== peer.userName) {
                   return (
                     <div key={peerId} className="">
                       <VideoPlayer stream={peer.stream} username={peer.userName as string} />
                       
                     </div>
                   );
                 }
                 return null;
               })}
             </div>
           </div>
         </div>
         <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center py-4 bg-gray-900 bg-opacity-75">
           <button
             className="text-white mx-4 p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
             onClick={OpenTerminal}
           >
             <TerminalIcon />
           </button>
           <button
             className="text-white mx-4 p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
             onClick={toggleVideo}
           >
             {videoEnabled ? (
               <IoVideocamOutline size={24} />
             ) : (
               <IoVideocamOffOutline size={24} />
             )}
           </button>
           <button
             className="text-white mx-4 p-3 rounded-full bg-green-600 hover:bg-green-500 transition-colors"
             onClick={toggleAudio}
           >
             {audioEnabled ? (
               <IoMicOutline size={24} />
             ) : (
               <IoMicOffOutline size={24} />
             )}
           </button>
           <button className="text-white mx-4 p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
             <MdOutlineMoreVert />
           </button>
           {data?.role === "interviewer" || data?.role === "pending" ? (
             <button
               className="text-white mx-4 p-3 rounded-full bg-red-600 hover:bg-red-500 transition-colors"
               onClick={handleLeaveInterivewer}
             >
               <MdCallEnd size={24} />
             </button>
           ) : (
             <button
               className="text-white mx-4 p-3 rounded-full bg-red-600 hover:bg-red-500 transition-colors"
               onClick={leaveRoom}
             >
               <MdCallEnd size={24} />
             </button>
           )}
         </div>
       </div>
     </>
   );
};

export default MeetRoom;
// <div
//   className={`w-full h-full ${
//     isOpenTerminal ? "max-w-[400px]" : "max-w-full"
//   } mx-auto`}
// >
// MeetRoom.tsx
// import React, { useContext, useEffect, useState, useRef } from "react";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { toast } from "sonner";
// import { v4 as uuidv4 } from "uuid";
// import {
//   IoMicOffOutline,
//   IoMicOutline,
//   IoVideocamOffOutline,
//   IoVideocamOutline,
// } from "react-icons/io5";
// import { MdCallEnd, MdOutlineMoreVert } from "react-icons/md";
// import TerminalIcon from "@mui/icons-material/Terminal";

// import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
// import { RooteState } from "@/redux/store";
// import { SocketContext } from "@/context/SocketProvider";
// import { MeetValidation } from "@/components/common/Meet/MeetValidation";
// import { InterivieweeMeetAcess } from "@/redux/store/actions/common/IntervieweeMeetAccessAction";
// import { verifyIntervewe } from "@/redux/store/actions/common/verifyHost";
// import { VideoPlayer } from "@/components/common/Meet/VideoPlayer";
// import CodeEditor from "@/components/common/editor/CodeEditor";
// import ConfirmModal from "@/components/common/users/ConfirmModal";

// import { useMediaStream } from "@/hooks/useMediaStream";
// import { usePeerConnection } from "@/hooks/usePeerConnection";
// import { useRoomManagement } from "@/hooks/useRoomManagement";
// import { PeerState } from "@/reducers/peerReducer";

// const MeetRoom = () => {
//   const { uniqueId } = useParams();
//   const roomId = uniqueId || "";
//   const navigate = useNavigate();
//   const location = useLocation();
//   const appDispatch = useAppDispatch();
//   const { socket } = useContext(SocketContext) || {};
//   const { data } = useAppSelector((state: RooteState) => state.user);

//   const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
//   const [interviewerJoined, setInterviewerJoined] = useState<boolean>(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [userData, setUserData] = useState<{
//     username: string;
//     email: string;
//     userId: string | null;
//   }>({
//     username: "",
//     email: "",
//     userId: null,
//   });

//   const myVideoRef = useRef<HTMLVideoElement | null>(null);

//   // Moved to local state to control stream initialization
//   const [streamInitialized, setStreamInitialized] = useState<boolean>(false);
//   const { stream, videoEnabled, audioEnabled, toggleVideo, toggleAudio } =
//     useMediaStream(streamInitialized);
//   const { peers, peerInstance } = usePeerConnection(
//     socket,
//     roomId,
//     userData.userId as string,
//     userData.username,
//     stream
//   );
//   const { isOpenTerminal, openTerminal, leaveRoom, roomLength } =
//     useRoomManagement(socket, roomId);

//   useEffect(() => {
//     const storedUserId = localStorage.getItem("userId");
//     const storedUsername = localStorage.getItem("username");
//     const storedEmail = localStorage.getItem("email");
//     const isGuest = !data;
//     if (isGuest && storedUserId && storedUsername && storedEmail) {
//       setUserData({
//         userId: storedUserId,
//         username: storedUsername,
//         email: storedEmail,
//       });
//       setIsFormSubmitted(true);
//     }
//   }, [data]);

//   useEffect(() => {
//     const preventNavigation = (event: PopStateEvent) => {
//       navigate(location.pathname, { replace: true });
//       event.preventDefault();
//       const confirmMessage = "Are you sure you want to leave the meeting?";
//       if (window.confirm(confirmMessage)) {
//         leaveRoom();
//       }
//     };

//     window.history.pushState(null, "", location.pathname);
//     window.addEventListener("popstate", preventNavigation);

//     return () => {
//       window.removeEventListener("popstate", preventNavigation);
//     };
//   }, [navigate, location, leaveRoom]);

//   useEffect(() => {
//     if (stream && myVideoRef.current) {
//       myVideoRef.current.srcObject = stream;
//     }
//   }, [stream]);

//   const handleFormSubmit = async (formData: {
//     username: string;
//     email: string;
//   }) => {
//     const { username, email } = formData;
//     const userId = uuidv4();
//     const response = await appDispatch(
//       InterivieweeMeetAcess({
//         uniqueId: roomId,
//         email: email,
//       })
//     );
//     if (response.payload.success) {
//       setIsFormSubmitted(true);
//       setStreamInitialized(true);
//       localStorage.setItem("userId", userId);
//       localStorage.setItem("username", username);
//       localStorage.setItem("email", email);
//       setUserData({
//         username,
//         email,
//         userId,
//       });
//     } else {
//       toast.error("Session has not started yet");
//     }
//   };

//   const checkInterviewerStatus = async () => {
//     if (roomId && data?._id) {
//       const response = await appDispatch(
//         verifyIntervewe({ uniqueId: roomId, userId: data._id })
//       );
//       if (response.payload.success) {
//         setStreamInitialized(true)
//         setInterviewerJoined(true);
//         setUserData({
//           username: data?.username as string,
//           email: data?.email as string,
//           userId: data?._id,
//         });
//       }
//     }
//   };

//   useEffect(() => {
//     checkInterviewerStatus();
//   }, [roomId, appDispatch, data]);

//   const handleLeaveInterviewer = () => {
//     setIsModalOpen(true);
//   };

//   const handleConfirm = () => {
//     setIsModalOpen(false);
//     socket?.emit("Interviewer-left", { roomId });
//     leaveRoom();
//   };

//   const handleLeaveRoom = () => {
//     leaveRoom();
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//   };

//   if (!data && !isFormSubmitted) {
//     return <MeetValidation RoomID={roomId} onSubmit={handleFormSubmit} />;
//   }

//   return (
//     <>
//       {isModalOpen && (
//         <ConfirmModal
//           message={`leave this meet`}
//           onConfirm={handleConfirm}
//           onCancel={handleCancel}
//         />
//       )}
//       <div className="relative h-screen w-full bg-black">
//         <div
//           className={`absolute inset-0 flex ${
//             isOpenTerminal ? "flex-row" : "items-center justify-center"
//           }`}
//         >
//           {isOpenTerminal && (
//             <div className="w-[70%] h-full border-r-2 border-gray-600">
//               <CodeEditor roomId={roomId} />
//             </div>
//           )}
//           <div
//             className={`${isOpenTerminal ? "w-[30%]" : "w-full"} h-full p-4`}
//           >
//             <div
//               className={`grid gap-4 h-full ${
//                 isOpenTerminal
//                   ? "grid-cols-1 sm:grid-cols-2"
//                   : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
//               }`}
//             >
//               <div className="relative">
//                 <VideoPlayer stream={stream} muted />
//                 <div className="absolute left-2 text-white bg-black bg-opacity-50 px-2 py-1 rounded">
//                   {userData?.username || "You"}
//                 </div>
//               </div>
//               {Object.entries(peers as PeerState).map(([peerId, peer]) => {
//                 if (
//                   userData.username !== peer.userName &&
//                   peer.userName !== "participant"
//                 ) {
//                   return (
//                     <div key={peerId} className="">
//                       <VideoPlayer stream={peer.stream} />
//                       <div className="absolute text-white bg-black bg-opacity-50 px-2 py-1 rounded">
//                         {peer.userName || "Participant"}
//                       </div>
//                     </div>
//                   );
//                 }
//                 return null;
//               })}
//             </div>
//           </div>
//         </div>
//         <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center py-4 bg-gray-900 bg-opacity-75">
//           <button
//             className="text-white mx-4 p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
//             onClick={openTerminal}
//           >
//             <TerminalIcon />
//           </button>
//           <button
//             className="text-white mx-4 p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
//             onClick={toggleVideo}
//           >
//             {videoEnabled ? (
//               <IoVideocamOutline size={24} />
//             ) : (
//               <IoVideocamOffOutline size={24} />
//             )}
//           </button>
//           <button
//             className="text-white mx-4 p-3 rounded-full bg-green-600 hover:bg-green-500 transition-colors"
//             onClick={toggleAudio}
//           >
//             {audioEnabled ? (
//               <IoMicOutline size={24} />
//             ) : (
//               <IoMicOffOutline size={24} />
//             )}
//           </button>
//           <button
//             className="text-white mx-4 p-3 rounded-full bg-red-600 hover:bg-red-500 transition-colors"
//             onClick={handleLeaveInterviewer}
//           >
//             <MdCallEnd size={24} />
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default MeetRoom;
