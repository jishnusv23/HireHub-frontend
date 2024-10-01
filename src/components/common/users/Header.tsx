import HireHub from "../HireHub";
import HireHubLogo from "../../../assets/logos/HireHub-r.png";
import { useNavigate } from "react-router-dom";
import { ModeToggle } from "../../ui/mode-toggle";
import { Button } from "../../ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { RooteState } from "@/redux/store";
import { logoutAction } from "@/redux/store/actions/auth/logoutAction";
import { useState } from "react";
import { FaBars } from "react-icons/fa"; // Install react-icons if not installed
import { IoClose } from "react-icons/io5"; // Close icon

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [verifyed, setVerifyed] = useState(false);
  const navigate = useNavigate();

  const { data } = useAppSelector((state: RooteState) => state.user);
  const isVerified=useAppSelector((state:RooteState)=>state.user.data?.isVerified)
  // console.log("🚀 ~ file: Header.tsx:20 ~ Header ~ isVerified:", isVerified)
  // if (data?.isVerified) {
  //   setVerifyed(true);
  // } else {
  //   console.log("-------------------");
  // }
  // console.log("🚀 ~ file: Header.tsx:18 ~ Header ~ data:", data);
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    console.log("logout");
    dispatch(logoutAction()).then(() => {
      localStorage.removeItem("authToken");
      navigate("/");
      console.log("logout");
    });
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="flex justify-between lg:px-40 py-3 bg-backgroundAccent shadow-md fixed w-full z-50">
      <div className="gap-5 flex items-center">
        <img src={HireHubLogo} alt="HireHubLogo" width={30} height={30} />
        <h1 className="font-bold text-2xl">
          <HireHub />
        </h1>
      </div>
      <div className="flex items-center gap-5">
        {/* ModeToggle for larger screens */}

        {/* Feature list for large screens */}
        <div className="hidden lg:flex items-center gap-5">
          <div className="hover-text font-bold" onClick={() => navigate("/")}>
            Home
          </div>
          <div
            className="hover-text font-bold"
            onClick={() => navigate("/About")}
          >
            Overview
          </div>
          <div
            className="hover-text font-bold"
            onClick={() => navigate("/contact")}
          >
            Contact Us
          </div>
          <div
            className="hover-text font-bold"
            onClick={() => navigate("/Blogs")}
          >
            Blog
          </div>
          {data ? (
            <div
              className="hover-text font-bold"
              onClick={() => navigate("/profile")}
            >
              Profile
            </div>
          ) : (
            <div
              className="hover-text font-bold"
              onClick={() => navigate("/login")}
            >
              Login
            </div>
          )}
          {data ? (
            <Button onClick={handleLogout}>
              <div>Logout</div>
            </Button>
          ) : (
            <Button onClick={() => navigate("/signup")}>
              <div>Signup</div>
            </Button>
          )}
        </div>

        {/* Menu Toggle Button for mobile screens */}
        <div className="lg:hidden flex items-center gap-6">
          <ModeToggle />
          <button onClick={toggleMenu} className="text-xl">
            <FaBars />
          </button>
        </div>
        <div className="hidden md:block">
          <ModeToggle />
        </div>
      </div>

      {/* Mobile Menu setup this */}
      {menuOpen && (
        <div className="fixed inset-y-0 right-0 w-1/2 bg-backgroundAccent shadow-lg z-50 transition-transform transform duration-300 ease-in-out lg:hidden">
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center p-5">
              <h1 className="font-bold text-2xl">
                <HireHub />
              </h1>
              <button onClick={toggleMenu} className="text-2xl">
                <IoClose />
              </button>
            </div>
            <div className="flex flex-col justify-end flex-grow p-5 gap-5">
              <div
                className="hover-text font-bold"
                onClick={() => {
                  navigate("/");
                  toggleMenu();
                }}
              >
                Home
              </div>
              <div
                className="hover-text font-bold"
                onClick={() => {
                  navigate("/About");
                  toggleMenu();
                }}
              >
                Overview
              </div>
              <div
                className="hover-text font-bold"
                onClick={() => {
                  navigate("/contact");
                  toggleMenu();
                }}
              >
                Contact Us
              </div>
              <div
                className="hover-text font-bold"
                onClick={() => {
                  navigate("/Blogs");
                  toggleMenu();
                }}
              >
                Blog
              </div>
              {data ? (
                <div
                  className="hover-text font-bold"
                  onClick={() => {
                    navigate("");
                    toggleMenu();
                  }}
                >
                  Profile
                </div>
              ) : (
                <div
                  className="hover-text font-bold"
                  onClick={() => {
                    navigate("/login");
                    toggleMenu();
                  }}
                >
                  Login
                </div>
              )}
              {data ? (
                <Button
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                >
                  <div>Logout</div>
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    navigate("/signup");
                    toggleMenu();
                  }}
                >
                  <div>Signup</div>
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
