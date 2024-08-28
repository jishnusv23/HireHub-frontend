import React from "react";
type MeetingRow = {
  name: string;
  joined: string;
  verified: boolean;
  status: string;
  view: string;
};
export const MeetingTable = ({ data }: { data: MeetingRow[] }) => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-background">
      <div className="relative overflow-x-auto sm:rounded-lg">
        <div className="min-w-full">
          {data.map((row, index) => (
            <div
              key={index}
              className="shadow-md rounded-lg mb-6 flex justify-between items-center p-4 border border-gray-50 hover:border-black"
            >
              <div className="flex-1 text-muted-foreground text-xl font-bold">
                {row.name}
              </div>
              <div className="flex-1">{row.joined}</div>
              <div className="flex-1">{row.verified ? "Yes" : "No"}</div>
              <div className="flex-1">{row.status}</div>
              <div className="flex-1">
                <button className="text-blue-500 hover:underline">
                  {row.view}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
