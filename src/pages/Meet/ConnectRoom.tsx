import React, { useContext, useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import { SocketContext } from "@/context/SocketProvider";
import { useParams } from "react-router-dom";
import { Socket } from "socket.io-client";
import {
  Mic,
  MicOff,
  Videocam,
  VideocamOff,
  CallEnd,
} from "@mui/icons-material";
import LocalVideoView from "@/components/common/Meet/LocalVideoView";

const ConnectRoom: React.FC = () => {
  const [peers, setPeers] = useState<{ peerID: string; peer: Peer.Instance }[]>(
    []
  );
  const [myStream, setMyStream] = useState<MediaStream | null>(null);
  const { socket } = useContext(SocketContext) || {};
  const socketRef = useRef<Socket | null>(null);
  const myVideoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isInterviewer, setIsInterviewer] = useState(false);
  const { uniqueId } = useParams<{ uniqueId?: string }>();

  useEffect(() => {
    if (!socket || !uniqueId) return;

    const startMediaStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setMyStream(stream);
        if (myVideoRef.current) {
          myVideoRef.current.srcObject = stream;
        }

        socketRef.current?.emit(
          "join-room",
          uniqueId,
          (response: { isInterviewer: boolean }) => {
            setIsInterviewer(response.isInterviewer);
          }
        );

        socketRef.current?.on(
          "user-connected",
          ({ userId, isInterviewer: newUserIsInterviewer }) => {
            const peer = createPeer(userId, socket.id as string, stream);
            setPeers((users) => [...users, { peerID: userId, peer }]);
          }
        );

        socketRef.current?.on("user-signal", ({ userId, signal }) => {
          const peer = peers.find((p) => p.peerID === userId)?.peer;
          if (peer) {
            peer.signal(signal);
          }
        });

        socketRef.current?.on("user-disconnected", (userId) => {
          setPeers((users) => users.filter((user) => user.peerID !== userId));
        });
      } catch (error) {
        console.error("Error accessing media devices:", error);
      }
    };

    startMediaStream();

    return () => {
      myStream?.getTracks().forEach((track) => track.stop());
      peers.forEach(({ peer }) => peer.destroy());
      socketRef.current?.disconnect();
    };
  }, [socket, uniqueId]);

  function createPeer(
    userToSignal: string,
    callerID: string,
    stream: MediaStream
  ) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current?.emit("signal", { userToSignal, callerID, signal });
    });

    return peer;
  }

  const toggleMute = () => {
    if (myStream) {
      const audioTrack = myStream.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      setIsMuted(!audioTrack.enabled);
    }
  };

  const toggleVideo = () => {
    if (myStream) {
      const videoTrack = myStream.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
      setIsVideoOff(!videoTrack.enabled);
    }
  };

  const leaveRoom = () => {
    myStream?.getTracks().forEach((track) => track.stop());
    peers.forEach(({ peer }) => peer.destroy());
    socketRef.current?.disconnect();
  };

  if (!uniqueId) {
    return <div>Invalid room ID</div>;
  }

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <LocalVideoView videoRef={myVideoRef} />
        {peers.map(({ peerID, peer }) => (
          <video
            key={peerID}
            ref={(node) => {
              if (node) node.srcObject = peer.streams[0];
            }}
            className="w-64 h-48 object-cover rounded-lg"
            autoPlay
            playsInline
          />
        ))}
      </div>
      <div className="flex space-x-4">
        <button onClick={toggleMute} className="p-2 rounded-full bg-gray-200">
          {isMuted ? <MicOff /> : <Mic />}
        </button>
        <button onClick={toggleVideo} className="p-2 rounded-full bg-gray-200">
          {isVideoOff ? <VideocamOff /> : <Videocam />}
        </button>
        <button
          onClick={leaveRoom}
          className="p-2 rounded-full bg-red-500 text-white"
        >
          <CallEnd />
        </button>
      </div>
      {isInterviewer && <div className="mt-4">You are the interviewer</div>}
    </div>
  );
};

