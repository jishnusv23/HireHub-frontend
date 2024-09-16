import { useAppSelector } from "@/hooks/hooks";
import { RooteState } from "@/redux/store";
import React, { createContext, useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

interface SocketContextType {
  socket: Socket | null;
  onlineUsers: { userId: string; socketId: string }[];
  setOnlineUsers: (users: { userId: string; socketId: string }[]) =>void;
  currentRoom: string;
  setCurrentRoom:(room:string)=>void
}

interface SocketProviderProps {
  children: React.ReactNode;
}

const Socket_bakcend_url = import.meta.env.VITE_SOCKET_BACKEND_URL;
const IS_LOCAL_ENV = import.meta.env.MODE === "development";

export const SocketContext = createContext<SocketContextType | null>(null);

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const { data } = useAppSelector((state: RooteState) => state.user);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<
    { userId: string; socketId: string }[]
  >([]);
  const [currentRoom, setCurrentRoom] = useState<string>("");

  const ContextValues: SocketContextType = {
    currentRoom,
    onlineUsers,
    setOnlineUsers,
    setCurrentRoom,
    socket,
  };
  useEffect(() => {
    if (
      (data?.role === "interviewer" || data?.role === "pending") &&
      Socket_bakcend_url
    ) {
      const transports = IS_LOCAL_ENV
        ? ["websocket", "polling"]
        : ["websocket"];

      const newSocket: Socket = io(Socket_bakcend_url, {
        transports,
        query: {
          userId: data._id,
        },
      });

      newSocket.on("connect", () => {
        console.log("Socket connect to client");
      });
      newSocket.on("disconnect", () => {
        console.log("Socket disconnect to client");
      });

      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
        console.log("Socket dissconect frontend");
      };
    }
  }, [data]);

  return (
    <SocketContext.Provider value={ContextValues}>
      {children}
    </SocketContext.Provider>
  );
};
