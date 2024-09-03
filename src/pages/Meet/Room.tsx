import React from "react";
import { useParams } from "react-router-dom";

export const Room = () => {
  const { uniqueId } = useParams();
  console.log("🚀 ~ file: Room.tsx:6 ~ Room ~ params:", uniqueId);
  return <div>Room</div>;
};
