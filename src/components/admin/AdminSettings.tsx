// import React from "react";

// const AdminSettings = () => {
//   return <div className="bg-background">AdminSettings</div>;
// };

// export default AdminSettings;
import { useEffect, useState } from "react";
import { MeetingTable } from "../common/Interviewer/MeetingTable";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tab";

import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import Pagination from "../common/Admin/Pagination";
import { RooteState } from "@/redux/store";
import { getAllMeetDetails } from "@/redux/store/actions/interviewer/getAllMeetingsDetails";
import { InterviewType } from "@/types/Common";
import Loading from "../common/Loading/Loading";
import { AdminFetchAllInterivewes } from "@/redux/store/actions/admin/AdminFetchAllinterviewes";

export const AdminSettings = () => {
  const { data } = useAppSelector((state: RooteState) => state.user);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [allMeetData, setAllMeetData] = useState<InterviewType[]>([]);
  const [currentTabData, setCurrentTabData] = useState<InterviewType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchAllMeetDetails = async () => {
      try {
        setLoading(true);
        const response = await dispatch(
          AdminFetchAllInterivewes({
            page: 1,
            limit: 100,
          })
        );
        setLoading(false);
        if (
          response.payload.success &&
          Array.isArray(response.payload.data.data)
        ) {
          const fetchedData = response.payload.data.data;
          setAllMeetData(fetchedData);

          const scheduledInterviews = fetchedData.filter(
            (item: InterviewType) => item.interviewStatus === "Scheduled"
          );
          setCurrentTabData(scheduledInterviews);
          setTotalPages(Math.ceil(scheduledInterviews.length / itemsPerPage));
        } else {
          setAllMeetData([]);
          setCurrentTabData([]);
          setTotalPages(1);
        }
      } catch (error: any) {
        setLoading(false);
        throw new Error(error?.message);
      }
    };
    fetchAllMeetDetails();
  }, [dispatch, data?._id]);

  const handleTabChange = (status: string) => {
    const filteredData = allMeetData.filter(
      (item) => item.interviewStatus === status
    );
    setCurrentTabData(filteredData);
    setCurrentPage(1);
    setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedData = currentTabData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="bg-background">
          <h1 className="flex justify-center">heyy</h1>
          <div className="pt-20">
            <Tabs defaultValue="Scheduled" onValueChange={handleTabChange}>
              <TabsList>
                <TabsTrigger value="Scheduled">Scheduled</TabsTrigger>
                <TabsTrigger value="Completed">Completed</TabsTrigger>
                <TabsTrigger value="Cancelled">Cancelled</TabsTrigger>
              </TabsList>

              <TabsContent value="Scheduled">
                <MeetingTable Interviewdata={paginatedData} />
              </TabsContent>

              <TabsContent value="Completed">
                <MeetingTable Interviewdata={paginatedData} />
              </TabsContent>

              <TabsContent value="Cancelled">
                <MeetingTable Interviewdata={paginatedData} />
              </TabsContent>
            </Tabs>
          </div>
          <div className="flex justify-center mt-6 bg-background">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      )}
    </>
  );
};
