import React, { useEffect, useState } from "react";
import { MeetingTable } from "../common/Interviewer/MeetingTable";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tab";
import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import Pagination from "../common/Admin/Pagination";
import { RooteState } from "@/redux/store";
import { getAllMeetDetails } from "@/redux/store/actions/interviewer/getAllMeetingsDetails";
import { InterviewType } from "@/types/Common";

export const Meetings = () => {
  const { data } = useAppSelector((state: RooteState) => state.user);
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  // console.log("🚀 ~ file: Meetings.tsx:16 ~ Meetings ~ totalPages:", totalPages)
  const [interviewerMeetData, setInterviewerMeetData] = useState<
  InterviewType[]
  >([]);
  // console.log("🚀 ~ file: Meetings.tsx:16 ~ Meetings ~ interviewerMeetData:", interviewerMeetData)
  const intervieweDetails = 5;

  useEffect(() => {
    const fetchAllMeetDetails = async () => {
      try {
        const response = await dispatch(
          getAllMeetDetails({
            page: currentPage,
            limit: intervieweDetails,
            search: "",
            id: data?._id as string,
          })
        );
        if (response.payload.success && Array.isArray(response.payload.data.data)) {
          setInterviewerMeetData(response.payload.data.data);
          setTotalPages(response.payload.data.totalPages);
        } else {
          setInterviewerMeetData([]); 
        }
      } catch (error: any) {
        throw new Error(error?.message);
      }
    };
    fetchAllMeetDetails();
  }, [dispatch, currentPage]); 
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Filter data based on status
  const ScheduledData = Array.isArray(interviewerMeetData)
    ? interviewerMeetData.filter((item) => item.interviewStatus === "Scheduled")
    : [];
  // console.log("🚀 ~ file: Meetings.tsx:52 ~ Meetings ~ ScheduledData:", ScheduledData)
  const CompletedData = Array.isArray(interviewerMeetData)
    ? interviewerMeetData.filter((item) => item.interviewStatus === "Completed")
    : [];
  const inProgressData = Array.isArray(interviewerMeetData)
    ? interviewerMeetData.filter(
        (item) => item.interviewStatus === "In Progress"
      )
    : [];

  return (
    <>
      <div>
        <Button className="w-30 flex justify-end">create meet</Button>
      </div>
      <div className="bg-background pt-20">
        <div>
          <Tabs defaultValue="Scheduled">
            <TabsList>
              <TabsTrigger value="Scheduled">Scheduled</TabsTrigger>
              <TabsTrigger value="Completed">Completed</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            </TabsList>

            <TabsContent value="Scheduled">
              <MeetingTable data={ScheduledData} />
            </TabsContent>

            <TabsContent value="Completed">
              <MeetingTable data={CompletedData} />
            </TabsContent>

            <TabsContent value="in-progress">
              <MeetingTable data={inProgressData} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <div className="flex justify-center mt-6 ">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};
