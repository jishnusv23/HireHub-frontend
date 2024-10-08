import React from "react";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import InputWithIcon from "../customs/InputWithIcon";

interface InputWithIconProps {
  icon: React.ReactNode;
  placeholder: string;
  field: any;
  title?: string;
  type?: string;
  showTitle: boolean;
}

const FormInputWithIcon: React.FC<InputWithIconProps> = ({
  icon,
  placeholder,
  field,
  title,
  type,
  showTitle,
}) => {
  return (
    <FormItem>
      {showTitle && <FormLabel>{title}</FormLabel>}
      <FormControl>
        <InputWithIcon
          icon={icon}
          placeholder={placeholder}
          field={field||''}
          type={type}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default FormInputWithIcon;
