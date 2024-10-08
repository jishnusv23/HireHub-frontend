// useRoomManagement.ts
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useRoomManagement = (socket: any, roomId: string) => {
  const [isOpenTerminal, setIsOpenTerminal] = useState(false);
  const [roomLength, setRoomLength] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    socket?.emit("find-roomlength", { roomId });

    socket?.on("room-length", (Roomlength:number) => {
      setRoomLength(Roomlength);
    });

    socket?.on("auto-openTerminal", (isOpen:boolean) => {
      setIsOpenTerminal(isOpen);
    });

    socket?.on("meet-close", (message:string) => {
      toast(message);
      leaveRoom();
    });

    return () => {
      socket?.off("room-length");
      socket?.off("auto-openTerminal");
      socket?.off("meet-close");
    };
  }, [socket, roomId]);

  const openTerminal = useCallback(() => {
    socket?.emit("open-codeEditor", { roomId });
    setIsOpenTerminal(true);
  }, [socket, roomId]);

  const leaveRoom = useCallback(
    (peerId?: string) => {
      navigate("/");
      if (peerId) {
        socket?.emit("leave-room", { roomId, peerId });
      }
      localStorage.clear();
    },
    [navigate, socket, roomId]
  );

  return { isOpenTerminal, roomLength, openTerminal, leaveRoom };
};
