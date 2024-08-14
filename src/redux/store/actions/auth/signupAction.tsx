import { config } from "@/common/configuration";
import { CLIENT_API } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const signupAction = createAsyncThunk(
  "user/signup",
  async (data: any, { rejectWithValue }) => {
    try {
      // console.log(data);
      const response = await CLIENT_API.post("/api/auth/signup",data,config);
      if (response.data.success) {
        return response.data;
      } else {
        return rejectWithValue(data);
      }
    } catch (error: any) {
      console.log("Something wrong in singupaction", error);
        const e: AxiosError = error as AxiosError;
        return rejectWithValue(e.response?.data || e.message);
    }
  }
);
