import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Input } from "../ui/Input";

interface InputWithIconProps {
  icon: React.ReactNode;
  placeholder: string;
  type?: string;
  field?: any;
}

const InputWithIcon: React.FC<InputWithIconProps> = ({
  icon,
  placeholder,
  field,
  type,
}) => {
  const [showPassword, setShowPassword] = useState(type === "password");

  return (
    <div className="relative">
      <div className="absolute top-3 left-3">{icon}</div>
      <Input
        placeholder={placeholder}
        type={type === "password" ? (showPassword ? "text" : "password") : type}
        {...field}
        className="px-8 bg-backgroundAccent"
      />
      {type === "password" && (
        <div
          className="absolute top-3 right-3 cursor-pointer hover:text-gray-500"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </div>
      )}
    </div>
  );
};

export default InputWithIcon;
