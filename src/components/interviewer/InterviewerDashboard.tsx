// import React from 'react'

// const InterviewerDashboard = () => {
//   return (
//     <div>InterviewerDashboard</div>
//   )
// }

// export default InterviewerDashboard

import React from "react";

const InterviewerDashboard = () => {
  return (
    <div className="p-6 max-w-full mx-auto bg-backgroundAccent rounded-2xl shadow-md overflow-hidden">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-primary p-4 rounded-lg">
          <h2 className="font-semibold">Application</h2>
          <p className="text-2xl">1,234</p>
        </div>
        <div className="bg-primary p-4 rounded-lg">
          <h2 className="font-semibold">Revenue</h2>
          <p className="text-2xl">$10,567</p>
        </div>
        <div className="bg-primary p-4 rounded-lg">
          <h2 className="font-semibold">Completed</h2>
          <p className="text-2xl">56</p>
        </div>
      </div>
    </div>
  );
};

export default InterviewerDashboard;
