import { OtpField } from "@/components/common/auth/OtpField";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/users/Header";
import React from "react";

export const Otp = () => {
  return (
    <>
      <Header />
      <main className="flex min-h-screen   flex-col items-center pt-20   md:pt-30 px-5 lg:px-40">
        <OtpField />
        <div className="flex justify-center">
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="text-primary w-full h-20"
          >
            <line
              x1="10"
              y1="50"
              x2="390"
              y2="50"
              stroke="#4787FA"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </main>
      {/* <Footer /> */}
    </>
  );
};
