import { config } from "@/common/configuration";
import { interviewService } from "@/common/services/services";
import { CLIENT_API } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const getAllInterviewsByIdAction = createAsyncThunk(
  "fetch-interviews",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await CLIENT_API.get(
        `${interviewService}interviewsById/${id}`, 
        config
      );
      console.log("🚀 ~ file: getAllInterivewes.tsx:15 ~ response:", response)
      if (response.data.success) {
        return response.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (error: any) {
      console.error("Something went wrong in getAllInterviewsByIdAction", error);
      const e: AxiosError = error as AxiosError;
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);
