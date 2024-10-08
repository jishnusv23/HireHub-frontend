import { IPeer } from "@/types/IPeer";

export const ADD_PEER_STREAM = "ADD_PPER_STREAM" as const;
export const REMOVE_PEER_STRESAM = "REMOVE_PEER_STRESAM" as const;
export const ADD_PEER_NAME = "ADD_PEER_NAME " as const;
export const ADD_ALL_PEER = "ADD_ALL_PEER" as const;
export const REMOVE_ALL_PEER_STREAM = "REMOVE_ALL_PEER_STREAM" as const;

export const addPeerStreamAction = (peerId: string, stream: MediaStream) => ({
  type: ADD_PEER_STREAM,
  payload: { peerId, stream },
});

export const addPeerNameAction = (peerId: string, userName: string) => ({
  type: ADD_PEER_NAME,
  payload: { peerId, userName },
});

export const removePeerStreamAction = (peerId: string) => ({
  type: REMOVE_PEER_STRESAM,
  payload: { peerId },
});

export const addAllPeersAction = (peers: Record<string, IPeer>) => ({
    type:ADD_ALL_PEER,
    payload:{peers}

})

export const removeAllPeerStream = () => ({
  type: REMOVE_ALL_PEER_STREAM,
});
