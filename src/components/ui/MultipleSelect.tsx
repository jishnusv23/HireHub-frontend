import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface MultipleSelectProps {
  field: {
    onChange: (value: string) => void;
    value: string;
  };
  options: string[];
  heading?: string;
}

function getStyles(name: string, selectedValue: string, theme: Theme) {
  return {
    fontWeight:
      selectedValue === name
        ? theme.typography.fontWeightMedium
        : theme.typography.fontWeightRegular,
  };
}

export default function MultipleSelect({
  field,

  options,
  heading,
}: MultipleSelectProps) {
  const theme = useTheme();

  const handleChange = (event: SelectChangeEvent<string>) => {
    field.onChange(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, width: "100%", mt: 3 }} className="h-12">
      {""}

      <p
        className={`text-sm font-bold ${heading ? "text-black" : "text-black"}`}
      >
        {heading || "Types"}
      </p>

      {/* <p className=`text-sm font-bold text-white`>{heading?:heading,"interviewType"}</p> */}

      <Select
        value={field.value}
        onChange={handleChange}
        input={<OutlinedInput />}
        renderValue={(selected) => {
          if (!selected) {
            return <em>Placeholder</em>;
          }

          return selected;
        }}
        MenuProps={MenuProps}
        inputProps={{ "aria-label": "Without label" }}
        className="h-8  "
      >
        <MenuItem disabled value="">
          {/* <em>select</em> */}
        </MenuItem>
        {options.map((name) => (
          <MenuItem
            key={name}
            value={name}
            style={getStyles(name, field.value, theme)}
          >
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
