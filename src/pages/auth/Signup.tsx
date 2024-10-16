
import HireHub from "../../components/common/HireHub";

import Header from "../../components/common/users/Header";
import Logo from "../../assets/logos/HireHub-r.png";

import GoogleAuth from "../../components/common/GoogleAuth";
import SignupImg from "../../assets/auth/Signup.jpg";
// import IMG from "@/assets/home/images.jpeg";
import Footer from "@/components/common/Footer";
import SignupForm from "@/components/auth/SignupForm";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Header />

      <div className="grid grid-cols-1 lg:grid-cols-2 md-5">
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
            <div className="text-2xl font-bold py-3">Sign Up</div>

            <SignupForm />
            <div className="flex items-center gap-3 mt-10">
              <div className="h-[2px] w-full bg-backgroundAccent rounded-full"></div>

              <p>or</p>
              <div className="h-[2px] w-full bg-backgroundAccent rounded-full"></div>
            </div>
            <GoogleAuth />
            <p className="py-5">
              Alredy have an Account?
              <span
                className="text-primary hover:text-blue-400"
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </p>
          </div>
        </div>
        <div className="w-full">
          <img
            src={SignupImg}
            alt="Bg Image"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
