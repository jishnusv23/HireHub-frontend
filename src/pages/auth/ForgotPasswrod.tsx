import { ForgotField } from "@/components/common/auth/ForgotField";
import Header from "@/components/common/users/Header";
import React from "react";
import { motion } from "framer-motion";
import IMg from "@/assets/home/DSC_0918.jpg";


const ForgotPassword = () => {
 

  return (
    <>
      <Header />
      <div className="min-h-screen h-screen flex flex-col lg:flex-row">
        <motion.div
          className="w-full lg:w-1/2 flex items-center justify-center p-0"
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

        <div className="w-full lg:w-1/2 flex items-center justify-center bg-backgroundAccent p-4 lg:p-0">
          <ForgotField />
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
