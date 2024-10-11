
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import dayjs, { Dayjs } from "dayjs";

type BasicTimeFieldProps = {
  value: Dayjs | null;
  onChange: (newValue: Dayjs | null) => void;
};

export default function BasicTimeField({
  value,
  onChange,
}: BasicTimeFieldProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimeField
        label="Select time"
        value={value}
        onChange={(newValue) => onChange(newValue ? dayjs(newValue) : null)}
        ampm={true}
        format="hh:mm A"
      />
    </LocalizationProvider>
  );
}
