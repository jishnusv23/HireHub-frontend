import React from "react";
import { FaComputer } from "react-icons/fa6";
import Webcall from "@/assets/logos/web-conferencing-logo.png";
import Mentor from "@/assets/logos/consulting-computer-icons.png";
import Salary from "@/assets/logos/salary-transparency-logo.jpg";
import Resume from "@/assets/logos/resume-blue-icons.png";
import { FaFileCode } from "react-icons/fa";
import { FaUserCog, FaRegSmile } from "react-icons/fa";
import { SiFuturelearn } from "react-icons/si";
import { GiMaterialsScience } from "react-icons/gi";
import { FcManager } from "react-icons/fc";

import { MdDesignServices } from "react-icons/md";

export const Homesection = () => {
  return (
    <>
      <div className="">
        <div className="grid grid-cols-2 lg:grid-cols-4  gap-5 my-5 text-2xl text-foregroundAccent">
          <div className="flex items-center justify-center space-x-2 bg-backgroundAccent h-16 rounded-md border border-white hover:border-black">
            <img
              src={Webcall}
              alt="Mock Interview"
              width={40}
              height={40}
              className=""
            />
            <span>Mock Interview</span>
          </div>
          <div className="flex items-center justify-center text-primary space-x-2 bg-backgroundAccent h-16 rounded-md border border-white hover:border-black">
            <img src={Mentor} alt="Mock Interview" width={40} height={40} />
            <span>Mentorship</span>
          </div>
          <div className="flex items-center justify-center space-x-2  bg-backgroundAccent rounded-md border border-white hover:border-black ">
            <img src={Salary} alt="Mock Interview" width={40} height={40} />
            <span>Salary Negotiation</span>
          </div>
          <div className="flex items-center space-x-2  justify-center bg-backgroundAccent rounded-md border border-white hover:border-black ">
            <img src={Resume} alt="Mock Interview" width={40} height={40} />
            <span>Resume Review</span>
          </div>
        </div>
        <br></br>
        <div className="grid grid-cols-2 lg:grid-cols-7 gap-4 my-5 pt-8 text-2xl text-foregroundAccent">
          <div className="flex flex-col items-center space-y-2">
            <FaComputer className="text-4xl" />
            <span className="text-sm">Coding & Algorithm</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <MdDesignServices className="text-4xl" />
            <span className="text-sm">System Design</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <FcManager className="text-4xl" />
            <span className="text-sm">Software Dev Manager</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <FaUserCog className="text-4xl" />
            <span className="text-sm">
              Technical Program <span className=" lg:pl-8"> Manager</span>
            </span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <FaRegSmile className="text-4xl" />
            <span className="text-sm">Behavioral</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <SiFuturelearn className="text-4xl" />
            <span className="text-sm">Machine Learning Engineer</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <GiMaterialsScience className="text-4xl" />
            <span className="text-sm">Data Scientist</span>
          </div>
        </div>
      </div>
    </>
  );
};
