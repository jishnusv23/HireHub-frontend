import  { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { RooteState } from "@/redux/store";
import { Button } from "../ui/button";
import { format } from "date-fns";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  BarChart,
  Legend,
  Bar,
} from "recharts";
import { AdminFetchAllUsersAction } from "@/redux/store/actions/admin/AdminfetAllUsers";
import { AdminFetchAllInterivewes } from "@/redux/store/actions/admin/AdminFetchAllinterviewes";
import { InterviewType } from "@/types/Common";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/Table";
import { useNavigate } from "react-router-dom";
import { SignupFormData } from "@/types/IForm";

const interviewTypes = [
  "Technical",
  "Behavioral",
  "HR",
  "Coding Challenge",
  "Panel",
  "Case Study",
];

const AdminDashboard = () => {
  const { data } = useAppSelector((state: RooteState) => state.user);
  const dispatch = useAppDispatch();
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [selectedInterviews, setSelectedInterviews] = useState<InterviewType[]>(
    []
  );
  // const [allInterviews, setAllInterviews] = useState<InterviewType[]>([]);
  const [totalInterviews, setTotalInterviews] = useState<number>(0);
  // const [allUsers, setAllUsers] = useState<any[]>([]);
  const [totalInterviewers, setTotalInterviewers] = useState<number>(0);
  const [userChartData, setUserChartData] = useState<any[]>([]);
  const [interviewTypeData, setInterviewTypeData] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllUsers();
    fetchAllInterviews();
  }, []);

  const fetchAllUsers = async () => {
    const response = await dispatch(
      AdminFetchAllUsersAction(data?._id as string)
    );
    // console.log("Fetched Users Response:", response);

    if (response.payload && response.payload.data) {
      const users = response.payload.data;
      // setAllUsers(users);
      setTotalUsers(users.length);

      const interviewers = users.filter(
        (user: SignupFormData) => user.role === "interviewer"
      );
      setTotalInterviewers(interviewers.length);

      const processedData = processUsersForChart(users);
      setUserChartData(processedData);
    } else {
      console.error("No user data found in the response.");
      setTotalUsers(0);
    }
  };

  const processUsersForChart = (users: SignupFormData[]) => {
    const userCounts: { [key: string]: number } = {};
    users.forEach((user) => {
      const date = format(new Date(user.createdAt), "yyyy-MM-dd");
      userCounts[date] = (userCounts[date] || 0) + 1;
    });

    return Object.entries(userCounts)
      .map(([date, count]) => ({
        date,
        count,
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  const fetchAllInterviews = async () => {
    const response = await dispatch(
      AdminFetchAllInterivewes({ limit: 100, page: 1 })
    );
    console.log("Fetched Interviews Response:", response);

    if (response.payload && response.payload.data) {
      const interviews = response.payload.data.data;
      // setAllInterviews(interviews);
      setSelectedInterviews(interviews.slice(0, 3)); // Only the first 3 interviews
      setTotalInterviews(response.payload.data.totalPages);
      processInterviewTypes(interviews);
    } else {
      console.error("No interview data found in the response.");
      // setAllInterviews([]);
      setSelectedInterviews([]);
    }
  };

  const processInterviewTypes = (interviews: InterviewType[]) => {
    const typeCounts = interviewTypes.reduce((acc, type) => {
      acc[type] = 0;
      return acc;
    }, {} as Record<string, number>);

    interviews.forEach((interview) => {
      if (interview.interviewType in typeCounts) {
        typeCounts[interview.interviewType]++;
      }
    });

    const data = Object.entries(typeCounts).map(([name, value]) => ({
      name,
      value,
    }));

    setInterviewTypeData(data);
  };

  return (
    <div className="p-6 max-w-full mx-auto bg-background shadow-md overflow-hidden">
      <h1 className="text-2xl font-bold mb-4">Your Control Center</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-primary p-4 rounded-lg">
          <h2 className="font-semibold">Total Users: Join the Community!</h2>
          <p className="text-2xl">{totalUsers}</p>
        </div>
        <div className="bg-primary p-4 rounded-lg">
          <h2 className="font-semibold">Active Interviewers</h2>
          <p className="text-2xl">{totalInterviewers}</p>
        </div>
        <div className="bg-primary p-4 rounded-lg">
          <h2 className="font-semibold">Total Interviews Conducted</h2>
          <p className="text-2xl">{totalInterviews}</p>
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-backgroundAccent mt-6 pt-5">
        <h1 className="text-2xl font-bold pl-5">
          Recent Interviews at a Glance
        </h1>
        <Table>
          <TableHeader>
            <TableRow className="text-xl">
              <TableHead>Si.No</TableHead>
              <TableHead>Interview Title</TableHead>
              <TableHead>Meet Date</TableHead>
              <TableHead>Interview Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {selectedInterviews.map((interview, index) => (
              <TableRow key={interview._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="text-muted-foreground text-xl font-bold">
                  {interview.title || "No Title Available"}
                </TableCell>
                <TableCell className="text-muted-foreground text-xl font-bold">
                  {format(
                    new Date(interview?.createdAt as string),
                    "dd-MM-yyyy"
                  )}
                </TableCell>
                <TableCell className="text-xl font-bold">
                  {interview.interviewType}
                </TableCell>
                <TableCell className="text-xl font-bold">
                  {interview.interviewStatus}
                </TableCell>
                <TableCell>
                  <Button onClick={() => navigate("/admin/settings")}>
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 pt-6">
        <div className={`p-6 rounded-lg shadow-lg bg-background`}>
          <h2 className={`text-xl font-semibold mb-4`}>Users Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-container">
          <h2 className="text-xl font-semibold mb-4">
            Interview Types Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={interviewTypeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" name="Count" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
