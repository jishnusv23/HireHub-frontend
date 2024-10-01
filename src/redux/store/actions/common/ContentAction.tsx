import { config } from "@/common/configuration";
import { userService } from "@/common/services/services";
import { CLIENT_API } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const ContentAction = createAsyncThunk(
  "contentes-blogs",
  async (
    data: {
      page?: number | string | null;
      limit?: number | string | null;
   
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

     

      query = query.endsWith("&") ? query.slice(0, -1) : query;

      const response = await CLIENT_API.get(
        `${userService}/content-all${query}`,
        config
      );
      console.log("🚀 ~ file: ContentAction.tsx:35 ~ response:", response)

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
