import React, { useState } from "react";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/Input";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface InputProps {
  placeholder: string;
  field: any;
  title?: string;
  type?: string;
  readOnly?: boolean;
  showTitle: boolean;
  className?: string;
}

const FormInputCustom: React.FC<InputProps> = ({
  field,
  placeholder,
  title,
  type,
  readOnly = false,
  showTitle,
  className = "",
}) => {
  const [showPassword, setShowPassword] = useState(type === "password");

  return (
    <FormItem className="mt-2">
      {showTitle && <FormLabel className="text-black">{title}</FormLabel>}
      <FormControl>
        <div className="relative">
          <Input
            placeholder={placeholder}
            type={
              type === "password" ? (!showPassword ? "text" : "password") : type
            }
            {...field}
            readOnly={readOnly}
            className={`bg-backgroundAccent ${className}`}
            
          />
          {type === "password" && (
            <div
              className="absolute top-3 right-3 cursor-pointer hover:text-gray-500
          "
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEye /> : <FiEyeOff />}
            </div>
          )}
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default FormInputCustom;
