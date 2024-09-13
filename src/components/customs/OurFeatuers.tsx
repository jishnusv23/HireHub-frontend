import React from "react";
import { motion } from "framer-motion";

export const OurFeatuers = () => {
  return (
    <div className="pt-7 ">
      {/* Background Animation */}
      <div className="relative w-full max-w-6xl  rounded-lg overflow-hidden">
        {/* <motion.div
          initial={{ opacity: 0, x: 50 }} // Adjust x for mobile responsiveness
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="absolute inset-0 bg-primary-to-r from-blue-100 to-primary rounded-lg z-0"
        ></motion.div> */}

        {/* Content Container */}
        <div className="relative z-10 p-8 lg:p-12 text-center">
          <h1 className="text-3xl font-bold mb-6">About Us</h1>

          {/* Grid Layout for Features, Approach, Mission, and Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {/* Features Section */}
            <div className=" p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">
                Our Key Feature&apos;s 💡
              </h2>
              <ul className="list-disc list-inside text-left">
                <li className="mb-2">
                  Real-time job application and posting system.
                </li>
                <li className="mb-2">Advanced job filtering and matching.</li>
                <li className="mb-2">
                  Integrated real-time chat and video interview functionality.
                </li>
                <li className="mb-2">
                  Seamless user management and role-based access control.
                </li>
              </ul>
            </div>

            {/* Approach Section */}
            <div className=" p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Our Approach 🎯</h2>
              <p>
                We prioritize a user-centric approach, ensuring that both job
                seekers and recruiters have a streamlined, intuitive experience.
                Our platform is designed to be scalable and adaptable, built
                with Clean Architecture principles and microservices to handle
                the dynamic needs of the job market.
              </p>
            </div>

            {/* Mission Section */}
            <div className=" p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Our Mission 🚀</h2>
              <p>
                Our mission is to transform the job-seeking and recruitment
                process by providing a comprehensive, secure, and efficient
                platform. We aim to connect job seekers with their ideal
                opportunities and help recruiters find the right talent, all
                while maintaining high standards of user experience and
                technical excellence.
              </p>
            </div>

            {/* Vision Section */}
            <div className=" p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Our Vision ✨</h2>
              <p>
                Our vision is to become the leading platform in the job market
                by continuously innovating and enhancing our services. We strive
                to create a seamless and inclusive environment for job seekers
                and recruiters, leveraging advanced technology to meet their
                evolving needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
