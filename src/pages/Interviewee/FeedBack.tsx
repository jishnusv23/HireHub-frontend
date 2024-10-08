import Header from "@/components/common/users/Header";
import FeedBackForm from "@/components/Interviewee/FeedBackForm";
import IMG from "@/assets/home/working-lapto-cartoon-1.png";
import React, { useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import { values } from "lodash";
import { SocketContext } from "@/context/SocketProvider";

const FeedBack = () => {
  const location = useLocation();
  const { roomId } = useParams();
   const email = location.state?.data?.email;
    const { socket } = useContext(SocketContext) || {};
   const hadnleFeedbacksubmission=(formData: {
    content: string;
    rating:number
    
  })=>{
    const {content,rating}=formData
    console.log("🚀 ~ file: FeedBack.tsx:17 ~ FeedBack ~ content:", content,rating)
     socket?.emit("feedback-submitted", { roomId, email });

    // console.log(values)
   }
  console.log(location, "____________________________________");
  console.log("🚀 ~ file: FeedBack.tsx:10 ~ FeedBack ~ roomId:", roomId);
  return (
    <>
      <Header />

      <div className="flex-1 min-h-screen flex flex-col items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-5xl lg:flex lg:space-x-8 lg:mt-12">
          {" "}
          <div className="lg:w-1/2 flex flex-col items-center justify-center mb-8 lg:mb-0 overflow-clip relative">
            <img src={IMG} alt="" width={400} height={400} />
            <h1 className="text-3xl lg:text-4xl font-bold  mb-4  absolute  top-1/3 text-center">
              Session Feedback
            </h1>
            <p className="text-slate-300 text-lg lg:text-xl absolute  top-2/3 text-center">
              We value your input! Please take a moment to share your thoughts
              about the session. Your feedback helps us improve and provide
              better experiences.
            </p>
          </div>
          <div className="lg:w-1/2 w-full max-w-lg mx-auto bg-background rounded-xl shadow-2xl p-6 lg:mt-12">
            <FeedBackForm  onSubmitfeedback={hadnleFeedbacksubmission} roomId={roomId as string}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedBack;
