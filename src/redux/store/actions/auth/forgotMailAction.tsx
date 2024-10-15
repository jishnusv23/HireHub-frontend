import { CLIENT_API } from "@/utils/axios";
import { config } from "@/common/configuration";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { authservice } from "@/common/services/services";
import { AxiosError } from "axios";

export const forgotMailAction = createAsyncThunk(
  "auth/forgot-mail",
  async (email: string, { rejectWithValue }) => {
    try {
    const response = await CLIENT_API.post(
      `${authservice}forgot-password-email`, // <-- This might be the issue
      { email },
      config
    );
    //  console.log("🚀 ~ file: forgotMailAction.tsx:16 ~ response:", response)

      if (response.data.success) {
        return response.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (error: any) {
      const e: AxiosError = error as AxiosError;
      return rejectWithValue(e.response?.data||e.message)
    }
  }
);
