import { config } from "@/common/configuration";
import { interviewService } from "@/common/services/services";
import { CLIENT_API } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const verifyIntervewe = createAsyncThunk(
  "interview/verify",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await CLIENT_API.post(
        `${interviewService}verifyInterview`,
        data,
        config
      );
      console.log("🚀 ~ file: verifyHost.tsx:14 ~ async ~ response:", response);
      if (response.data) {
        return response.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (error: any) {
      console.error("Something wrong in verifyInterview", error);
      const e: AxiosError = error as AxiosError;
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);
