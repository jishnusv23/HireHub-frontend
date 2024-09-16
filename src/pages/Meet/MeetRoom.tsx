import { Meetroom } from "@/components/common/users/Meetroom";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { RooteState } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Peer from "peerjs";

export const MeetRoom = () => {
  const { data } = useAppSelector((state: RooteState) => state.user);
  const dispatch = useAppDispatch();
  const { uniqueId } = useParams();
  const navigate = useNavigate();
  const [peer, setPeer] = useState<Peer | null>(null);
  const [localPeerId, setLocalPeerId] = useState<string>("");
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  useEffect(() => {
    const peer = new Peer();

    peer.on("open", (id) => {
      setLocalPeerId(id);
    });
    setPeer(peer);

    return () => {
      peer.destroy();
    };
  }, []);

  useEffect(() => {
    if (peer) {
      peer.on("call", (incommingCall) => {
        navigator.mediaDevices
          .getDisplayMedia({ audio: true, video: true })
          .then((stream) => {
            setLocalStream(stream);
            incommingCall.answer(stream);
            incommingCall.on("stream", (remoteStream) => {
              setRemoteStream(remoteStream);
            });
          })
          .catch((err) => {
            console.log("Failed to get local stream")
          })
      })
    }
  }, [peer])

  const handleLeaveMeeting = () => {
    //  sessionStorage.clear();
    navigate("/");
  };
  return (
    <Meetroom
      RoomID={uniqueId || ""}
      localStream={localStream}
      remoteStream={remoteStream}
      onLeaveMeeting={handleLeaveMeeting}
    />
  );
};
