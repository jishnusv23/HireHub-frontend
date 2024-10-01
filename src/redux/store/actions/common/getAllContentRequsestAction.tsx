import { config } from "@/common/configuration";
import { userService } from "@/common/services/services";
import { CLIENT_API } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const getAllContentRequestAction=createAsyncThunk(
    'requestContent',
      async (
    data: {
      page?: string | number | null;
      limit?: string | number | null;
     
    },
    { rejectWithValue }
  )=>{
    try {
      let query = "?";
      if (data?.page) {
        query += `page=${data.page}&`;
      }
      if (data?.limit) {
        query += `limit=${data.limit}&`;
      }
      const response = await CLIENT_API.get(
        `${userService}content-request${query}`,
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
)