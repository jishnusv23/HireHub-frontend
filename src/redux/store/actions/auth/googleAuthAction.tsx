import { config } from "@/common/configuration";
import { CLIENT_API } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const googleAuthAction = createAsyncThunk(
  "user/google-auth",
  async (Credential: any, { rejectWithValue }) => {
    try {
      console.log(Credential, "google");
    } catch (error: any) {
        console.log('Error showing in google ',error)
    }
  }
);
