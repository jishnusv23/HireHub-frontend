import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center min-h-screen mx-auto">
      <div className="mx-auto max-w-screen-sm text-center">
   
        <Player
          autoplay
          loop
          src="https://lottie.host/0c3b8740-eac6-4afe-a3a2-5d5064dd3fe8/qtdVK3R9Kv.json"
          style={{ height: "60%", width: "60%" }}
        />
        <p className="mt-4 text-lg text-muted-foreground">
          You do not have permission to access this page. Please ensure you are
          logged in and have the appropriate rights.
        </p>

        <div className="mt-6">
          <Button onClick={() => navigate("/")}>Back To Home</Button>
        
        </div>

        <p className="mt-4 text-sm text-muted-foreground">
          If you believe this is an error, please{" "}
          <a href="/contact" className="text-blue-500">
            contact support
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default Unauthorized;
