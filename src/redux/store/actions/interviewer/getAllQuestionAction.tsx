import { config } from "@/common/configuration";
import { interviewService } from "@/common/services/services";
import { CLIENT_API } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllQuestionAction = createAsyncThunk(
  "interviewer/getAllQuestion",
  async (
    data: {
      page?: number | string | null;
      limit?: number | string | null;
      userId: string; 
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
  
      if (data?.userId) {
        query += `userId=${data.userId}&`;
      }

      query = query.endsWith("&") ? query.slice(0, -1) : query;

      const response = await CLIENT_API.get(
        `${interviewService}/getAllQuestions${query}`,
        config
      );

      if (response.data) {
        return response.data; 
      } else {
        return rejectWithValue("No data returned");
      }
    } catch (error: any) {
      console.error("Error in getAllQuestions", error);
      
      return rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);
