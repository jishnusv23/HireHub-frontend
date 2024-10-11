
// import Peer from "peerjs";
// import { peersReducer, PeerState } from "@/reducers/peerReducer";
// import { IPeer } from "@/types/IPeer";
// import { createContext, ReactNode } from "react";
// import { addAllPeersAction, addPeerNameAction, addPeerStreamAction, removePeerStreamAction } from "@/redux/store/actions/Room/peerAction";
// import { useEffect, useReducer, useState } from "react";

// import { v4 as uuidV4 } from "uuid";
// // import { UserContext } from "./UserContext ";


// interface RoomValue {
//   peers: PeerState;
//   shareScreen: () => void;
//   roomId: string;
//   setRoomId: (id: string) => void;
//   screenSharingId: string;
//   userId:string,
//   userName:string,
//   setUserName: (userName: string) => void;
//   stream?: MediaStream | null; // Allowing null
//   screenStream?: MediaStream | null;
// }
// export const RoomContext = createContext<RoomValue>({
//   peers: {},
//   shareScreen: () => {},
//   setRoomId: (id:string) => {},
//   screenSharingId: "",
//   roomId: "",
//   userId: "",
//     userName: "",
//     setUserName: (userName: string) => {}
// });
// interface RoomProviderProps {
//   children: ReactNode; // Define the children prop type
// }
// export const RoomProvider: React.FunctionComponent<RoomProviderProps>= ({ children }) => {
// //   const navigate = useNavigate();
// //   const { userName, userId } = useContext(UserContext);
// const [userId] = useState(localStorage.getItem("userId") || uuidV4());
// const [userName, setUserName] = useState(
//   localStorage.getItem("userName") || ""
// );

// useEffect(() => {
//   localStorage.setItem("userName", userName);
// }, [userName]);

// useEffect(() => {
//   localStorage.setItem("userId", userId);
// }, [userId]);
//   const [me, setMe] = useState<Peer | null>(null);
//   const [stream, setStream] = useState<MediaStream | null>(null);
//   const [screenStream, setScreenStream] = useState<MediaStream | null>(null);
//   const [peers, dispatch] = useReducer(peersReducer, {});
//   const [screenSharingId, setScreenSharingId] = useState<string>("");
//   const [roomId, setRoomId] = useState<string>("");

// //   const enterRoom = ({ roomId }: { roomId: string }) => {
// //     navigate(`/room/${roomId}`);
// //   };

//   const getUsers = ({
//     participants,
//   }: {
//     participants: Record<string, IPeer>;
//   }) => {
//     dispatch(addAllPeersAction(participants));
//   };

//   const removePeer = (peerId: string) => {
//     dispatch(removePeerStreamAction(peerId));
//   };

//   const switchStream = (newStream: MediaStream) => {
//     const videoTrack = newStream
//       .getTracks()
//       .find((track) => track.kind === "video");
//     if (videoTrack) {
//       Object.values(me?.connections || {}).forEach((connection: any) => {
//         const sender = connection[0].peerConnection
//           .getSenders()
//           .find((s: any) => s.track.kind === "video");
//         if (sender) {
//           sender.replaceTrack(videoTrack).catch((err:any) => console.error(err));
//         }
//       });
//     }
//   };

//   const shareScreen = async () => {
//     try {
//       if (screenSharingId) {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: true,
//           audio: true,
//         });
//         switchStream(stream);
//       } else {
//         const stream = await navigator.mediaDevices.getDisplayMedia({});
//         switchStream(stream);
//         setScreenStream(stream);
//       }
//     } catch (error) {
//       console.error("Error sharing screen:", error);
//     }
//   };

//   const nameChangedHandler = ({
//     peerId,
//     userName,
//   }: {
//     peerId: string;
//     userName: string;
//   }) => {
//     dispatch(addPeerNameAction(peerId, userName));
//   };

//   useEffect(() => {
//     ws.emit("change-name", { peerId: userId, userName, roomId });
//   }, [userName, userId, roomId]);

//   useEffect(() => {
//     const peer = new Peer(userId);
//     setMe(peer);

//     navigator.mediaDevices
//       .getUserMedia({ video: true, audio: true })
//       .then(setStream)
//       .catch((error) => console.error("Error accessing media devices:", error));

//     // ws.on("room-created", enterRoom);
//     ws.on("get-users", getUsers);
//     ws.on("user-disconnected", removePeer);
//     ws.on("user-started-sharing", setScreenSharingId);
//     ws.on("user-stopped-sharing", () => setScreenSharingId(""));
//     ws.on("name-changed", nameChangedHandler);

//     return () => {
//     //   ws.off("room-created", enterRoom);
//       ws.off("get-users", getUsers);
//       ws.off("user-disconnected", removePeer);
//       ws.off("user-started-sharing");
//       ws.off("user-stopped-sharing");
//       ws.off("name-changed", nameChangedHandler);
//       me?.disconnect();
//     };
//   }, [me, userId, roomId]);

//   useEffect(() => {
//     if (screenSharingId) {
//       ws.emit("start-sharing", { peerId: screenSharingId, roomId });
//     } else {
//       ws.emit("stop-sharing");
//     }
//   }, [screenSharingId, roomId]);

//   useEffect(() => {
//     if (!me || !stream) return;

//     ws.on("user-joined", ({ peerId, userName: name }) => {
//       const call = me.call(peerId, stream, { metadata: { userName } });
//       call.on("stream", (peerStream) => {
//         dispatch(addPeerStreamAction(peerId, peerStream));
//       });
//       dispatch(addPeerNameAction(peerId, name));
//     });

//     me.on("call", (call) => {
//       const { userName } = call.metadata;
//       dispatch(addPeerNameAction(call.peer, userName));
//       call.answer(stream);
//       call.on("stream", (peerStream) => {
//         dispatch(addPeerStreamAction(call.peer, peerStream));
//       });
//     });

//     return () => {
//       ws.off("user-joined");
//     };
//   }, [me, stream, userName]);

//   return (
//     <RoomContext.Provider
//       value={{
//         stream,
//         screenStream,
//         peers,
//         shareScreen,
//         roomId,
//         setRoomId,
//         screenSharingId,
//         setUserName,
//         userId,
//         userName
//       }}
//     >
//       {children}
//     </RoomContext.Provider>
//   );
// };
