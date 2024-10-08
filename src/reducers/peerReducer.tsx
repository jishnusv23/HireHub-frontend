import { IPeer } from "@/types/IPeer";
import {
  ADD_ALL_PEER,
  ADD_PEER_STREAM,
  ADD_PEER_NAME,
  REMOVE_PEER_STRESAM,
  REMOVE_ALL_PEER_STREAM
} from "@/redux/store/actions/Room/peerAction";

export type PeerState = Record<
  string,
  { stream?: MediaStream; userName?: string; peerId: string }
>;

type PeerAction =
  | {
      type: typeof ADD_PEER_STREAM;
      payload: { peerId: string; stream: MediaStream };
    }
  | {
      type: typeof REMOVE_PEER_STRESAM;
      payload: { peerId: string };
    }
  | {
      type: typeof ADD_PEER_NAME;
      payload: { peerId: string; userName: string };
    }
  | {
      type: typeof ADD_ALL_PEER;
      payload: {
        peers: Record<string, IPeer>;
      };
    }
  | {
      type: typeof REMOVE_ALL_PEER_STREAM;
     
    };

export const peersReducer = (state: PeerState, action: PeerAction) => {
  switch (action.type) {
    case ADD_PEER_STREAM:
      return {
        ...state,
        [action.payload.peerId]: {
          ...state[action.payload.peerId],
          stream: action.payload.stream,
        },
      };
    case ADD_PEER_NAME:
      return {
        ...state,
        [action.payload.peerId]: {
          ...state[action.payload.peerId],
          userName: action.payload.userName,
        },
      };
    case REMOVE_PEER_STRESAM:
     const { [action.payload.peerId]: removedPeer, ...remainingPeers } = state;
      return remainingPeers

    case ADD_ALL_PEER: {
      return { ...state, ...action.payload.peers };
    }
    case REMOVE_ALL_PEER_STREAM:{
      return {}
    }
    
    default:
      return {...state};
  }
};
