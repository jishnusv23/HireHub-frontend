import { Button } from "@/components/ui/button";
import React from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { IoCheckmarkCircle } from "react-icons/io5";

export const Plan = () => {
  return (
    <>
      <div className="text-center mb-8">
        <h2 className="font-bold text-3xl md:text-4xl">Choose Plan</h2>
        <h2 className="font-bold text-3xl md:text-4xl">That’s Right For You</h2>
        <p className="text-gray-600 mt-4">
          Select the Plan That Fits Your Needs. Contact Us for Any Questions or
          Assistance.
        </p>
        <div className="flex justify-center space-x-4 mt-6">
          <Button className="bg-white text-black border border-gray-300 shadow-md hover:shadow-lg transition duration-200">
            Bill Monthly
          </Button>
          <Button className="bg-primary text-white shadow-md hover:shadow-lg transition duration-200">
            Bill Annually
          </Button>
        </div>
      </div>
      <div className="flex justify-center ">
        <div className="">
          <Tabs.Root
            className="rounded-xl p-5 shadow-lg bg-white"
            defaultValue="Free"
          >
            <Tabs.List
              className="flex justify-center space-x-8 p-4 border-b border-gray-200"
              aria-label="Select a plan"
            >
              <Tabs.Trigger
                className="px-6 py-2 text-lg font-semibold text-gray-700 rounded-lg hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary"
                value="Free"
              >
                Free
              </Tabs.Trigger>
              <Tabs.Trigger
                className="px-6 py-2 text-lg font-semibold bg-primary text-white rounded-lg  focus:outline-none focus:ring-2 focus:ring-primary"
                value="Pro"
              >
                Pro
              </Tabs.Trigger>
              <Tabs.Trigger
                className="px-6 py-2 text-lg font-semibold text-gray-700 rounded-lg hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary"
                value="Business"
              >
                Business
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content
              className="bg-backgroundAccent rounded-2xl p-6"
              value="Free"
            >
              <p className="text-lg  text-center mb-4 font-bold">
                Have a go and test your superpowers
              </p>
              <p className="text-6xl font-bold text-center mb-6">0</p>
              <div className="flex flex-col gap-3  px-5 py-10 rounded-xl text-left">
                <div className="flex gap-2 items-center">
                  <IoCheckmarkCircle className="text-primary text-2xl mr-2" />
                  <span>Basic Interview Scheduling</span>
                </div>
                <div className="flex gap-2 items-center">
                  <IoCheckmarkCircle className="text-primary text-2xl mr-2" />
                  <span>Basic Chat and Video Call</span>
                </div>
                <div className="flex gap-2 items-center">
                  <IoCheckmarkCircle className="text-primary text-2xl mr-2" />
                  <span>Basic Coding Collaboration</span>
                </div>
                <div className="flex gap-2 items-center">
                  <IoCheckmarkCircle className="text-primary text-2xl mr-2" />
                  <span>Core Assessment Features</span>
                </div>
                <div className="flex gap-2 items-center">
                  <IoCheckmarkCircle className="text-primary text-2xl mr-2" />
                  <span>Basic Experience</span>
                </div>
              </div>
              <div className="flex justify-center mt-6">
                <Button className="bg-primary text-white hover:bg-primary-dark transition duration-200">
                  Signup for free
                </Button>
              </div>
            </Tabs.Content>
            <Tabs.Content
              className="bg-backgroundAccent rounded-2xl p-6"
              value="Pro"
            >
              <p className="text-lg  text-center mb-4 font-bold">
                Experiment the power of infinite possibilities
              </p>
              <p className="text-6xl  font-bold text-center mb-6">₹499</p>
              <div className="flex flex-col gap-3 bg-backgroundAccent px-5 py-10 rounded-xl text-left">
                <div className="flex gap-2 items-center">
                  <IoCheckmarkCircle className="text-primary text-2xl mr-2" />
                  <span>Advanced Scheduling</span>
                </div>
                <div className="flex gap-2 items-center">
                  <IoCheckmarkCircle className="text-primary text-2xl mr-2" />
                  <span>Enhanced Communication</span>
                </div>
                <div className="flex gap-2 items-center">
                  <IoCheckmarkCircle className="text-primary text-2xl mr-2" />
                  <span>Extended Coding</span>
                </div>
                <div className="flex gap-2 items-center">
                  <IoCheckmarkCircle className="text-primary text-2xl mr-2" />
                  <span>Comprehensive Assessment</span>
                </div>
                <div className="flex gap-2 items-center">
                  <IoCheckmarkCircle className="text-primary text-2xl mr-2" />
                  <span>Improved Experience</span>
                </div>
              </div>
              <div className="flex justify-center mt-6">
                <Button className="bg-primary text-white hover:bg-primary-dark transition duration-200">
                  Go to pro
                </Button>
              </div>
            </Tabs.Content>
            <Tabs.Content
              className="bg-backgroundAccent rounded-2xl p-6"
              value="Business"
            >
              <p className="text-lg text-center mb-4 font-bold">
                Unveil new superpowers and join the Design Leaque
              </p>
              <p className="text-6xl font-bold text-center mb-6">₹4999</p>
              <div className="flex flex-col gap-3  px-5 py-10 rounded-xl text-left">
                <div className="flex gap-2 items-center">
                  <IoCheckmarkCircle className="text-primary text-2xl mr-2" />
                  <span>Premium Interview Scheduling</span>
                </div>
                <div className="flex gap-2 items-center">
                  <IoCheckmarkCircle className="text-primary text-2xl mr-2" />
                  <span>Premium Chat and Video Call</span>
                </div>
                <div className="flex gap-2 items-center">
                  <IoCheckmarkCircle className="text-primary text-2xl mr-2" />
                  <span>Premium Coding Collaboration</span>
                </div>
                <div className="flex gap-2 items-center">
                  <IoCheckmarkCircle className="text-primary text-2xl mr-2" />
                  <span>Comprehensive Assessment Features</span>
                </div>
                <div className="flex gap-2 items-center">
                  <IoCheckmarkCircle className="text-primary text-2xl mr-2" />
                  <span>Comprehensive Experience</span>
                </div>
              </div>
              <div className="flex justify-center mt-6">
                <Button className="bg-primary text-white hover:bg-primary-dark transition duration-200">
                  Goto Business
                </Button>
              </div>
            </Tabs.Content>
          </Tabs.Root>
        </div>
      </div>
    </>
  );
};
