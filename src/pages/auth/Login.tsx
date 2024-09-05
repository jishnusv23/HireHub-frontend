import Header from "@/components/common/users/Header";
import React from "react";
import Logo from "@/assets/logos/HireHub-r.png";
import HireHub from "@/components/common/HireHub";
import { LoginForm } from "@/components/auth/LoginForm";
import GoogleAuth from "@/components/common/GoogleAuth";
import LoginImg from "@/assets/auth/Login.png";
import Footer from "@/components/common/Footer";
import { useNavigate } from "react-router-dom";
export const Login = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <div className="lg:h-screen grid grid-cols-1  lg:grid-cols-2 mb-5">
        <div className="px-5 pt-20 lg:p-20 flex items-center">
          <div className="w-full lg:px-20">
            <div className="flex items-center gap-4 py-10">
              <img
                src={Logo}
                alt="HireHubLogo"
                className="w-10 lg:w-16 h-10 lg:h-16"
              />
              <h1 className="font-bold text-5xl">
                <HireHub />
              </h1>
            </div>
            <div className="text-2xl font-bold py-2">Login</div>
            <LoginForm />
            <p
              className="py-5 text-primary text-center hover:text-blue-600"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password
            </p>
            <div className="flex items-center gap-3">
              <div className="h-[2px] w-full bg-backgroundAccent rounded-full"></div>
              <p>or</p>
              <div className="h-[2px] w-full bg-backgroundAccent rounded-full"></div>
            </div>
            <GoogleAuth />
            <p className="py-5">
              Don&apos;t Have an Account?{" "}
              <span
                className="text-primary hover:text-primary"
                onClick={() => navigate("/signup")}
              >
                Signup
              </span>
            </p>
          </div>
        </div>
        <div className="w-full h-screen overflow-clip relative">
          <img src={LoginImg} alt="" />
          {/* <div className="absolute  top-1/3 text-center">
            <p className="text-2xl">Nice see you </p>
            <h1 className="text-6xl py-5 font-black">Welcome Back</h1>
            <div className="flex items-center justify-center pb-5">
              <div className="w-10 h-2 bg-foreground rounded-full"></div>
            </div>
            <p className="w-1/2 mx-auto text-sm">
              Let&apos;s make your work more organize and easily using the
              recurring Dashboard with many of the latest features in managing
              work every day.
            </p>
          </div> */}
        </div>
      </div>
      <Footer />
    </>
  );
};
