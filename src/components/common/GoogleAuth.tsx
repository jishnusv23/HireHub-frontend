import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
const GoogleAuth = () => {

  const googleLogin = async (credentialResponse: any) => {
    console.log(credentialResponse)
  };
  return (
    <div className="flex items-center justify-center pt-4">
      <GoogleLogin
        onSuccess={googleLogin}
        onError={() => {
          console.log("Google Login Failed");
        }}
      />
    </div>
  );
};

export default GoogleAuth;
