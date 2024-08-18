import { CLIENT_API } from "@/utils/axios";
import { config } from "@/common/configuration";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { authservice } from "@/common/services/services";
import { AxiosError } from "axios";
export const sendVerificationMail = createAsyncThunk(
  "user/send-otp",
  async (email: string, { rejectWithValue }) => {
    console.log(
      "🚀 ~ file: sendVerificationMail.ts:8 ~ email:",
      { email: email },
      { withCredentials: true }
    );
    try {
      const response = await CLIENT_API.post(
        `${authservice}oneTime-pass`,
        email
      );
      if (response.data.success) {
        return response.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (error: any) {
      console.log("Send one time password showing error ", error);
      const e: AxiosError = error as AxiosError;
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);
