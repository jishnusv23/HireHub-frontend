import { useReducer, useRef, useEffect } from "react";
import Peer from "peerjs";
import { peersReducer } from "@/reducers/peerReducer";
import {
  addPeerStreamAction,
  addPeerNameAction,
  removePeerStreamAction,
  addAllPeersAction,
} from "@/redux/store/actions/Room/peerAction";
import { useAppSelector } from "./hooks";
import { RooteState } from "@/redux/store";

// Define types for socket events
interface UserJoinedData {
  peerId: string;
  userName: string;
}

interface GetUsersData {
  participants: { peerId: string; userName: string }[];
}

export const usePeerConnection = (
  socket: any,
  roomId: string,
  userId: string,
  username: string,
  stream: MediaStream | null
) => {
    const {data}=useAppSelector((state:RooteState)=>state.user)
  const [peers, dispatch] = useReducer(peersReducer, {});
  const peerInstance = useRef<Peer | null>(null);

  useEffect(() => {
    if (!stream) return;
    console.log(userId,'______________________________________________________________________')
    const peer = new Peer(userId);
    peerInstance.current = peer;

    peer.on("open", (peerId) => {
      socket?.emit("join-room", { roomId, peerId, userName: data?.username||username });
    });

    peer.on("call", (call) => {
      call.answer(stream);
      call.on("stream", (remoteStream) => {
        dispatch(addPeerStreamAction(call.peer, remoteStream));
      });
    });

    // Add types for socket events
    socket?.on("user-joined", ({ peerId, userName }: UserJoinedData) => {
      connectToNewUser(peerId, stream);
      dispatch(addPeerNameAction(peerId, userName));
    });

    socket?.on("user-disconnected", (peerId: string) => {
      dispatch(removePeerStreamAction(peerId));
    });

    socket?.on("get-users", ({ participants }:any) => {
      dispatch(addAllPeersAction(participants));
    });

    return () => {
      socket?.off("user-joined");
      socket?.off("user-disconnected");
      socket?.off("get-users");
      peer.destroy();
    };
  }, [socket, roomId, userId, username, stream]);

  const connectToNewUser = (peerId: string, stream: MediaStream) => {
    const call = peerInstance.current!.call(peerId, stream);
    call.on("stream", (remoteStream) => {
      dispatch(addPeerStreamAction(peerId, remoteStream));
    });
  };

  return { peers, peerInstance };
};
