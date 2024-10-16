import React, { createContext, useState, useEffect } from "react";
import io, { Socket } from "socket.io-client";

interface OnlineUser {
  userId: string;
  socketId: string;
}

interface SocketContextType {
  socket: Socket | null;
  onlineUsers: OnlineUser[];
  isConnected: boolean;
  setIsConnected: (isConnect: boolean) => void;
  setOnlineUsers: (users: OnlineUser[]) => void;
  currentRoom: string;
  setCurrentRoom: (room: string) => void;
}

const SocketBackendURL = import.meta.env.VITE_SOCKET_BACKEND_URL;

export const SocketContext = createContext<SocketContextType | undefined>(
  undefined
);

interface SocketProviderProps {
  children: React.ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [currentRoom, setCurrentRoom] = useState<string>("");

  useEffect(() => {
    const newSocket = io(SocketBackendURL, {
      path: "/socket.io/",
      transports: ["websocket", "polling"],
    });

    const handleConnect = () => {
      console.log("Socket connected");
      setIsConnected(true);
    };

    const handleDisconnect = () => {
      console.log("Socket disconnected");
      setIsConnected(false);
    };

    const handleConnectError = (error: Error) => {
      console.error("Connection error:", error);
      setIsConnected(false);
    };

    newSocket.on("connect", handleConnect);
    newSocket.on("disconnect", handleDisconnect);
    newSocket.on("connect_error", handleConnectError);

    newSocket.connect();

    setSocket(newSocket);

    return () => {
      newSocket.off("connect", handleConnect);
      newSocket.off("disconnect", handleDisconnect);
      newSocket.off("connect_error", handleConnectError);
      newSocket.disconnect();
    };
  }, [isConnected]);

  const ContextValues: SocketContextType = {
    socket,
    onlineUsers,
    isConnected,
    setIsConnected,
    setOnlineUsers,
    currentRoom,
    setCurrentRoom,
  };

  return (
    <SocketContext.Provider value={ContextValues}>
      {children}
    </SocketContext.Provider>
  );
};
// useEffect(() => {
//   if (
//     data &&
//     (data.role === "interviewer" || data.role === "pending") &&
//     SocketBackendURL
//   ) {
//     const transports = IS_LOCAL_ENV
//       ? ["websocket", "polling"]
//       : ["websocket"];

//     const newSocket = io(SocketBackendURL, {
//       transports,
//       query: { userId: data._id },
//     });

//     newSocket.on("connect", () => {
//       console.log("Socket connected");
//       newSocket.emit("user-connected", data._id);
//     });

//     newSocket.on("update-online-users", (users: OnlineUser[]) => {
//       setOnlineUsers(users);
//     });

//     newSocket.on("disconnect", () => {
//       console.log("Socket disconnected");
//       newSocket.emit("user-disconnected", data._id);
//     });

//     setSocket(newSocket);

//     return () => {
//       newSocket.disconnect();
//       console.log("Socket disconnected from frontend");
//     };
//   }
// }, [data]);
