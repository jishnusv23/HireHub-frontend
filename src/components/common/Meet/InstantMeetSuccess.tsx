import { useLocation } from "react-router-dom";
import Header from "../users/Header";
import { Button } from "@/components/ui/button";

export const InstantMeetSuccess = () => {
  const location = useLocation();
  console.log(
    "🚀 ~ file: InstantMeetSuccess.tsx:6 ~ InstantMeetSuccess ~ location:",
    location
  );
  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-background p-4">
        <div className="w-full max-w-md p-6 bg-background rounded-lg shadow-md">
          <h1>Invite participants to join meeting</h1>
          <div className="items-center flex justify-center">
            <Button>Copy Meeting Link</Button>
          </div>
          <div className="items-center flex justify-center">
            <Button>Copy Invitaition ' '</Button>
          </div>
          <div className="items-center flex justify-center">
            <Button>Copy Meeting Link</Button>
          </div>
        </div>
      </div>
    </>
  );
};
