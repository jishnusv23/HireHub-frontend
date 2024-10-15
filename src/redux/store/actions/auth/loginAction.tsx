import { config } from "@/common/configuration";
import { CLIENT_API } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const loginAction = createAsyncThunk(
  "user/login",
  async (data: any, { rejectWithValue }) => {
    try {
      // console.log(data,'loginaction');
      const response = await CLIENT_API.post("/api/auth/login", data, config);
      
      if (response.data.success) {
        return response.data;
      } else {
        return rejectWithValue(data)
          }
    } catch (error: any) {
      console.log("Something wrong in login action", error);
        const e: AxiosError = error as AxiosError;
        return rejectWithValue(e.response?.data || e.message);
    }
  }
);
