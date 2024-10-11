import Firt from "@/assets/home/cartoon-little-boy2.png";
import Second from "@/assets/home/handshake-image2.png";
import Third from "@/assets/home/rocket-rocket2.png";
import Four from "@/assets/home/goal-achievement2.png";

export const Featuressection = () => {
  return (
    <>
      <div className="pt-10 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col items-start">
            <img src={Firt} alt="Interview Icon" width={60} height={60} />
            <h1 className="text-2xl font-bold mt-4">
              Build interview confidence.
            </h1>
            <p className="text-lg text-foregroundAccent pt-2">
              We give you everything you need to
              <br /> master your interview skills in less time
              <br /> than any other option, so you can walk
              <br /> into your interview with confidence.
            </p>
          </div>

          <div className="flex flex-col items-end">
            <img src={Second} alt="Interview Icon" width={60} height={60} />
            <h1 className="text-2xl font-bold mt-4">Get hired faster.</h1>
            <p className="text-lg text-foregroundAccent pt-2">
              Our simulator is optimized to help you<br></br> master your
              interview skills in the most <br></br> efficient way possible, so
              you can be <br></br> prepared to ace the interview in no<br></br>{" "}
              time.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8 pt-8">
          <div className="flex flex-col items-start">
            <img src={Third} alt="Interview Icon" width={60} height={60} />
            <h1 className="text-2xl font-bold mt-4">
              Accelerate your<br></br> career & earn more.
            </h1>
            <p className="text-lg text-foregroundAccent pt-2">
              Master the skill of interviewing by <br></br> practicing it just
              like you practice your <br></br> trade and give your career a
              boost.
            </p>
          </div>

          <div className="flex flex-col items-end ">
            <img src={Four} alt="Interview Icon" width={60} height={60} />
            <h1 className="text-2xl font-bold mt-4">
              Land the job you&apos;ve <br></br> been dreaming of.
            </h1>
            <p className="text-lg text-foregroundAccent pt-2">
              Gain realistic interview experience and <br></br> master the
              skills you need to wow your <br></br> employers and beat out the{" "}
              <br></br>
              competition.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
