import React from "react";
import { FaComputer } from "react-icons/fa6";
import Webcall from "@/assets/logos/web-conferencing-logo.png";
import Mentor from "@/assets/logos/consulting-computer-icons.png";
import Salary from "@/assets/logos/salary-transparency-logo.jpg";
import Resume from "@/assets/logos/resume-blue-icons.png";

export const Homesection = () => {
  return (
    <>
      <div className="">
        <div className="grid grid-cols-4 lg:grid-cols-4 gap-5 my-5 text-2xl text-foregroundAccent">
          <div className="flex items-center space-x-2 bg-backgroundAccent rounded-full">
            <img src={Webcall} alt="Mock Interview" width={40} height={40} />
            <span>Mock Interview</span>
          </div>
          <div className="flex items-center text-primary space-x-2 bg-backgroundAccent rounded-md">
            <img src={Mentor} alt="Mock Interview" width={40} height={40} />
            <span>Mentorship</span>
          </div>
          <div className="flex items-center space-x-2">
            <img src={Salary} alt="Mock Interview" width={40} height={40} />
            <span>Salary Negotiation</span>
          </div>
          <div className="flex items-center space-x-2">
            <img src={Resume} alt="Mock Interview" width={40} height={40} />
            <span>Resume Review</span>
          </div>
        </div>
        <div className="grid grid-cols-4 lg:grid-cols-6 gap- my-5 pt-8 text-2xl text-foregroundAccent">
          <div className="flex items-center space-x-2">
            <span>Mock Interview</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>Mock Interview</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>Mock Interview</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>Mentorship</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>Salary Negotiation</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>Resume Review</span>
          </div>
        </div>
      </div>
    </>
  );
};
