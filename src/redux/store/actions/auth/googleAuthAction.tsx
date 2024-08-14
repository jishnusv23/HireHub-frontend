import { config } from "@/common/configuration";
import { CLIENT_API } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const googleAuthAction = createAsyncThunk(
  "user/google-auth",
  async (credential: any, { rejectWithValue }) => {
    try {
      console.log(credential, "google");
      const response = await CLIENT_API.post(
        "/api/auth/googleAuth",
        credential,
        config
      );
      if (response.data.success) {
        return response.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (error: any) {
      console.log("Error showing in google ", error);
    }
  }
);
