import Header from "@/components/common/users/Header";
import { Homesection } from "@/components/common/users/Homesection";
import HomeImg from "@/assets/home/man.png";
import { Button } from "@/components/ui/button";
import { Contentsection } from "@/components/common/users/Contentsection";
import { Featuressection } from "@/components/common/users/Featuressection";
import Footer from "@/components/common/Footer";
import WavyText from "@/components/ui/wavyText";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/hooks/hooks";
import { getUserData } from "@/redux/store/actions/auth";
import { InterviewChoice } from "@/components/customs/InterviewChoice";
import { CustomModal } from "@/components/customs/CustomModal";
export const Home = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    setLoading(true);
  }, [dispatch]);
  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  const handleInterview = () => {
    setIsModalOpen(true);
  };

  const closeModal = async () => {
    setIsModalOpen(false);
    await dispatch(getUserData());
  };
  return (
    <>
      <Header />

      <main className="flex min-h-screen flex-col pt-20 md:pt-30 px-5 lg:px-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-16">
          <div className="gap-2">
            <WavyText
              text="Land Your Dream"
              replay={loading}
              className="text-4xl md:text-6xl font-bold"
            />
            <WavyText
              text=" Job"
              replay={loading}
              className="text-4xl md:text-6xl font-bold"
            />

            <h1 className="text-2xl pt-6 text-foregroundAccent font-semibold lg:w-4/5 pb-5">
              1-on-1 Interview Preparation Sessions
            </h1>
            <p className="text-lg text-foregroundAccent font-bold lg:w-4/5 pb-5">
              Elevate your interview game Professionals from top tech companies
              <br></br>
              offer mock interviews and dedicated mentorship<br></br> sessions,
              gearing you up for success.
            </p>
            <p className="pt-6 text-primary text-xl">
              4000+ sessions have been coached. 4.96 average rating.
            </p>
          </div>
          <div>
            <img src={HomeImg} alt="HomeImg" className="rounded-md" />
          </div>
        </div>
        <Homesection />
        <div className="flex justify-center pt-6 ">
          <Button className="w-48 h-14 rounded-full" onClick={handleInterview}>
            Join a Meeting
          </Button>
        </div>
        <CustomModal
          isOpen={isModalOpen}
          onClose={closeModal}
          title="Create a Meeting"
        >
          <InterviewChoice />
        </CustomModal>
        <Contentsection />
        <Featuressection />
      </main>
      <Footer />
    </>
  );
};
