import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { RooteState } from "@/redux/store";
import { getAllInterviewsByIdAction } from "@/redux/store/actions/interviewer/getAllInterivewes";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
  BarChart,
  XAxis,
  YAxis,
  Bar,
} from "recharts";
import React, { useEffect, useState } from "react";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const InterviewerDashboard = () => {
  const { data } = useAppSelector((state: RooteState) => state.user);
  const [interviews, setInterviews] = useState<any[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchInterviewerInterviews = async () => {
      if (data?._id) {
        const response = await dispatch(getAllInterviewsByIdAction(data._id));
        setInterviews(response.payload.data);
      }
    };
    fetchInterviewerInterviews();
  }, [dispatch, data?._id]);

  // Transform the data for the pie chart
  const totalInterviews = interviews.length;
  const completedInterviews = interviews.filter(
    (interview) => interview.interviewStatus === "Completed"
  ).length;
  const pendingInterviews = interviews.filter(
    (interview) => interview.interviewStatus === "Scheduled"
  ).length;

  const interviewStatusData = [
    { name: "Completed", value: completedInterviews },
    { name: "Scheduled", value: pendingInterviews },
    {
      name: "Other",
      value: totalInterviews - completedInterviews - pendingInterviews,
    },
  ];

  // Grouping interviews by type for the BarChart
  const interviewTypeCount = interviews.reduce((acc, interview) => {
    const type = interview.interviewType;
    if (type) {
      acc[type] = (acc[type] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);
  const totalParticipants = interviews.reduce((acc, interview) => {
    return acc + (interview.participants ? interview.participants.length : 0);
  }, 0);

  // Transform interviewTypeCount object into an array suitable for recharts
  const interviewTypeData = Object.keys(interviewTypeCount).map((type) => ({
    name: type,
    value: interviewTypeCount[type],
  }));

  return (
    <>
      <div className="p-6 max-w-full mx-auto bg-backgroundAccent shadow-md overflow-hidden">
        <h1 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-primary p-4 rounded-lg">
            <h2 className="font-semibold">Total Interviews Conducted</h2>
            <p className="text-2xl">{totalInterviews}</p>
          </div>
          <div className="bg-primary p-4 rounded-lg">
            <h2 className="font-semibold">Total Participants in Interviews</h2>
            <p className="text-2xl">{totalParticipants}</p>
          </div>
          <div className="bg-primary p-4 rounded-lg">
            <h2 className="font-semibold">Total Completed Interviews</h2>
            <p className="text-2xl">{completedInterviews}</p>
          </div>
        </div>
      </div>

      <div className="p-6 shadow-lg bg-background grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="chart-container">
          <h2 className="text-xl font-semibold mb-4">Interview Analytics</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={interviewStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value, percent }) =>
                  `${name}: ${value} (${(percent * 100).toFixed(0)}%)`
                }
              >
                {interviewStatusData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h2 className="text-xl font-semibold mb-4">
            Top Performing Interview Categories
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={interviewTypeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" name="Interview Type" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default InterviewerDashboard;
