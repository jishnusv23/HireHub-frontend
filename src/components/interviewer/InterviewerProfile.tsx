import React from "react";
import { InterviewerProfileForm } from "../common/Interviewer/InterviewerProfileForm";
import { ShortProfile } from "../common/Interviewer/ShortProfile";
export const InterviewerProfile = () => {
  return (
    <div className="grid lg:grid-cols-3 gap-4 bg-background min-h-screen">
      <div className="lg:col-span-2 flex items-center justify-center p-5 lg:p-20">
        <InterviewerProfileForm />
      </div>
      <div className="lg:col-span-1 flex flex-col items-center p-5 lg:p-20">
        <ShortProfile />
      </div>
    </div>
  );
};
