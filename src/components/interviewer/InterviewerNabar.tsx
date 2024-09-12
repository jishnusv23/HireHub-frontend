import React, { useState } from "react";
import { ModeToggle } from "../ui/mode-toggle";
import { IoMdPerson } from "react-icons/io";
import { logoutAction } from "@/redux/store/actions/auth/logoutAction";
import { useAppDispatch } from "@/hooks/hooks";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { Button } from "../ui/button";

import InputWithIcon from "../customs/InputWithIcon";
import LocationSearchingTwoToneIcon from "@mui/icons-material/LocationSearchingTwoTone";
import ConfirmModal from "../common/users/ConfirmModal";

const InterviewerNabar: React.FC<{ toggleSidebar: () => void }> = ({
  toggleSidebar,
}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogo = async () => {
    dispatch(logoutAction()).then(() => {
      navigate("/");
    });

    console.log("Item deleted");
    setModalVisible(false);
  };

  const handleCancel = () => {
    console.log("Action cancelled");
    setModalVisible(false);
  };

  const handleLogout = async () => {
    setModalVisible(true);
  };

  return (
    <>
      <nav className="flex items-center justify-between bg-backgroundAccent p-4 lg:px-6 lg:py-3 z-10">
        <div className="flex items-center space-x-3">
          <button
            onClick={toggleSidebar}
            className="text-primary text-xl focus:outline-none hidden lg:block "
          >
            <FaBars />
          </button>
          <span className="font-bold text-2xl text-primary">
            Interviewer Panel
          </span>
        </div>
        <div className="hidden lg:block ">
          <InputWithIcon
            icon={<LocationSearchingTwoToneIcon className="mb-3 pb-1 " />}
            placeholder="  search here"
            type="text"
            
          />
        </div>
        <div className="flex items-center space-x-6">
          <Button className="text-sm  h-8 lg:hidden" onClick={handleLogout}>
            Logout
          </Button>
          <div className="hidden md:flex items-center space-x-3">
            <IoMdPerson className="text-xl " />
            <span>INTERVIEWER</span>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
          <ModeToggle />
        </div>
      </nav>

      {isModalVisible && (
        <ConfirmModal
          onConfirm={handleLogo}
          onCancel={handleCancel}
          message="logout?"
        />
      )}
    </>
  );
};

export default InterviewerNabar;
