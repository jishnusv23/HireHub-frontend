import { Button } from "@/components/ui/button";
import * as Tabs from "@radix-ui/react-tabs";
import { IoCheckmarkCircle } from "react-icons/io5";

export const Plan = () => {
  return (
    <>
      <div className="text-center mb-8 px-4">
        <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl">
          Choose Plan
        </h2>
        <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl">
          That’s Right For You
        </h2>
        <p className="text-gray-600 mt-4 text-sm md:text-base lg:text-lg">
          Select the Plan That Fits Your Needs. Contact Us for Any Questions or
          Assistance.
        </p>
        <div className="flex justify-center space-x-4 mt-6 flex-wrap">
          <Button className="bg-white text-black border border-gray-300 shadow-md hover:shadow-lg transition duration-200 mb-2 md:mb-0">
            Bill Monthly
          </Button>
          <Button className="bg-primary text-white shadow-md hover:shadow-lg transition duration-200">
            Bill Annually
          </Button>
        </div>
      </div>

      <div className="flex justify-center px-4">
        <div className="w-full max-w-3xl">
          <Tabs.Root
            className="rounded-xl p-5 shadow-lg bg-white"
            defaultValue="Free"
          >
            <Tabs.List
              className="flex justify-center space-x-4 md:space-x-8 p-4 border-b border-gray-200 overflow-x-auto"
              aria-label="Select a plan"
            >
              <Tabs.Trigger
                className="px-4 py-2 text-base md:text-lg font-semibold text-gray-700 rounded-lg hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary transition"
                value="Free"
              >
                Free
              </Tabs.Trigger>
              <Tabs.Trigger
                className="px-4 py-2 text-base md:text-lg font-semibold bg-primary text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
                value="Pro"
              >
                Pro
              </Tabs.Trigger>
              <Tabs.Trigger
                className="px-4 py-2 text-base md:text-lg font-semibold text-gray-700 rounded-lg hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary transition"
                value="Business"
              >
                Business
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content
              className="bg-backgroundAccent rounded-2xl p-6 mt-4"
              value="Free"
            >
              <p className="text-lg text-center mb-4 font-bold">
                Have a go and test your <br /> superpowers
              </p>
              <p className="text-4xl md:text-6xl font-bold text-center mb-6">
                0
              </p>
              <div className="flex flex-col gap-3 px-5 py-10 rounded-xl text-left">
                {[
                  "Basic Interview Scheduling",
                  "Basic Chat and Video Call",
                  "Basic Coding Collaboration",
                  "Core Assessment Features",
                  "Basic Experience",
                ].map((item,index) => (
                  <div className="flex gap-2 items-center" key={index}>
                    <IoCheckmarkCircle className="text-primary text-2xl mr-2" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-6">
                <Button className="bg-primary text-white hover:bg-primary-dark transition duration-200">
                  Signup for free
                </Button>
              </div>
            </Tabs.Content>

            <Tabs.Content
              className="bg-backgroundAccent rounded-2xl p-6 mt-4"
              value="Pro"
            >
              <p className="text-lg text-center mb-4 font-bold">
                Experiment the power of infinite
                <br /> possibilities
              </p>
              <p className="text-4xl md:text-6xl font-bold text-center mb-6">
                ₹499
              </p>
              <div className="flex flex-col gap-3 px-5 py-10 rounded-xl text-left">
                {[
                  "Advanced Scheduling",
                  "Enhanced Communication",
                  "Extended Coding",
                  "Comprehensive Assessment",
                  "Improved Experience",
                ].map((item) => (
                  <div className="flex gap-2 items-center">
                    <IoCheckmarkCircle className="text-primary text-2xl mr-2" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-6">
                <Button className="bg-primary text-white hover:bg-primary-dark transition duration-200">
                  Go to pro
                </Button>
              </div>
            </Tabs.Content>

            <Tabs.Content
              className="bg-backgroundAccent rounded-2xl p-6 mt-4"
              value="Business"
            >
              <p className="text-lg text-center mb-4 font-bold">
                Unveil new superpowers
                <br /> and join the
                <br /> Design League
              </p>
              <p className="text-4xl md:text-6xl font-bold text-center mb-6">
                ₹4999
              </p>
              <div className="flex flex-col gap-3 px-5 py-10 rounded-xl text-left">
                {[
                  "Premium Interview Scheduling",
                  "Premium Chat and Video Call",
                  "Premium Coding Collaboration",
                  "Comprehensive Assessment Features",
                  "Comprehensive Experience",
                ].map((item) => (
                  <div className="flex gap-2 items-center">
                    <IoCheckmarkCircle className="text-primary text-2xl mr-2" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-6">
                <Button className="bg-primary text-white hover:bg-primary-dark transition duration-200">
                  Go to Business
                </Button>
              </div>
            </Tabs.Content>
          </Tabs.Root>
        </div>
      </div>
    </>
  );
};
