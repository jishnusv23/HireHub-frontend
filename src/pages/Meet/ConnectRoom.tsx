

// export default ConnectRoom;

import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RoomContext } from "@/context/RoomContext";
// import { UserContext } from "@/context/UserContext ";
// import { ws } from "@/utils/ws/Ws";
import { VideoPlayer } from "@/components/common/Meet/VideoPlayer";
import { PeerState } from "@/reducers/peerReducer";

export const ConnectRoom = () => {
  const { id } = useParams();
  const {
    stream,
    screenStream,
    peers,
    shareScreen,
    screenSharingId,
    setRoomId,
    setUserName,
    userId,
    userName,
  } = useContext(RoomContext);
  // const { userName, userId } = useContext(UserContext);


  // useEffect(() => {
  //   // if (stream) ws.emit("join-room", { roomId: id, peerId: userId, userName });
  // }, [id, userId, stream, userName]);

  useEffect(() => {
    setRoomId(id || "");
  }, [id, setRoomId]);

  const screenSharingVideo =
    screenSharingId === userId ? screenStream : peers[screenSharingId]?.stream;

  const { [screenSharingId]: sharing, ...peersToShow } = peers;
  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-red-500 p-4 text-white">Room id {id}</div>
      <div className="flex grow">
        
        <div
          className={`grid gap-4 ${
            screenSharingVideo ? "w-1/5 grid-col-1" : "grid-cols-4"
          }`}
        >
         

          {Object.values(peersToShow as PeerState)
            .filter((peer) => !!peer.stream)
            .map((peer) => (
              <div key={peer.peerId}>
                <VideoPlayer stream={peer.stream} />
                <div>{peer.userName}</div>
              </div>
            ))}
        </div>
        
      </div>
      
    </div>
  );
};