import { CLIENT_API } from "@/utils/axios";
import { config } from "@/common/configuration";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { userService } from "@/common/services/services";

export const getAllInterviewee = createAsyncThunk(
  "user/getAllInterviewee",
  async (
    data: {
      page?: string | number | null;
      limit?: string | number | null;
      search?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      let query = "?";
      if (data?.page) {
        query += `page=${data.page}&`;
      }
      if (data?.limit) {
        query += `limit=${data.limit}&`;
      }
      if (data?.search) {
        query += `search=${data.search}&`;
      }
      const response = await CLIENT_API.get(
        `${userService}get-all-interviewee${query}`,
        config
      );
      console.log("🚀 ~ file: getAllInterviewee.tsx:22 ~ response:", response);
      if (response.data) {
        return response.data;
      }
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
