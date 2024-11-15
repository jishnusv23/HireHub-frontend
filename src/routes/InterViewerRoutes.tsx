import InterviewerDashboard from "@/components/interviewer/InterviewerDashboard";
import { LayoutInterviewer } from "@/pages/interviewer/LayoutInterviewer";
import { InterviewerProfile } from "@/components/interviewer/InterviewerProfile";
import { Meetings } from "@/components/interviewer/Meetings";
import { Route, Routes } from "react-router-dom";
import { SingleInterviewDetails } from "@/components/common/Interviewer/SingleInterviewDetails";
import InterviewerQuestions from "@/components/interviewer/InterviewerQuestions";

import Blogs from "@/components/customs/Blogs";
import FeedBack from "@/pages/Interviewee/FeedBack";
import { divide } from "lodash";

export const InterViewerRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LayoutInterviewer />}>
        <Route index element={<InterviewerDashboard />} />
        <Route path="Dashboard" element={<InterviewerDashboard />} />
        <Route path="profile" element={<InterviewerProfile />} />
        <Route path="MyInterviews" element={<Meetings />} />
        <Route path="Question-Bank" element={<InterviewerQuestions />} />
        <Route path="blogs" element={<Blogs />} />
        <Route
          path="MyInterviews/singleDetails"
          element={<SingleInterviewDetails />}
        />
        <Route path="MyInterviews/feedback" element={<div>hey</div>} />
      </Route>
    </Routes>
  );
};
// hirehubinterviewer@gmail.com
// HireInterviewer@12
