import { InterviewType } from "@/types/Common";
import React from "react";

export const MeetingTable = ({ data }: { data: InterviewType[] }) => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-background">
      <div className="relative overflow-x-auto sm:rounded-lg">
        <div className="min-w-full">
          {data.map((row, index) => (
            <div
              key={index}
              className="shadow-md rounded-lg mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border dark:border-gray-700 dark:hover:border-gray-50"
            >
              <div className="flex-1 text-muted-foreground text-xl font-bold mb-2 sm:mb-0">
                {row.title}
              </div>
              <div className="flex-1 mb-2 sm:mb-0">
                <span className="font-semibold">Status:</span>{" "}
                {row.interviewStatus}
              </div>
              <div className="flex-1 mb-2 sm:mb-0">
                <span className="font-semibold">Type:</span>{" "}
                {row.interviewType ? "Yes" : "No"}
              </div>
              <div className="flex-1 mb-2 sm:mb-0">
                <span className="font-semibold">Description:</span>{" "}
                {row.description}
              </div>
              <div className="flex-1 mb-2 sm:mb-0">
                <span className="font-semibold">Link:</span>{" "}
                <a
                  href={row.meetingLink}
                  className="text-blue-500 hover:underline"
                >
                  {row.meetingLink}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
