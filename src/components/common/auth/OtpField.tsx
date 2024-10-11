import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/Input"; // Assuming Input is a custom component
import { Button } from "@/components/ui/button";
import { OtpverficationAction } from "@/redux/store/actions/auth/OtpverificationAction";
import { useAppDispatch } from "@/hooks/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { sendVerificationMail } from "@/redux/store/actions/auth/Verification";
import LoadingPopUp from "../skeleton/LandingPoup";
import { storeUserData } from "@/redux/store/slices/users";

export const OtpField = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isComplete, setIsComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [loading, setLoading] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const location = useLocation();
  const inputRef = useRef<(HTMLInputElement | null)[]>([]);

  // Focus first input and start timer on component mount
  useEffect(() => {
    inputRef.current[0]?.focus();
    startTimer();
  }, []);

  // Handle OTP field updates
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
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setIsComplete(newOtp.every((digit) => digit !== ""));

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
    if (isComplete) {
      setLoading(true);
      const mergeOtp = otp.join("");
      try {
        const response = await dispatch(
          OtpverficationAction({ otp: mergeOtp, datas: location.state.data })
        );
        console.log(
          "🚀 ~ file: OtpField.tsx:103 ~ handleTheOtp ~ response:",
          response
        );
        if (response.payload.success && !response.payload.error) {
          console.log(response.payload.data, "koko");

          dispatch(storeUserData(response.payload.data));
          navigate("/");
        } else {
          toast.error(response.payload.message);
        }
      } catch (error) {
        console.error("Error during OTP verification:", error);
      }
      setLoading(false);
      setOtp(new Array(otp.length).fill(""));
      setIsComplete(false);
      inputRef.current[0]?.focus();
    }
  };

  const handleResend = async () => {
    startTimer();
    toast.success("OTP resent to your Email", { duration: 4000 });
    try {
      console.log(
        location.state.data.email,
        "___________________________________________"
      );
      await dispatch(sendVerificationMail(location.state?.data.email));
    } catch (error) {
      console.error("Error during OTP resend:", error);
    }
  };

  return (
    <>
      <LoadingPopUp isLoading={loading} />
   
      <div className="w-full md:w-1/2 flex flex-col items-center px-4 py-16  ">
        <div className="bg-white text-primary p-6 md:p-8 lg:p-10 rounded-lg shadow-lg text-center w-full">
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
          <div className="text-sm font-semibold">
            Resend OTP in {timeLeft} seconds
          </div>
          <div className="flex justify-center pt-3 space-x-4">
            <Button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleTheOtp}
            >
              Submit
            </Button>
            {canResend ? (
              <Button
                className="bg-gray-600 text-white px-4 py-2 rounded"
                onClick={handleResend}
              >
                Resend
              </Button>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
