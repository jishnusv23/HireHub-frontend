import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/Input"; // Assuming Input is a custom component
import { Button } from "@/components/ui/button";
import { OtpverficationAction } from "@/redux/store/actions/auth/OtpverificationAction";
import { useAppDispatch } from "@/hooks/hooks";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";
import { sendVerificationMail } from "@/redux/store/actions/auth/sendVerificationMail";

export const OtpField = () => {
  const dispatch = useAppDispatch();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isComplete, setIsComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const location = useLocation();
  console.log("🚀 ~ file: OtpField.tsx:12 ~ OtpField ~ location:", location);

  const inputRef = useRef<(HTMLInputElement | null)[]>([]);
  useEffect(() => {
    inputRef.current[0]?.focus();
    startTimer();
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const startTimer = () => {
    setTimeLeft(60);
    setCanResend(false);
  };
  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target?.value;
    // Update the otp state with the new value
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setIsComplete(newOtp.every((digit) => digit !== ""));

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

  const handleTheOtp = async () => {
    // Handle OTP submission
    console.log("OTP Submitted:", otp.join(""));
    const mergeotp = otp.join("");
    if (isComplete) {
      // const response=await
      // console.log(location.state)

      const response = await dispatch(
        OtpverficationAction({ otp: mergeotp, email: location.state.email })
      );
      console.log(
        "🚀 ~ file: OtpField.tsx:55 ~ handleTheOtp ~ response:",
        response
      );
      if (response.payload.success && !response.payload.error) {
        console.log(response.payload.data);
      }


       setOtp(new Array(length).fill(""));
       setIsComplete(false);
       inputRef.current[0]?.focus();

    }
  };
  const handleResend=async()=>{
     startTimer();
     
     toast.success("OTP resend to your Email", {
       duration: 4000,
     });

     await dispatch(sendVerificationMail(location.state.email));

  }
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
            <Input
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
          <Button className="bg-gray-600 text-white px-4 py-2 rounded"  onClick={handleResend}>
            Resend
          </Button>
        </div>
      </div>
    </div>
  );
};
