import React from "react";
import { MeetingTable } from "../common/Interviewer/MeetingTable";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tab";

export const Meetings = () => {
  const dummyData = [
    {
      name: "John Doe",
      joined: "2024-08-15",
      verified: true,
      status: "Completed",
      view: "View Details",
    },
    {
      name: "Jane Smith",
      joined: "2024-08-12",
      verified: true,
      status: "Pending",
      view: "View Details",
    },
    {
      name: "Emily Johnson",
      joined: "2024-08-10",
      verified: false,
      status: "In Progress",
      view: "View Details",
    },
    {
      name: "Michael Brown",
      joined: "2024-08-05",
      verified: true,
      status: "Completed",
      view: "View Details",
    },
  ];

  // Filter data based on status
  const completedData = dummyData.filter((item) => item.status === "Completed");
  const pendingData = dummyData.filter((item) => item.status === "Pending");
  const inProgressData = dummyData.filter(
    (item) => item.status === "In Progress"
  );

  return (
    <>
      <div className="bg-background pt-20">
        <div>
          <Tabs defaultValue="completed">
            <TabsList>
              <TabsTrigger value="completed" >Completed</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            </TabsList>

            <TabsContent value="completed">
              <MeetingTable data={completedData} />
            </TabsContent>

            <TabsContent value="pending">
              <MeetingTable data={pendingData} />
            </TabsContent>

            <TabsContent value="in-progress">
              <MeetingTable data={inProgressData} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};
