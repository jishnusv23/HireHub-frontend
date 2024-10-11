import  {  useState } from "react";
import Meet from "@/assets/home/interview-scaled.jpeg";
import ReviewRecord from "@/assets/home/review-record.png";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/hooks/hooks";
import { getUserData } from "@/redux/store/actions/auth";

import { CustomModal } from "@/components/customs/CustomModal";
import { InterviewChoice } from "@/components/customs/InterviewChoice";
export const Contentsection = () => {
  const dispatch = useAppDispatch();
  // const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  //  const navigate = useNavigate();
  //  useEffect(() => {
  //    setLoading(true);
  //  }, [dispatch]);

   const handleInterview = () => {
     setIsModalOpen(true);
   };

   const closeModal = async () => {
     setIsModalOpen(false);
     await dispatch(getUserData());
   };
  return (
    <>
      <div className="pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-3">
          <div className="flex flex-col justify-center lg:justify-start">
            <h4 className="text-2xl md:text-4xl font-bold">
              Practice for the Pressure
            </h4>
            <p className="text-lg font-semibold lg:w-4/5 pt-4 pb-5">
              We use your built-in camera to recreate
              <br /> the pressure of actual interviews so you
              <br /> can gain realistic experience and feel
              <br /> prepared for anything.
            </p>
          </div>
          <div className="flex justify-center lg:justify-end items-center">
            <div className="bg-white w-80 h-80 border border-black flex items-center justify-center">
              <img src={Meet} alt="" className="w-60 h-56" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-3">
          <div className="flex justify-center lg:justify-start items-center">
            <div className="bg-white w-80 h-80 border border-black flex items-center justify-center">
              <img src={ReviewRecord} alt="" className="w-60 h-56" />
            </div>
          </div>
          <div className="flex flex-col justify-center lg:justify-end">
            <h4 className="text-2xl md:text-4xl font-bold">
              Review Your<br></br> Recorded Responses
            </h4>
            <p className="text-lg font-semibold lg:w-4/5 pt-4 pb-5">
              Your responses are automatically<br></br> recorded. so you can
              watch them after<br></br> your interview and know exactly how
            </p>
            <Button
              className="w-48 h-14 rounded-full"
              onClick={handleInterview}
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
      <CustomModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Create a Meeting"
      >
        <InterviewChoice />
      </CustomModal>
    </>
  );
};
