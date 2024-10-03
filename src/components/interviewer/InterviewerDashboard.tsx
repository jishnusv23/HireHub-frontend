import React, { useEffect, useState } from "react";
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

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

interface InterviewStatusData {
  name: string;
  value: number;
}

interface CustomLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
  name: string;
  value: number;
}

const renderCustomLabel = (props: CustomLabelProps) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, percent, name } = props;
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${name} ${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const InterviewerDashboard: React.FC = () => {
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

  const interviewStatusData: InterviewStatusData[] = [
    { name: "Completed", value: completedInterviews },
    { name: "Scheduled", value: pendingInterviews },
    {
      name: "Other",
      value: totalInterviews - completedInterviews - pendingInterviews,
    },
  ].filter((item) => item.value > 0);
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
  const interviewTypeData = Object.keys(interviewTypeCount)
    .map((type) => ({
      name: type,
      value: interviewTypeCount[type],
    }))
    .sort((a, b) => b.value - a.value); // Sort by value in descending order

  return (
    <div className="p-6 max-w-full mx-auto bg-background shadow-md overflow-hidden">
      <h1 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="chart-container p-4 bg-backgroundAccent rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">
            Interview Status Distribution
          </h2>
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
                label={renderCustomLabel}
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

        <div className="chart-container p-4 bg-backgroundAccent rounded-lg shadow">
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

export default InterviewerDashboard;
