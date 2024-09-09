  import { config } from "@/common/configuration";
import { authservice } from "@/common/services/services";
import { CLIENT_API } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";


export const OtpverficationAction = createAsyncThunk(
  "user/otpverification",
  async (data: { otp: string; datas:any}, { rejectWithValue }) => {
    try {
      const response = await CLIENT_API.post(
        `${authservice}optverification`,
        data,
        config
      );
      if (response.data.success) {
        console.log(
          "🚀 ~ file: OtpverificationAction.tsx:12 ~ 'user/otpverification',async ~ response.data:",
          response.data
        );
        console.log(response.data.data)

        return response.data
      } else {
        return rejectWithValue(response.data);
      }
    } catch (error: any) {
      console.log("Something went wrong in otpverification ", error);
      const e: AxiosError = error as AxiosError;
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);