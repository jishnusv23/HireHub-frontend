import React, { Suspense } from "react";
import Loading from "./Loading/Loading";
import WavyText from "../ui/wavyText";
import { OurFeatuers } from "../customs/OurFeatuers";
// import CustomCarousel from '../customs/CustomCarousel'
const CustomCarousel = React.lazy(() => import("../customs/CustomCarousel"));

export const Aboutus = () => {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center pt-20 md:pt-30 px-5 lg:px-40">
        {/* <CustomCarousel /> */}
        <WavyText
          text="Empowering Careers Through Innovative Interviews"
          replay={true}
          className="text-sm lg:text-4xl font-bold"
        />
        {/* <h1 className="text-4xl font-bold "></h1> */}
        <p className="pt-8 text-xl text-foregroundAccent font-bold">
          We envision a world where individuals and companies can unlock their
          full potential by facilitating efficient, seamless, and impactful
          interviews, transforming careers through cutting-edge collaboration
          and technology.
        </p>
        <Suspense fallback={<Loading />}>
          <CustomCarousel />
        </Suspense>
        <OurFeatuers/>
      </div>
    </>
  );
};
