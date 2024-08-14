import { config } from "@/common/configuration";
import { CLIENT_API } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const getUserData = createAsyncThunk(
  "user/getUserData",
  async (_, { rejectWithValue }) => {
    try {
  const response = await CLIENT_API.get("/api/auth/getUser", config);
      console.log("🚀 ~ file: getUserData.tsx:11 ~ response:", response)  
      if (response.data.success) {
        console.log(response.data,'getuser')
        return response.data;
      } else {
        return rejectWithValue(response.data)
      }
    } catch (error: any) {
      console.log("Something wrong in getuserdata", error);
    }
  }
);
