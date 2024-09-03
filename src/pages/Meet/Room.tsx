import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { RooteState } from "@/redux/store";
import { verifyIntervewe } from "@/redux/store/actions/common/verifyHost";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Room = () => {
  const { uniqueId } = useParams();
  console.log("🚀 ~ file: Room.tsx:6 ~ Room ~ params:", uniqueId);
  const dispatch=useAppDispatch()
  const { data } = useAppSelector((state: RooteState) => state.user);
  console.log("🚀 ~ file: Room.tsx:12 ~ Room ~ data:", data)
  const [interviewerJoined,setInterviewerJoined]=useState(false)
  const obje={
    uniqueId,
    userId:data?._id

  }
  useEffect(()=>{
    const fetchRightInterviewe=async()=>{
        const response=dispatch(verifyIntervewe(obje))
        console.log("🚀 ~ file: Room.tsx:22 ~ fetchRightInterviewe ~ response:", response)
    }
    fetchRightInterviewe()
  },[uniqueId])

  return <div>Room</div>;
};
