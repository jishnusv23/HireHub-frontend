import Header from "@/components/common/users/Header";
import React from "react";
import { motion } from "framer-motion";
import { ForgotLoginField } from "@/components/common/auth/ForgotLoginField";
import IMg from "@/assets/home/header.png";

export const ForgotPassLogin = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen h-screen flex flex-col lg:flex-row">
        {/* Left Side - Static */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4">
          <ForgotLoginField />
        </div>

        {/* Right Side - Animated Image */}
        <motion.div
          className="w-full lg:w-1/2 flex items-center justify-center p-4"
          initial={{ opacity: 0, x: -100 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.5 }} 
        >
          <img
            src={IMg}
            alt="Forgot Password"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </>
  );
};

export default ForgotPassLogin;
