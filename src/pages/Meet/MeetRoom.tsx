// import React, {
//   useEffect,
//   useRef,
//   useState,
//   useCallback,
//   useContext,
// } from "react";
// import io from "socket.io-client";
// import { useParams } from "react-router-dom";
// import {
//   IoMicOffOutline,
//   IoMicOutline,
//   IoVideocamOffOutline,
//   IoVideocamOutline,
//   IoCallOutline,
// } from "react-icons/io5";
// import "tailwindcss/tailwind.css";
// import { verifyIntervewe } from "@/redux/store/actions/common/verifyHost";
// import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
// import { RooteState } from "@/redux/store";
// import { MeetValidation } from "@/components/common/Meet/MeetValidation";
// import { toast } from "sonner";
// import { InterivieweeMeetAcess } from "@/redux/store/actions/common/IntervieweeMeetAccessAction";
// import { servers } from "@/common/WebRTCserver";
// import { v4 as uuidv4 } from "uuid";
// import { SocketContext, SocketProvider } from "@/context/SocketProvider";

// // Initialize socket connection
// // const socket = io("http://localhost:4002");

// const MeetRoom = () => {
//   const { data } = useAppSelector((state: RooteState) => state.user);
//   const dispatch = useAppDispatch();
//   const { uniqueId } = useParams();
//   const localVideoRef = useRef<HTMLVideoElement>(null);
//   const [localStream, setLocalStream] = useState<MediaStream | null>(null);
//   const [isFormSubmitted, setIsFormSubmitted] = useState(false);
//   const [isInterviewer, setIsInterviewer] = useState(false);
//   const [remoteStreams, setRemoteStreams] = useState<{
//     [key: string]: MediaStream;
//   }>({});
//   const [micMuted, setMicMuted] = useState(false);
//   const [videoOff, setVideoOff] = useState(false);
//   const [interviewerJoined, setInterviewerJoined] = useState(false);
//   const peerConnectionsRef = useRef<{ [key: string]: RTCPeerConnection }>({});
//   const { socket, onlineUsers, setOnlineUsers } =
//     useContext(SocketContext) || {};

//   const createPeerConnection = useCallback(
//     (peerId: string) => {
//       console.log(`Creating peer connection for ${peerId}`);
//       if (peerConnectionsRef.current[peerId]) {
//         console.log(`Peer connection for ${peerId} already exists`);
//         return peerConnectionsRef.current[peerId];
//       }

//       const pc = new RTCPeerConnection(servers);

//       pc.onicecandidate = (event) => {
//         if (event.candidate) {
//           console.log(`Sending ICE candidate to ${peerId}`);
//           socket?.emit("webrtc-ice-candidate", {
//             candidate: event.candidate,
//             uniqueId,
//             peerId,
//           });
//         }
//       };

//       pc.oniceconnectionstatechange = () => {
//         console.log(
//           `ICE connection state for ${peerId}: ${pc.iceConnectionState}`
//         );
//       };

//       pc.ontrack = (event) => {
//         console.log(`Received remote track from ${peerId}`);
//         setRemoteStreams((prevStreams) => ({
//           ...prevStreams,
//           [peerId]: event.streams[0],
//         }));
//       };

//       if (localStream) {
//         console.log(`Adding local tracks to peer connection ${peerId}`);
//         localStream.getTracks().forEach((track) => {
//           pc.addTrack(track, localStream);
//         });
//       } else {
//         console.warn(
//           `Local stream not available when creating peer connection for ${peerId}`
//         );
//       }

//       peerConnectionsRef.current[peerId] = pc;
//       return pc;
//     },
//     [localStream, uniqueId]
//   );

//  const startLocalStream = useCallback(async () => {
//    console.log("startLocalStream called");
//    if (localStream) {
//      console.log("Local stream already exists");
//      return;
//    }

//    try {
//      console.log("Accessing local media devices");
//      const stream = await navigator.mediaDevices.getUserMedia({
//        video: true,
//        audio: true,
//      });
//      console.log("Local stream obtained");
//      setLocalStream(stream);
//      if (localVideoRef.current) {
//        localVideoRef.current.srcObject = stream;
//      }
//      return stream;
//    } catch (err) {
//      console.error("Error accessing media devices", err);
//      toast.error("Failed to access camera and microphone");
//      return null;
//    }
//  }, [localStream]);

