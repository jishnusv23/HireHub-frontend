import { config } from "@/common/configuration";
import { interviewService } from "@/common/services/services";
import { CLIENT_API } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const cancelInterveiws = createAsyncThunk(
  "interviewer/cancel",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await CLIENT_API.put(
        `${interviewService}cancelInterview`,
        data,
        config
      );
      // console.log(
      //   "🚀 ~ file: cancelnterveiws.tsx:13 ~ async ~ response:",
      //   response
      // );
      if (response.data) {
        return response.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (error: any) {
      console.error("Showing some error", error);
    }
  }
);
