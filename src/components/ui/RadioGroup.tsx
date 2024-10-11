import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function RadioButtonsGroup() {
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">
       
      </FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="node"
        name="radio-buttons-group"
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "16px", // Adjust spacing between items
          }}
        >
          <FormControlLabel value="node" control={<Radio />} label="Node.js" />
          <FormControlLabel value="python" control={<Radio />} label="Python" />
          <FormControlLabel value="HR" control={<Radio />} label="HR" />
          <FormControlLabel value="java" control={<Radio />} label="Other" />
        </div>
      </RadioGroup>
    </FormControl>
  );
}
