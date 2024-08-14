import Header from "@/components/common/users/Header";
import { Homesection } from "@/components/common/users/Homesection";
import HomeImg from "@/assets/home/userHome.jpg";
import { Button } from "@/components/ui/button";
import { Contentsection } from "@/components/common/users/Contentsection";
import { Featuressection } from "@/components/common/users/Featuressection";
import Footer from "@/components/common/Footer";
export const Home = () => {
  return (
    <>
      <Header />

      <main className="flex min-h-screen flex-col pt-20 md:pt-30 px-5 lg:px-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-16">
          <div className="gap-2">
            <h4 className="text-4xl md:text-6xl font-bold">
              Land Your Dream Job
            </h4>

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
          <Button className="w-48 h-14 rounded-full">Join a Meeting</Button>
        </div>
        <Contentsection />
        <Featuressection />
        {/* <br></br> */}
      </main>
      <Footer />
    </>
  );
};
