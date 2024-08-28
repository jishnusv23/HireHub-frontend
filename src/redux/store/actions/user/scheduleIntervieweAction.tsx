import { config } from "@/common/configuration";
import { interviewService } from "@/common/services/services";
import { CLIENT_API } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const scheduleIntervieweActionAction = createAsyncThunk(
  "interview/schedule",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await CLIENT_API.post(
        `${interviewService}scheduleInterview`,
        data,
        config
      );
      // console.log(
      //   "🚀 ~ file: scheduleIntervieweAction.tsx:20 ~ scheduleIntervieweActionAction ~ response:",
      //   response
      // );
      if (response.data.success) {
        // Return only serializable data
        return {
          data: response.data,
          status: response.status,
          statusText: response.statusText,
        };
      } else {
        return rejectWithValue(response.data);
      }
    } catch (error: any) {
      console.log("Schedule Interview: ", error);
      const e: AxiosError = error as AxiosError;
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);
