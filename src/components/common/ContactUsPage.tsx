import React from "react";
import Img from "@/assets/home/Legal-3.webp";
import { ContactForm } from "./users/ContactForm";
import { motion } from "framer-motion";

export const ContactUsPage = () => {
  return (
    <div className="lg:h-full grid grid-cols-1 lg:grid-cols-2 mb-5">
      <div className="px-5 pt-20 lg:p-20 flex items-center relative">
        <div className=" relative">
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="absolute w-[120%] h-[150%] bg-gradient-to-r from-blue-100 to-blue-800 top-[-20%] left-[-10%] rounded-tl-[30rem] rounded-bl-[10rem] z-0"
          ></motion.div>

          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="relative z-10"
          >
            <img src={Img} alt="Contact Us Image" className="w-full" />
          </motion.div>
        </div>
      </div>

      <div className="w-full h-auto lg:h-screen relative pt-14 pr-8 pl-9">
        <ContactForm />
      </div>
    </div>
  );
};
