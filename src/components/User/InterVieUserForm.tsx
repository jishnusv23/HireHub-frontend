import React from "react";
import { InterviewScheduleForm } from "./InterVieweScheduleForm";

export const InterVieUserForm = () => {
  return (
    <div className="flex items-center justify-center h-auto py-5  ">
      <div className="w-full max-w-2xl  rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-black  mb-4">Create Meeting</h1>
        <p className="text-xl font-semibold text-foregroundAccent mb-6">
          Add new meeting using the form below.
        </p>
        <InterviewScheduleForm />
      </div>
    </div>
  );
};
