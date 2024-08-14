import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useActionData, useNavigate } from "react-router-dom";
import { googleAuthAction } from "@/redux/store/actions/auth";
import { useAppDispatch } from "@/hooks/hooks";
import { storeUserData } from "@/redux/store/slices/users";
import { toast } from "sonner";
const GoogleAuth = () => {
  const dispatch=useAppDispatch()
  const navigate=useNavigate()
  const googleLogin = async (credentialResponse: any) => {
    console.log(credentialResponse);
    const response=await dispatch(googleAuthAction(credentialResponse))
    if(response.payload.success&&response.payload){
      dispatch(storeUserData(response.payload.data))
     navigate("/login");

    }else{
      console.log("Something error")
      toast.error(response?.payload?.message)
    }
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
