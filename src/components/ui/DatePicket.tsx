import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs"; // Import Dayjs types

interface BasicDatePickerProps {
  value: Dayjs | null;
  onChange: (value: Dayjs | null) => void;
}

export default function BasicDatePicker({
  value,
  onChange,
}: BasicDatePickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          label=" date picker"
          value={value}
          onChange={onChange}
          className="w-full h-14 "
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
