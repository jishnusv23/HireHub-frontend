import React, { useState } from "react";
import { TagsInput } from "react-tag-input-component";

interface InputTagCompProps {
  value: string[];
  onChange: (emails: string[]) => void;
}

export default function InputTagComp({ value, onChange }: InputTagCompProps) {
  const [selected, setSelected] = useState<string[]>(value);
  const [error, setError] = useState<string | null>(null);

  const isValidEmail = (email: string): boolean => {
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (newSelected: string[]) => {
   
    for (const email of newSelected) {
      if (!isValidEmail(email)) {
        setError("Invalid email address.");
        return;
      }
    }


    if (newSelected.length > 4) {
      setError("You can only add up to 4 participants.");
      return;
    }

    setError(null); 
    setSelected(newSelected);
    onChange(newSelected); 
  };

  return (
    <div>
      <h1>Add Participants</h1>
      <TagsInput
        value={selected}
        onChange={handleChange}
        name="emails"
        placeHolder="Enter emails"
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <em>Press enter to add new Email</em>
    </div>
  );
}
