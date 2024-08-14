import Header from "@/components/common/users/Header";
import { Button } from "@/components/ui/button";
import { FaRegCirclePlay } from "react-icons/fa6";
import React from "react";
import BgImg from "@/assets/home/banner-image.png";
import Communication from "@/assets/home/online-meeting-app2.png";
import Management from "@/assets/home/enterprise2.png";
import Coding from "@/assets/home/feature1.png";
import Benifits from "@/assets/home/Happy-face.jpg";
import { AiFillStar } from "react-icons/ai";
import { IoColorWandOutline, IoCheckmarkCircle } from "react-icons/io5";
import { GrAnalytics, GrTechnology } from "react-icons/gr";
import { GiEngagementRing } from "react-icons/gi";
import Footer from "@/components/common/Footer";
import { Plan } from "@/components/common/users/Plan";

export const Landingpage = () => {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center pt-20 md:pt-30 px-5 lg:px-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:mb-10">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold">
              Where Interview&apos;s Meet Innovation
            </h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="text-primary w-full h-20"
            >
              <path
                d="M10 50 Q200 10, 390 50"
                fill="none"
                stroke="#4787FA"
                strokeWidth="5"
                strokeLinecap="round"
              />
            </svg>
            <p className="text-lg font-semibold lg:w-4/5 pb-5">
              Let&apos;s make your hiring process more organized and efficient
              with InterviewInnovate, featuring the latest tools for seamless
              interviews and real-time collaboration.
            </p>
            <div className="flex items-center ga-3">
              <Button>Type for free</Button>
              <Button variant={"secondary"} className="hover:text-primary">
                <span className="border border-black p-1 rounded-full mr-2">
                  <FaRegCirclePlay className="w-4 h-4" />
                </span>
                View Demo
              </Button>
            </div>
          </div>
          <div className="pt-5">
            <img src={BgImg} alt="" />
          </div>
        </div>
        {/* companies */}
        <div className="text-center">
          <h1 className="font-bold text-xl lg:text-4xl pt-4">
            Simplify Your Interviews with{" "}
            <span className="text-primary">H</span>ire
            <span className="text-primary">H</span>ub: Trusted by 25,000+ Teams
          </h1>
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-5 my-5 text-xl text-foregroundAccent">
            <p className="flex items-center space-x-2">
              <span className="flex items-center">
                <GrTechnology className="inline-block" />
                <span>Techo</span>
              </span>
            </p>
            <p className="flex items-center space-x-2">
              <span className="flex items-center">
                <GrTechnology className="inline-block" />
                <span>Codeworks</span>
              </span>
            </p>
            <p className="flex items-center space-x-2">
              <span className="flex items-center">
                <GrTechnology className="inline-block" />
                <span>Vertex</span>
              </span>
            </p>
            <p className="flex items-center space-x-2">
              <span className="flex items-center">
                <GrTechnology className="inline-block" />
                <span>Alphatech</span>
              </span>
            </p>
            <p className="flex items-center space-x-2">
              <span className="flex items-center">
                <GrTechnology className="inline-block" />
                <span>Brightfuture</span>
              </span>
            </p>
            <p className="flex items-center space-x-2">
              <span className="flex items-center">
                <GrTechnology className="inline-block" />
                <span>Wipro</span>
              </span>
            </p>
          </div>
        </div>
        {/* supports */}
        <div className="flex flex-col lg:flex-row gap-5 py-20">
          <div>
            <h1 className="text-5xl font-bold">
              Global Partner Assistance: Our Commitment
            </h1>
            <p className=" pt-5 text-foregroundAccent pr-5">
              HireHub simplifies the interview process with live coding, video
              calls, and easy scheduling, making it easy for companies and
              candidates to connect and evaluate skills efficiently.
            </p>
            <br></br>
            <div className="flex gap-5">
              <div>
                <div className="flex gap-2 text-yellow-500">
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                </div>
                <p>4.6/5 rating</p>
                <p className="text-foregroundAccent">UI Design</p>
              </div>

              <div>
                <div className="flex gap-2 text-yellow-500">
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                </div>
                <p>4.6/5 rating</p>
                <p className="text-foregroundAccent">UI Design</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className=" flex gap-2">
              <div className="p-2 bg-backgroundAccent h-fit shadow">
                <IoColorWandOutline />
              </div>
              <div>
                <h4 className="text-lg font-bold">
                  Streamline Your Interviews
                </h4>
                <p>
                  Plan, collaborate, and conduct interviews that drive
                  meaningful engagement and growth for your team.
                </p>
              </div>
            </div>
            <div className=" flex gap-2">
              <div className="p-2 bg-backgroundAccent h-fit shadow">
                <GrAnalytics />
              </div>
              <div>
                <h4 className="text-lg font-bold">Analytics</h4>
                <p>
                  Analyze interview performance and generate comprehensive
                  reports to improve hiring decisions.
                </p>
              </div>
            </div>
            <div className=" flex gap-2">
              <div className="p-2 bg-backgroundAccent h-fit shadow">
                <GiEngagementRing />
              </div>
              <div>
                <h4 className="text-lg font-bold">Engagement</h4>
                <p>
                  Quickly navigate and interact with your candidates to foster
                  meaningful connections
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* features */}
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-3 pb-10">
            <h1 className="text-5xl font-bold">Our Features you can get</h1>
            <p className=" py-3 text-foregroundAccent">
              We offer a variety of innovative features that help increase your
              productivity and streamline your interview process effortlessly.
            </p>
            <div className="flex items-center justify-center">
              <Button className="rounded-2xl w-32 h-10">Get Started</Button>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div>
              <div className="md:px-20 lg:px-5">
                <img src={Coding} alt="" />
              </div>
              <h4 className="font-bold pt-5 pb-2">Collaborative Coding</h4>
              <p className="text-foregroundAccent">
                Code together with your team in real-time, streamlining
                collaboration and enhancing productivity.
              </p>
            </div>
            <div>
              <div className="md:px-20 lg:px-5">
                <img src={Communication} alt="" className="" />
              </div>
              <h4 className="font-bold pt-5 pb-2">Instant Communication</h4>
              <p className="text-foregroundAccent">
                Code together with your team in real-time, streamlining
                collaboration and enhancing productivity.
              </p>
            </div>
            <div>
              <div className="md:px-20 lg:px-5">
                <img src={Management} alt="" className="" />
              </div>
              <h4 className="font-bold pt-5 pb-2">
                Efficient Interview Management
              </h4>
              <p className="text-foregroundAccent">
                Streamline your interview process with easy scheduling,
                tracking, and coordination.
              </p>
            </div>
          </div>
        </div>
        {/* Benifit */}
        <div className="grid grid-cols-1 lg:grid-cols-2 py-16">
          <div className="py-5">
            <h2 className="text-4xl font-bold py-5">
              What Benifit Will <br></br>You Get
            </h2>

            <div className="flex flex-col gap-4">
              <p className="flex gap-2 items-center">
                <IoCheckmarkCircle className="text-primary tex-xl" />
                Seamless Interview Scheduling
              </p>
              <p className="flex gap-2 items-center">
                <IoCheckmarkCircle className="text-primary tex-xl" />
                Enhanced Candidate Experience
              </p>
              <p className="flex gap-2 items-center">
                <IoCheckmarkCircle className="text-primary tex-xl" />
                Instant Feedback Sharing
              </p>
              <p className="flex gap-2 items-center">
                <IoCheckmarkCircle className="text-primary tex-xl" />
                Customizable Interview Formats
              </p>
              <p className="flex gap-2 items-center">
                <IoCheckmarkCircle className="text-primary tex-xl" />
                Interactive Coding Sessions
              </p>
            </div>
          </div>
          <div>
            <img src={Benifits} alt="Benifits" />
          </div>
        </div>
        <Plan />
      </main>
      <Footer />
    </>
  );
};
