import { config } from "@/common/configuration";
import { CLIENT_API } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const signupAction = createAsyncThunk(
  "user/signup",
  async (data: any, { rejectWithValue }) => {
    try {
      console.log(data);
    } catch (error: any) {
      console.log("Something wrong in singupaction", error);
    }
  }
);
