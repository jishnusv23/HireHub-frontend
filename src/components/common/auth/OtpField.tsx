import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/Input"; // Assuming Input is a custom component
import { Button } from "@/components/ui/button";

export const OtpField = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRef = useRef<(HTMLInputElement | null)[]>([]);
  useEffect(() => {
    inputRef.current[0]?.focus();
  }, []);

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target?.value;
    // Update the otp state with the new value
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to the next input if the current input is filled
    if (value && index < otp.length - 1) {
      inputRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRef.current[index - 1]?.focus();
    }
  };

  const handleTheOtp = () => {
    // Handle OTP submission
    console.log("OTP Submitted:", otp.join(""));
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white text-primary p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-6">OTP VERIFICATION</h1>
        <p className="mb-6">
          Enter the 4-digit verification code
          <br /> that was sent to your phone number
        </p>
        <div className="flex justify-center mb-8 space-x-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              ref={(input) => (inputRef.current[index] = input)}
              type="text"
              value={digit}
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              maxLength={1}
              className="w-12 h-12 text-center text-2xl text-muted-destructive border border-gray-300 rounded-xl"
            />
          ))}
        </div>
        <div className="flex justify-center space-x-4">
          <Button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleTheOtp}
          >
            Submit
          </Button>
          <Button className="bg-gray-600 text-white px-4 py-2 rounded">
            Resend
          </Button>
        </div>
      </div>
    </div>
  );
};