//   const initializeCallHandlers = useCallback(() => {
//     socket?.on(
//       "webrtc-offer",
//       async (offer: RTCSessionDescriptionInit, offerPeerId: string) => {
//         console.log(`Received offer from ${offerPeerId}`);
//         const pc = createPeerConnection(offerPeerId);
//         try {
//           await pc.setRemoteDescription(new RTCSessionDescription(offer));
//           const answer = await pc.createAnswer();
//           await pc.setLocalDescription(answer);
//           socket?.emit("webrtc-answer", {
//             answer,
//             uniqueId,
//             peerId: offerPeerId,
//           });
//         } catch (error) {
//           console.error("Error handling offer:", error);
//           toast.error("Failed to establish connection");
//         }
//       }
//     );

//     socket?.on(
//       "webrtc-answer",
//       async (answer: RTCSessionDescriptionInit, answerPeerId: string) => {
//         console.log(`Received answer from ${answerPeerId}`);
//         const pc = peerConnectionsRef.current[answerPeerId];
//         if (pc) {
//           try {
//             await pc.setRemoteDescription(new RTCSessionDescription(answer));
//           } catch (error) {
//             console.error("Error setting remote description:", error);
//             toast.error("Failed to complete connection setup");
//           }
//         } else {
//           console.error(`No peer connection found for ${answerPeerId}`);
//         }
//       }
//     );

//     socket?.on(
//       "webrtc-ice-candidate",
//       async ({
//         candidate,
//         peerId,
//       }: {
//         candidate: RTCIceCandidateInit;
//         peerId: string;
//       }) => {
//         console.log(`Received ICE candidate from ${peerId}`);
//         const pc = peerConnectionsRef.current[peerId];
//         if (pc) {
//           try {
//             await pc.addIceCandidate(new RTCIceCandidate(candidate));
//           } catch (error) {
//             console.error("Error adding ICE candidate:", error);
//           }
//         } else {
//           console.error(`No peer connection found for ${peerId}`);
//         }
//       }
//     );

//     socket?.on("user-joined", async (userId: string) => {
//       console.log(`User ${userId} joined the room`);
//       if (isInterviewer || interviewerJoined) {
//         await startCall(userId);
//       }
//     });

//     socket?.on("user-left", (userId: string) => {
//       console.log(`User ${userId} left the room`);
//       setRemoteStreams((prevStreams) => {
//         const newStreams = { ...prevStreams };
//         delete newStreams[userId];
//         return newStreams;
//       });
//       if (peerConnectionsRef.current[userId]) {
//         peerConnectionsRef.current[userId].close();
//         delete peerConnectionsRef.current[userId];
//       }
//     });
//   }, [createPeerConnection, uniqueId, isInterviewer, interviewerJoined]);

// useEffect(() => {
//   const initialize = async () => {
//     await startLocalStream();
//     socket?.emit("join-room", uniqueId);
//     initializeCallHandlers();
//   };

//   initialize();

//   return () => {
//     if (localStream) {
//       localStream.getTracks().forEach((track) => track.stop());
//     }
//     socket?.off("webrtc-offer");
//     socket?.off("webrtc-answer");
//     socket?.off("webrtc-ice-candidate");
//     socket?.off("user-joined");
//     socket?.off("user-left");
//   };
// }, [uniqueId, startLocalStream, initializeCallHandlers, localStream]);

//   const checkInterviewerStatus = useCallback(async () => {
//     if (uniqueId && data?._id) {
//       try {
//         const response = await dispatch(
//           verifyIntervewe({ uniqueId, userId: data._id })
//         );
//         if (response.payload.success) {
//           setInterviewerJoined(true);
//           setIsFormSubmitted(true);
//           setIsInterviewer(true);
//           socket?.emit("interviewer-joined", uniqueId);
//         }
//       } catch (error) {
//         console.error("Error checking interviewer status:", error);
//         toast.error("Failed to verify interviewer status");
//       }
//     }
//   }, [uniqueId, data, dispatch]);

