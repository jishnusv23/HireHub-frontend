import React, { useState } from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import * as Tabs from "@radix-ui/react-tabs";
import { Button } from "@/components/ui/button";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/hooks/hooks";
import { getUserData } from "@/redux/store/actions/auth";
import { Player } from "@lottiefiles/react-lottie-player";

interface SuccessPageProps {
  response: {
    title?: string;
    jobPosition?: string;
    time?: string;
    date?: string;
    uniqueId: string;
    interviewType?: string;
    meetingLink?: string;
  };
  InstantMeet: boolean;
}

export const SuccessPage: React.FC<SuccessPageProps> = ({
  response,
  InstantMeet,
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleChanges = async () => {
    await dispatch(getUserData());
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md sm:max-w-lg p-4 sm:p-6 lg:p-8 bg-background shadow-lg rounded-lg">
        <div className="flex flex-col sm:flex-row sm:justify-center sm:space-x-4 mt-6">
          {!InstantMeet && (
            <>
              <Button
                className="bg-white text-black border border-gray-300 shadow-md hover:shadow-lg transition duration-200 w-full sm:w-auto mb-2 sm:mb-0"
                onClick={handleChanges}
              >
                Back To Meet
              </Button>
              <Button
                className="bg-primary text-white shadow-md hover:shadow-lg transition duration-200 w-full sm:w-auto"
                onClick={handleChanges}
              >
                Go to Dashboard
              </Button>
            </>
          )}
        </div>
        <div className="text-center mb-6">
          <Player
            src="https://lottie.host/7af583c8-6adf-4a23-8c89-013469c181d1/br0krkm7wK.json"
            background="transparent"
            speed={1}
            loop
            autoplay
            className=" w-60"
          />
          <div className="mt-4 space-y-4">
            <CopyToClipboard
              text={response?.meetingLink || ""}
              onCopy={handleCopy}
            >
              <Button className="w-full sm:w-auto bg-primary text-white shadow-md hover:shadow-lg transition duration-200">
                {isCopied ? "Copied!" : "Copy Meeting Link"}
              </Button>
            </CopyToClipboard>

            {/* Added a div to wrap the JOIN button and ensure it's below the copy button */}
            {InstantMeet && (
              <div className="mt-4">
                <Link
                  to={`/Meet-HireHub/${response.uniqueId}`}
                  className="flex-1 mb-2 sm:mb-0"
                >
                  <Button className="w-full sm:w-auto bg-green-500 hover:bg-green-400">
                    JOIN
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
