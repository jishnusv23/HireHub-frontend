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

const AdminNavbar: React.FC<{ toggleSidebar: () => void }> = ({
  toggleSidebar,
}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleDelete = async () => {
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
    <nav className="flex items-center justify-between bg-backgroundAccent p-4 lg:px-6 lg:py-3 z-10">
      <div className="flex items-center space-x-3">
        <button
          onClick={toggleSidebar}
          className=" text-primary text-xl focus:outline-none"
        >
          <FaBars />
        </button>
        <span className="font-bold text-2xl text-primary">Admin Panel</span>
      </div>
      <div className="hidden lg:block">
        <InputWithIcon
          icon={<LocationSearchingTwoToneIcon className="" />}
          placeholder="search here"
          type="text"
        />
      </div>
      <div className="flex  items-center space-x-6">
        <div className=" hidden md:flex  items-center space-x-3">
          <IoMdPerson className="text-xl " />
          <span>ADMIN</span>
          <Button className="">logout</Button>
        </div>
        <ModeToggle />
      </div>
    </nav>
  );
};

export default AdminNavbar;