//   useEffect(() => {
//     checkInterviewerStatus();
//   }, [checkInterviewerStatus]);

//   const toggleMic = () => {
//     if (localStream) {
//       localStream.getAudioTracks().forEach((track) => {
//         track.enabled = !micMuted;
//         console.log(`Microphone ${micMuted ? "unmuted" : "muted"}`);
//       });
//       setMicMuted(!micMuted);
//     }
//   };

//   const toggleVideo = () => {
//     if (localStream) {
//       localStream.getVideoTracks().forEach((track) => {
//         track.enabled = !videoOff;
//         console.log(`Video ${videoOff ? "enabled" : "disabled"}`);
//       });
//       setVideoOff(!videoOff);
//     }
//   };

//   const startCall = async (targetPeerId?: string) => {
//     const peerId = targetPeerId || uuidv4();
//     console.log(`Starting call with peer ID: ${peerId}`);
//     const pc = createPeerConnection(peerId);
//     try {
//       const offer = await pc.createOffer();
//       await pc.setLocalDescription(offer);
//       socket?.emit("webrtc-offer", { offer, uniqueId, peerId });
//     } catch (error) {
//       console.error("Error starting call:", error);
//       toast.error("Failed to start call");
//     }
//   };

//   const handleFormSubmit = async (formData: {
//     username: string;
//     email: string;
//   }) => {
//     const { username, email } = formData;
//     sessionStorage.setItem("username", username);
//     sessionStorage.setItem("email", email);

//     try {
//       const response = await dispatch(
//         InterivieweeMeetAcess({
//           uniqueId: uniqueId as string,
//           email: email as string,
//         })
//       );

//       if (response.payload.success) {
//         setInterviewerJoined(true);
//         setIsFormSubmitted(true);
//         socket?.emit("interviewee-joined", uniqueId);
//       } else {
//         toast.error("Session has not started yet");
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       toast.error("Failed to join session");
//     }
//   };

//   if (!data && !isFormSubmitted) {
//     return (
//       <MeetValidation RoomID={uniqueId || ""} onSubmit={handleFormSubmit} />
//     );
//   }

//   if (interviewerJoined && isFormSubmitted) {
//     return (
//       <div className="h-screen flex flex-col">
//         <div className="flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
//           <video
//             ref={localVideoRef}
//             autoPlay
//             muted
//             playsInline
//             className="w-full h-full bg-gray-800 rounded-md"
//           />
//           {Object.entries(remoteStreams).map(([peerId, stream]) => (
//             <video
//               key={peerId}
//               autoPlay
//               playsInline
//               className="w-full h-full bg-gray-800 rounded-md"
//               ref={(el) => {
//                 if (el) {
//                   el.srcObject = stream;
//                   console.log(
//                     `Set remote stream ${stream.id} to video element for peer ${peerId}`
//                   );
//                 }
//               }}
//             />
//           ))}
//         </div>
//         <div className="flex justify-center items-center py-4 bg-gray-900">
//           <button
//             onClick={toggleMic}
//             className="text-white mx-4 p-3 rounded-full bg-gray-800 hover:bg-gray-700"
//           >
//             {micMuted ? (
//               <IoMicOffOutline size={24} />
//             ) : (
//               <IoMicOutline size={24} />
//             )}
//           </button>
//           <button
//             onClick={toggleVideo}
//             className="text-white mx-4 p-3 rounded-full bg-gray-800 hover:bg-gray-700"
//           >
//             {videoOff ? (
//               <IoVideocamOffOutline size={24} />
//             ) : (
//               <IoVideocamOutline size={24} />
//             )}
//           </button>
//           <button
//             onClick={() => {
//               console.log("End Call clicked");
//               // Implement end call logic here
//             }}
//             className="text-white mx-4 p-3 rounded-full bg-red-600 hover:bg-red-500"
//           >
//             <IoCallOutline size={24} />
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return <div>Loading...</div>;
// };

