import HireHub from "../../HireHub";
import HireHubLogo from "../../../assets/logos/HireHub-r.png";
import { useNavigate } from "react-router-dom";
import { ModeToggle } from "../../ui/mode-toggle";

const Header = () => {
  return (
    <nav className="flex justify-between lg:px-40 py-3">
      <div className=" gap-5 flex items-center ">
        <img src={HireHubLogo} alt="HireHubLogo" width={30} height={30} />
        <h1 className="font-bold text-2xl">
          <HireHub />
        </h1>
      </div>
      <div className="gap-5  flex items-center">
        <div className="hiden  lg:flex items-center gap-5">
          <div className="hover-text font-bold">Home</div>

          <div className="hover-text font-bold">overview</div>

          <div className="hover-text font-bold">Contact us</div>

          <div className="hover-text font-bold">Blog</div>

          <div className="hover-text font-bold">Login</div>
          <button className="border border-primary text-white bg-primary text-sm px-4 py-2 rounded-md">
            Sign Up
          </button>
        </div>
        <ModeToggle/>
      </div>
    </nav>
  );
};

export default Header;
