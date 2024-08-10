import { config } from "@/common/configuration";
import { CLIENT_API } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const findEmailAction = createAsyncThunk(
  "user/findEmail",
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await CLIENT_API.post(`/api/auth/findByEmail/${email}`,{withCredentail:true});
      if (response.data.success) {
        return response.data;
      } else {
        return rejectWithValue(email);
      }
    } catch (error: any) {
      console.error("Something wrong in findemailaction", error?.message);
      const e: AxiosError = error as AxiosError;
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);