// export default MeetRoom;
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import {
  IoMicOffOutline,
  IoMicOutline,
  IoVideocamOffOutline,
  IoVideocamOutline,
  IoCallOutline,
} from "react-icons/io5";
import { toast } from "sonner";
import { servers } from "@/common/WebRTCserver";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { RooteState } from "@/redux/store";
import { v4 as uuidv4 } from "uuid";
import { verifyIntervewe } from "@/redux/store/actions/common/verifyHost";
import { MeetValidation } from "@/components/common/Meet/MeetValidation";
import { InterivieweeMeetAcess } from "@/redux/store/actions/common/IntervieweeMeetAccessAction";

const MeetRoom: React.FC = () => {
  const { data } = useAppSelector((state: RooteState) => state.user);
  const dispatch = useAppDispatch();
  const [interviewerJoined, setInterviewerJoined] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const { uniqueId } = useParams<{ uniqueId: string }>();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStreams, setRemoteStreams] = useState<{
    [key: string]: MediaStream;
  }>({});
  const [micMuted, setMicMuted] = useState(false);
  const [videoOff, setVideoOff] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [isInterviewer, setIsInterviewer] = useState(false);
  const peerConnections = useRef<{ [key: string]: RTCPeerConnection }>({});
  const myVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>(
    {}
  );
  // const userId = uuidv4(); 
  useEffect(() => {
    let storedUserId = localStorage.getItem("userId");
    if (!storedUserId) {
      storedUserId = uuidv4();
      localStorage.setItem("userId", storedUserId);
    }
    setUserId(storedUserId);
  }, []);

  useEffect(() => {
    // Determine if the user is an interviewer based on your app's logic
    // For example, you might check if the user has a certain role in your user data
    setIsInterviewer(data?.role === "interviewer");
  }, [data]);

  useEffect(() => {
    const newSocket = io("http://localhost:4002");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket || !uniqueId) return;

    const handleRoomJoined = ({
      roomId,
      userId: assignedUserId,
    }: {
      roomId: string;
      userId: string;
    }) => {
      setUserId(assignedUserId);
      toast.success(`Joined room ${roomId}`);
    };

    const handleUserConnected = (newUserId: string) => {
      toast.info(`User ${newUserId} connected`);
      if (localStream) {
        createPeerConnection(newUserId, true);
      }
    };
    const handleExistingParticipants = (existingUsers: any) => {
      existingUsers.forEach((existingUserId: string) => {
        if (existingUserId !== userId) {
          const pc = createPeerConnection(existingUserId, false);
          if (localStream) {
            localStream
              .getTracks()
              .forEach((track) => pc.addTrack(track, localStream));
          }
        }
      });
    };

    const handleWebRTCSignal = async (datas: {
      type: string;
      signal: any;
      from: string;
    }) => {
      const pc =
        peerConnections.current[datas.from] ||
        createPeerConnection(datas.from, false);
      if (datas.type === "offer") {
        await pc.setRemoteDescription(new RTCSessionDescription(datas.signal));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        socket.emit("webrtc-signal", {
          type: "answer",
          signal: answer,
          to: datas.from,
          from: userId,
        });
      } else if (datas.type === "answer") {
        await pc.setRemoteDescription(new RTCSessionDescription(datas.signal));
      } else if (datas.type === "candidate") {
        await pc.addIceCandidate(new RTCIceCandidate(datas.signal));
      }
    };

    const handleUserDisconnected = (disconnectedUserId: string) => {
      toast.info(`User ${disconnectedUserId} disconnected`);
      if (peerConnections.current[disconnectedUserId]) {
        peerConnections.current[disconnectedUserId].close();
        delete peerConnections.current[disconnectedUserId];
      }
      setRemoteStreams((prev) => {
        const newStreams = { ...prev };
        delete newStreams[disconnectedUserId];
        return newStreams;
      });
    };

    socket.on("room-joined", handleRoomJoined);
    socket.on("user-connected", handleUserConnected);
    socket.on("existing-participants", handleExistingParticipants);
    socket.on("webrtc-signal", handleWebRTCSignal);
    socket.on("user-disconnected", handleUserDisconnected);

    if (isInterviewer) {
      socket.emit("create-room", uniqueId, data?._id || "interviewer");
    } else {
      socket.emit("join-room", uniqueId);
    }

    return () => {
      socket.off("room-joined", handleRoomJoined);
      socket.off("user-connected", handleUserConnected);
      socket.off("existing-participants", handleExistingParticipants);
      socket.off("webrtc-signal", handleWebRTCSignal);
      socket.off("user-disconnected", handleUserDisconnected);
    };
  }, [socket, uniqueId, userId, localStream, isInterviewer, data]);

  const createPeerConnection = useCallback(
    (peerId: string, isInitiator: boolean) => {
      if (peerConnections.current[peerId])
        return peerConnections.current[peerId];

      const pc = new RTCPeerConnection(servers);

      pc.onicecandidate = (event) => {
        if (event.candidate) {
          socket?.emit("webrtc-signal", {
            type: "candidate",
            signal: event.candidate,
            to: peerId,
            from: userId,
          });
        }
      };

      pc.ontrack = (event) => {
        console.log("Received remote track:", event.streams[0]);
        setRemoteStreams((prev) => ({
          ...prev,
          [peerId]: event.streams[0],
        }));
      };

      if (localStream) {
        localStream.getTracks().forEach((track) => {
          pc.addTrack(track, localStream);
        });
      }

      if (isInitiator) {
        pc.createOffer().then((offer) => {
          pc.setLocalDescription(offer);
          socket?.emit("webrtc-signal", {
            type: "offer",
            signal: offer,
            to: peerId,
            from: userId,
          });
        });
      }

      peerConnections.current[peerId] = pc;
      return pc;
    },
    [socket, userId, localStream]
  );

  useEffect(() => {
    const startLocalStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setLocalStream(stream);
        if (myVideoRef.current) {
          myVideoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing media devices:", err);
        toast.error(
          "Failed to access camera and microphone. Please check your permissions."
        );
      }
    };

    startLocalStream();

    return () => {
      localStream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

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
  useEffect(() => {
    Object.keys(remoteStreams).forEach((peerId) => {
      if (remoteVideoRefs.current[peerId]) {
        remoteVideoRefs.current[peerId].srcObject = remoteStreams[peerId];
      }
    });
  }, [remoteStreams]);

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
      <div className="h-screen flex flex-col">
        <div className="flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          <video
            ref={myVideoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full bg-gray-800 rounded-md"
          />
          {Object.entries(remoteStreams).map(([peerId, stream]) => (
            <video
              key={peerId}
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
            className="text-white mx-4 p-3 rounded-full bg-red-600 hover:bg-red-500"
            onClick={() => {
              // Implement leave call functionality
            }}
          >
            <IoCallOutline size={24} />
          </button>
        </div>
      </div>
    );
  }
};

export default MeetRoom;

// import React, { useContext, useEffect, useRef, useState } from "react";
// import { useParams } from "react-router-dom";
// import {
//   IoMicOffOutline,
//   IoMicOutline,
//   IoVideocamOffOutline,
//   IoVideocamOutline,
// } from "react-icons/io5";
// import Peer, { MediaConnection, Peer as PeerJS } from "peerjs";
// import { SocketContext } from "@/context/SocketProvider";

// interface GroupCallJoinRequestData {
//   peerId: string;
//   streamId: string;
//   roomId: string;
// }

// const MeetRoom: React.FC = () => {
//   const { uniqueId } = useParams<{ uniqueId: string }>();
//   const { socket } = useContext(SocketContext) || {};
//   const myPeer = useRef<PeerJS | null>(null);
//   const myStream = useRef<MediaStream | null>(null);
//   const [remoteStreams, setRemoteStreams] = useState<{
//     [key: string]: MediaStream;
//   }>({});
//   const [isMicOn, setMicOn] = useState(true);
//   const [isCameraOn, setCameraOn] = useState(true);

//   useEffect(() => {
//     if (!socket || !uniqueId) return;

//     // Initialize Peer
//     myPeer.current = new Peer();

//     // Event when peer is open
//     myPeer.current.on("open", (id: string) => {
//       console.log("My peer ID is: " + id);

//       if (myStream.current) {
//         socket.emit("group-call-register", {
//           peerId: id,
//           roomId: uniqueId,
//         });

//         socket.emit("group-call-join-request", {
//           roomId: uniqueId,
//           peerId: id,
//           streamId: myStream.current.id,
//         });
//       }
//     });

//     // Event when receiving an incoming call
//     myPeer.current.on("call", (call: MediaConnection) => {
//       console.log("Incoming call from peer:", call.peer);

//       if (myStream.current) {
//         call.answer(myStream.current);
//         call.on("stream", (remoteStream: MediaStream) => {
//           console.log("Received remote stream from peer:", call.peer);
//           setRemoteStreams((prev) => ({ ...prev, [call.peer]: remoteStream }));
//         });
//       }
//     });

//     // Socket event when another user requests to join
//     socket.on("group-call-join-request", (data: GroupCallJoinRequestData) => {
//       console.log("Received join request from peer:", data.peerId);

//       if (myPeer.current) {
//         const call = myPeer.current.call(
//           data.peerId,
//           myStream.current as MediaStream
//         );
//         call.on("stream", (remoteStream: MediaStream) => {
//           console.log("Received remote stream for peer:", data.peerId);
//           setRemoteStreams((prev) => ({
//             ...prev,
//             [data.peerId]: remoteStream,
//           }));
//         });
//       }
//     });

//     // Get user media
//     navigator.mediaDevices
//       .getUserMedia({ video: true, audio: true })
//       .then((stream) => {
//         myStream.current = stream;
//         console.log("Local stream acquired");
//       })
//       .catch((err) => console.error("Failed to get local stream", err));

//     return () => {
//       if (myStream.current) {
//         myStream.current.getTracks().forEach((track) => track.stop());
//       }
//       if (myPeer.current) {
//         myPeer.current.destroy();
//       }
//     };
//   }, [uniqueId, socket]);

//   const toggleMic = () => {
//     if (myStream.current) {
//       myStream.current
//         .getAudioTracks()
//         .forEach((track) => (track.enabled = !track.enabled));
//       setMicOn((prev) => !prev);
//     }
//   };

//   const toggleCamera = () => {
//     if (myStream.current) {
//       myStream.current
//         .getVideoTracks()
//         .forEach((track) => (track.enabled = !track.enabled));
//       setCameraOn((prev) => !prev);
//     }
//   };

//   return (
//     <div className="p-4 flex flex-col h-screen">
//       <h2 className="text-2xl font-semibold mb-4">Meet Room</h2>
//       <div className="flex-grow flex flex-wrap gap-4">
//         {myStream.current && (
//           <video
//             id="myVideo"
//             autoPlay
//             muted
//             playsInline
//             className="w-64 h-48 bg-gray-800 rounded-md border-2 border-green-500"
//             ref={(el) => {
//               if (el) {
//                 el.srcObject = myStream.current;
//               }
//             }}
//           />
//         )}
//         {Object.entries(remoteStreams).map(([peerId, stream]) => (
//           <video
//             key={peerId}
//             id={`remote-${peerId}`}
//             autoPlay
//             playsInline
//             className="w-64 h-48 bg-gray-800 rounded-md border-2 border-blue-500"
//             ref={(el) => {
//               if (el) {
//                 el.srcObject = stream;
//               }
//             }}
//           />
//         ))}
//       </div>
//       <div className="mt-4 flex justify-center gap-4">
//         <button
//           onClick={toggleMic}
//           className={`p-2 rounded-full ${
//             isMicOn ? "bg-green-500" : "bg-gray-500"
//           }`}
//         >
//           {isMicOn ? (
//             <IoMicOutline className="text-white" size={24} />
//           ) : (
//             <IoMicOffOutline className="text-white" size={24} />
//           )}
//         </button>
//         <button
//           onClick={toggleCamera}
//           className={`p-2 rounded-full ${
//             isCameraOn ? "bg-blue-500" : "bg-gray-500"
//           }`}
//         >
//           {isCameraOn ? (
//             <IoVideocamOutline className="text-white" size={24} />
//           ) : (
//             <IoVideocamOffOutline className="text-white" size={24} />
//           )}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MeetRoom;