export default ConnectRoom;

// import React, { useContext, useEffect, useRef, useState } from "react";
// import Peer from "simple-peer";
// import styled from "styled-components";
// import MyContainerComponent from "@/components/customs/MyContainerComponent ";
// import { useParams } from "react-router-dom";
// import { SocketContext } from "@/context/SocketProvider";

// const StyledVideo = styled.video`
//   height: 40%;
//   width: 50%;
// `;

// interface VideoProps {
//   peer: Peer.Instance;
// }

// const Video: React.FC<VideoProps> = (props) => {
//   const ref = useRef<HTMLVideoElement>(null);

//   useEffect(() => {
//     props.peer.on("stream", (stream) => {
//       if (ref.current) {
//         ref.current.srcObject = stream;
//       }
//     });
//   }, [props.peer]);

//   return <StyledVideo playsInline autoPlay ref={ref} />;
// };

// const videoConstraints = {
//   height: window.innerHeight / 2,
//   width: window.innerWidth / 2,
// };

// const ConnectRoom: React.FC = () => {
//   const [peers, setPeers] = useState<Peer.Instance[]>([]);
//   const { socket } = useContext(SocketContext)||{};
//   const userVideo = useRef<HTMLVideoElement>(null);
//   const peersRef = useRef<{ peerID: string; peer: Peer.Instance }[]>([]);
//   const { roomID } = useParams<{ roomID: string }>();

//   useEffect(() => {
//     if (!socket) return;

//     navigator.mediaDevices
//       .getUserMedia({ video: videoConstraints, audio: true })
//       .then((stream) => {
//         if (userVideo.current) {
//           userVideo.current.srcObject = stream;
//         }
//         socket.emit("join room", roomID);

//         socket.on("all users", (users: string[]) => {
//           const peers: Peer.Instance[] = [];
//           users.forEach((userID) => {
//             const peer = createPeer(userID, socket?.id, stream);
//             peersRef.current.push({ peerID: userID, peer });
//             peers.push(peer);
//           });
//           setPeers(peers);
//         });

//         socket.on(
//           "user joined",
//           (payload: { signal: any; callerID: string }) => {
//             const peer = addPeer(payload.signal, payload.callerID, stream);
//             peersRef.current.push({ peerID: payload.callerID, peer });
//             setPeers((users) => [...users, peer]);
//           }
//         );

//         socket.on(
//           "receiving returned signal",
//           (payload: { id: string; signal: any }) => {
//             const item = peersRef.current.find((p) => p.peerID === payload.id);
//             if (item) {
//               item.peer.signal(payload.signal);
//             }
//           }
//         );
//       });

//     return () => {
//       socket.off("all users");
//       socket.off("user joined");
//       socket.off("receiving returned signal");
//     };
//   }, [roomID, socket]);

//   function createPeer(
//     userToSignal: string,
//     callerID: string,
//     stream: MediaStream
//   ) {
//     const peer = new Peer({
//       initiator: true,
//       trickle: false,
//       stream,
//     });

//     peer.on("signal", (signal) => {
//       socket?.emit("sending signal", { userToSignal, callerID, signal });
//     });

//     return peer;
//   }

//   function addPeer(incomingSignal: any, callerID: string, stream: MediaStream) {
//     const peer = new Peer({
//       initiator: false,
//       trickle: false,
//       stream,
//     });

//     peer.on("signal", (signal) => {
//       socket?.emit("returning signal", { signal, callerID });
//     });

//     peer.signal(incomingSignal);

//     return peer;
//   }

//   return (
//     <MyContainerComponent>
//       <StyledVideo muted ref={userVideo} autoPlay playsInline />
//       {peers.map((peer, index) => (
//         <Video key={index} peer={peer} />
//       ))}
//     </MyContainerComponent>
//   );
// };

// export default ConnectRoom;
