import HireHubLogo from "../assets/logos/HireHub-r.png";
import HireHub from "./HireHub";
const HireHubImg = () => {
  return (
    <div className="flext items-center">
      <img src={HireHubLogo} alt="HireHubLogo" />
      <h1 className="font-bold">
        <HireHub />
      </h1>
    </div>
  );
};

export default HireHubImg;
