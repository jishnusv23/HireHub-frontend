import React from "react";
import { InterviewerProfileForm } from "../common/Interviewer/InterviewerProfileForm";
import { ShortProfile } from "../common/Interviewer/ShortProfile";

export const InterviewerProfile = () => {
  return (
    <div className="lg:h-screen grid lg:grid-cols-3 gap-4 mb-5 bg-background">
     
      <div className="lg:col-span-2 flex items-center justify-center p-5 lg:p-20 ">
        <InterviewerProfileForm />
      </div>

    
      <div className="lg:col-span-1 flex flex-col justify-items-end p-5 lg:p-20">

        <div className="flex flex-col items-center justify-end">
          <ShortProfile />
        </div>
      </div>
    </div>
  );
};
