import React, { createContext, useState } from "react";
import io, { Socket } from "socket.io-client";

interface OnlineUser {
  userId: string;
  socketId: string;
}

interface SocketContextType {
  socket: Socket | null;
  onlineUsers: OnlineUser[];
  setOnlineUsers: (users: OnlineUser[]) => void;
  currentRoom: string;
  setCurrentRoom: (room: string) => void;
}

const SocketBackendURL = import.meta.env.VITE_SOCKET_BACKEND_URL;
console.log("🚀 ~ file: SocketProvider.tsx:18 ~ SocketBackendURL:", SocketBackendURL)
export const socket = io(SocketBackendURL, {
  path: "/socket.io/",
  transports: ["websocket", "polling"],
});

export const SocketContext = createContext<SocketContextType | undefined>(
  undefined
);

interface SocketProviderProps {
  children: React.ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  // const { data } = useAppSelector((state: RooteState) => state.user);
  // const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const [currentRoom, setCurrentRoom] = useState<string>("");

  const ContextValues: SocketContextType = {
    socket,
    onlineUsers,
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
