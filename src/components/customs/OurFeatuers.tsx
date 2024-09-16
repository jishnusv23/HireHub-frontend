import React from "react";
import { motion } from "framer-motion";

export const OurFeatuers = () => {
  return (
    <div className="pt-7 ">
      {/* Background Animation */}
      <div className="relative w-full max-w-6xl  rounded-lg overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: 50 }} 
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="absolute inset-0 bg-gradient-to--r from-blue-100 to-primary rounded-lg z-0"
        ></motion.div>

        
        <div className="relative z-10 p-8 lg:p-12 text-center">
          <h1 className="text-3xl font-bold mb-6">About Us</h1>

      
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
           
            <div className=" p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">
                Our Key Features 💡
              </h2>
              <ul className="list-disc list-inside text-left">
                <li className="mb-2">
                  Real-time video, audio, and chat-based interview sessions.
                </li>
                <li className="mb-2">
                  Integrated collaborative coding environment for live coding
                  assessments.
                </li>
                <li className="mb-2">
                  Role-based access control for interviewers, interviewees, and
                  admins.
                </li>
                <li className="mb-2">
                  Automated scheduling and notification system for interviews.
                </li>
                <li className="mb-2">
                  Secure file sharing and screen sharing capabilities during
                  interviews.
                </li>
              </ul>
            </div>

   
            <div className=" p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Our Approach 🎯</h2>
              <p>
                We believe in empowering both companies and job seekers by
                streamlining the interview process through advanced technology.
                Our platform focuses on efficiency, simplicity, and seamless
                user experience, leveraging microservices and clean architecture
                to ensure scalability and adaptability to various needs in the
                hiring process.
              </p>
            </div>

  
            <div className=" p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Our Mission 🚀</h2>
              <p>
                Our mission is to revolutionize the interview and recruitment
                process by offering a platform that fosters collaboration,
                fairness, and transparency. We aim to connect the best talent
                with companies, ensuring every interviewee has the tools needed
                to excel, and every recruiter has the technology to make
                informed hiring decisions.
              </p>
            </div>

    
            <div className=" p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Our Vision ✨</h2>
              <p>
                Our vision is to be the global leader in interview facilitation
                by continuously innovating our platform. We strive to create an
                inclusive and technology-driven ecosystem that elevates the
                hiring experience for both candidates and recruiters,
                transforming careers and workplaces.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// https://github.com/Slava-Nik/group-video-calls/blob/main/peerjs/index.js